import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Process party RSVP form submissions and save to database
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    guest_name = body_data.get('name', '').strip()
    email = body_data.get('email', '').strip()
    phone = body_data.get('phone', '').strip()
    will_attend = body_data.get('willAttend') == 'yes'
    drink_preference = body_data.get('drinkPreference', '').strip()
    additional_info = body_data.get('additionalInfo', '').strip()
    
    if not guest_name:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Name is required'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        "INSERT INTO party_guests (guest_name, email, phone, will_attend, drink_preference, additional_info) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (guest_name, email if email else None, phone if phone else None, will_attend, drink_preference if drink_preference else None, additional_info if additional_info else None)
    )
    
    result = cur.fetchone()
    guest_id = result['id']
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'RSVP saved successfully',
            'guestId': guest_id
        }),
        'isBase64Encoded': False
    }
