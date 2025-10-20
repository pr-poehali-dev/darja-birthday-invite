-- Create table for party guests responses
CREATE TABLE IF NOT EXISTS party_guests (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    will_attend BOOLEAN NOT NULL DEFAULT true,
    drink_preference VARCHAR(100),
    additional_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_party_guests_created_at ON party_guests(created_at);
CREATE INDEX idx_party_guests_will_attend ON party_guests(will_attend);