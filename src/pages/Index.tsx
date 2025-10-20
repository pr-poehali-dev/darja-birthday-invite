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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-amber-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/1fd0b9ad-d190-4486-ab3f-33c1d1456cae/files/c08754bc-ad96-4469-8449-51371d72589c.jpg)' }}></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/30 to-yellow-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-40 h-40 bg-gradient-to-br from-yellow-300/20 to-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-gradient-to-br from-amber-500/25 to-yellow-400/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <section className="text-center mb-20 animate-fade-in">
          <div className="mb-12 relative flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl shadow-amber-500/50">
                <img 
                  src="/placeholder.svg" 
                  alt="Дарья" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-8 relative">
            <div className="inline-block p-10 border-2 border-amber-400 bg-gradient-to-br from-slate-800 to-black shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
              <h1 className="text-7xl md:text-8xl font-light mb-4 gold-text relative z-10">25</h1>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-wide gold-text">Дарья</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl font-light tracking-widest text-amber-100">
            ПРИГЛАШАЕТ ВАС НА ДЕНЬ РОЖДЕНИЯ
          </p>
          <div className="mt-6 text-amber-300 text-sm tracking-wider">✦ ✦ ✦</div>
        </section>

        <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center p-8 border-2 border-amber-400/50 bg-gradient-to-br from-slate-800/90 to-black/90 backdrop-blur-sm transition-all duration-300 shadow-xl shadow-amber-900/20 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 hover:border-amber-400 relative group">
              <Icon name="Calendar" className="mx-auto mb-4 text-amber-400" size={32} />
              <h3 className="text-2xl font-light mb-3 text-amber-100">Дата и Время</h3>
              <p className="text-lg text-white">15 декабря 2024</p>
              <p className="text-lg text-white">19:00</p>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="text-center p-8 border-2 border-amber-400/50 bg-gradient-to-br from-slate-800/90 to-black/90 backdrop-blur-sm transition-all duration-300 shadow-xl shadow-amber-900/20 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 hover:border-amber-400 relative group">
              <Icon name="MapPin" className="mx-auto mb-4 text-amber-400" size={32} />
              <h3 className="text-2xl font-light mb-3 text-amber-100">Место</h3>
              <p className="text-lg text-white">Ресторан "Белая Гавань"</p>
              <p className="text-lg text-white">ул. Пушкина, 25</p>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </section>

        <section className="mb-20 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-block p-12 border-2 border-amber-400 bg-gradient-to-br from-slate-900 to-black shadow-2xl shadow-amber-900/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent"></div>
            <Icon name="Shirt" className="mx-auto mb-4 text-amber-400 relative z-10" size={48} />
            <h3 className="text-3xl font-light mb-4 gold-text relative z-10">Дресс-код</h3>
            <p className="text-xl font-light tracking-wider text-white relative z-10">ЧЕРНОЕ & БЕЛОЕ</p>
            <p className="text-lg mt-4 text-amber-100 relative z-10">Коктейльный стиль</p>
            <div className="mt-6 text-amber-400 text-2xl relative z-10">✦</div>
          </div>
        </section>

        <section className="animate-fade-in relative" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-900 to-black text-white p-8 md:p-12 shadow-2xl shadow-amber-900/30 border-2 border-amber-400/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent"></div>
            <h3 className="text-3xl font-light text-center mb-8 gold-text relative z-10">Подтверждение присутствия</h3>
            
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
                className="w-full gold-gradient text-black hover:opacity-90 font-light tracking-wider text-lg py-6 shadow-lg shadow-amber-500/50 transition-all hover:shadow-amber-500/70 relative z-10"
              >
                {isSubmitting ? 'Отправка...' : 'ОТПРАВИТЬ'}
              </Button>
            </form>
          </div>
        </section>

        <footer className="text-center mt-20 pb-8">
          <div className="text-amber-300 text-xs tracking-wider mb-3">✦ ✦ ✦</div>
          <p className="text-sm font-light tracking-widest text-amber-100">С НЕТЕРПЕНИЕМ ЖДУ ВАС</p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
        </footer>
      </div>
    </div>
  );
};

export default Index;