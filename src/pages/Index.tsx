import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    willAttend: 'yes',
    drinkPreference: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/792e0bba-fb23-4b6c-9c0b-cc32a35bf9b6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Спасибо за ответ!",
          description: "Ваша заявка успешно отправлена",
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          willAttend: 'yes',
          drinkPreference: '',
          additionalInfo: ''
        });
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось отправить заявку",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/1fd0b9ad-d190-4486-ab3f-33c1d1456cae/files/c08754bc-ad96-4469-8449-51371d72589c.jpg)' }}></div>
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <section className="text-center mb-20 animate-fade-in">
          <div className="mb-8 relative">
            <div className="inline-block p-8 border-2 border-black bg-white shadow-2xl relative">
              <h1 className="text-7xl md:text-8xl font-light mb-4">25</h1>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">Дарья</h2>
          <div className="w-24 h-px bg-black mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl font-light tracking-widest">
            ПРИГЛАШАЕТ ВАС НА ДЕНЬ РОЖДЕНИЯ
          </p>
        </section>

        <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 bg-white shadow-xl hover:shadow-2xl hover:scale-105 relative group">
              <Icon name="Calendar" className="mx-auto mb-4" size={32} />
              <h3 className="text-2xl font-light mb-3">Дата и Время</h3>
              <p className="text-lg">15 декабря 2024</p>
              <p className="text-lg">19:00</p>
            </div>

            <div className="text-center p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 bg-white shadow-xl hover:shadow-2xl hover:scale-105 relative group">
              <Icon name="MapPin" className="mx-auto mb-4" size={32} />
              <h3 className="text-2xl font-light mb-3">Место</h3>
              <p className="text-lg">Ресторан "Белая Гавань"</p>
              <p className="text-lg">ул. Пушкина, 25</p>
            </div>
          </div>
        </section>

        <section className="mb-20 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-block p-12 border-2 border-black bg-white shadow-2xl relative">
            <Icon name="Shirt" className="mx-auto mb-4" size={48} />
            <h3 className="text-3xl font-light mb-4">Дресс-код</h3>
            <p className="text-xl font-light tracking-wider">ЧЕРНОЕ & БЕЛОЕ</p>
            <p className="text-lg mt-4">Коктейльный стиль</p>
          </div>
        </section>

        <section className="animate-fade-in relative" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-2xl mx-auto bg-black text-white p-8 md:p-12 shadow-2xl border-4 border-gray-800 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
            <h3 className="text-3xl font-light text-center mb-8">Подтверждение присутствия</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">Ваше имя *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white text-black border-white"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white text-black border-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white text-black border-white"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">Я буду присутствовать</Label>
                <RadioGroup
                  value={formData.willAttend}
                  onValueChange={(value) => setFormData({ ...formData, willAttend: value })}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" className="border-white text-white" />
                    <Label htmlFor="yes" className="text-white cursor-pointer">Да</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="border-white text-white" />
                    <Label htmlFor="no" className="text-white cursor-pointer">Нет</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.willAttend === 'yes' && (
                <div className="animate-fade-in">
                  <Label htmlFor="drink" className="text-white">Что будете пить?</Label>
                  <Select
                    value={formData.drinkPreference}
                    onValueChange={(value) => setFormData({ ...formData, drinkPreference: value })}
                  >
                    <SelectTrigger className="bg-white text-black border-white">
                      <SelectValue placeholder="Выберите напиток" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="champagne">Шампанское</SelectItem>
                      <SelectItem value="wine-red">Красное вино</SelectItem>
                      <SelectItem value="wine-white">Белое вино</SelectItem>
                      <SelectItem value="cocktails">Коктейли</SelectItem>
                      <SelectItem value="whiskey">Виски</SelectItem>
                      <SelectItem value="vodka">Водка</SelectItem>
                      <SelectItem value="non-alcoholic">Безалкогольные напитки</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="additional" className="text-white">Дополнительная информация</Label>
                <Textarea
                  id="additional"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  className="bg-white text-black border-white resize-none"
                  placeholder="Пожелания, аллергии, особые требования..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-gray-200 font-light tracking-wider text-lg py-6"
              >
                {isSubmitting ? 'Отправка...' : 'ОТПРАВИТЬ'}
              </Button>
            </form>
          </div>
        </section>

        <footer className="text-center mt-20 pb-8">
          <p className="text-sm font-light tracking-widest">С НЕТЕРПЕНИЕМ ЖДУ ВАС</p>
          <div className="w-12 h-px bg-black mx-auto mt-4"></div>
        </footer>
      </div>
    </div>
  );
};

export default Index;