import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Photo {
  id: number;
  url: string;
  title: string;
  date: string;
  comments: Comment[];
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'gallery' | 'events'>('gallery');

  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: 'https://cdn.poehali.dev/projects/03e43870-34b3-4d76-87ff-07abb61beb18/files/884dbc96-7e87-478a-b1d1-ddf106f76ad8.jpg',
      title: 'Семейный портрет',
      date: '15 августа 2024',
      comments: []
    },
    {
      id: 2,
      url: 'https://cdn.poehali.dev/projects/03e43870-34b3-4d76-87ff-07abb61beb18/files/8b8174f9-0284-43e2-8c41-5b2a9ca7f3cf.jpg',
      title: 'Отдых на море',
      date: '3 июля 2024',
      comments: []
    },
    {
      id: 3,
      url: 'https://cdn.poehali.dev/projects/03e43870-34b3-4d76-87ff-07abb61beb18/files/bb9f93d8-7890-47c8-b8db-51c8825917c9.jpg',
      title: 'День рождения',
      date: '22 мая 2024',
      comments: []
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Первый день школы',
      description: 'Наша малышка пошла в первый класс! Волнительный и радостный момент для всей семьи.',
      date: '1 сентября 2024',
      image: 'https://cdn.poehali.dev/projects/03e43870-34b3-4d76-87ff-07abb61beb18/files/884dbc96-7e87-478a-b1d1-ddf106f76ad8.jpg',
      comments: []
    },
    {
      id: 2,
      title: 'Летние каникулы',
      description: 'Незабываемый отдых на море, купание, солнце и веселье!',
      date: '15 июля 2024',
      image: 'https://cdn.poehali.dev/projects/03e43870-34b3-4d76-87ff-07abb61beb18/files/8b8174f9-0284-43e2-8c41-5b2a9ca7f3cf.jpg',
      comments: []
    },
    {
      id: 3,
      title: 'День рождения Маши',
      description: 'Празднование 8-летия нашей принцессы с друзьями и семьёй.',
      date: '22 мая 2024',
      image: 'https://cdn.poehali.dev/projects/03e43870-34b3-4d76-87ff-07abb61beb18/files/bb9f93d8-7890-47c8-b8db-51c8825917c9.jpg',
      comments: []
    }
  ]);

  const addComment = () => {
    if (!newComment.trim()) {
      toast.error('Введите текст комментария');
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: 'Член семьи',
      text: newComment,
      timestamp: new Date().toLocaleString('ru-RU')
    };

    if (selectedPhoto) {
      setPhotos(photos.map(p => 
        p.id === selectedPhoto.id 
          ? { ...p, comments: [...p.comments, comment] }
          : p
      ));
      setSelectedPhoto({ ...selectedPhoto, comments: [...selectedPhoto.comments, comment] });
    } else if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, comments: [...e.comments, comment] }
          : e
      ));
      setSelectedEvent({ ...selectedEvent, comments: [...selectedEvent.comments, comment] });
    }

    setNewComment('');
    toast.success('Комментарий добавлен!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
      <header className="bg-white/90 backdrop-blur-xl shadow-xl sticky top-0 z-10 animate-fade-in border-b-4 border-primary/20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
            Семейный альбом
          </h1>
          <p className="text-lg text-muted-foreground mt-3 font-medium">Наши счастливые моменты ❤️</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 justify-center animate-slide-up">
          <Button
            onClick={() => setActiveTab('gallery')}
            variant={activeTab === 'gallery' ? 'default' : 'outline'}
            size="lg"
            className="transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <Icon name="Image" className="mr-2" size={20} />
            Фотогалерея
          </Button>
          <Button
            onClick={() => setActiveTab('events')}
            variant={activeTab === 'events' ? 'default' : 'outline'}
            size="lg"
            className="transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <Icon name="Calendar" className="mr-2" size={20} />
            События
          </Button>
        </div>

        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {photos.map((photo, index) => (
              <Card
                key={photo.id}
                className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                onClick={() => setSelectedPhoto(photo)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">{photo.title}</p>
                      <p className="text-sm">{photo.date}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-white to-orange-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{photo.title}</h3>
                      <p className="text-sm text-muted-foreground">{photo.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="MessageCircle" size={18} />
                      <span className="text-sm">{photo.comments.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                onClick={() => setSelectedEvent(event)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 bg-gradient-to-br from-white to-rose-50">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {event.title}
                      </h3>
                      <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                        {event.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="MessageCircle" size={18} />
                      <span className="text-sm">{event.comments.length} комментариев</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPhoto && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedPhoto.title}</DialogTitle>
                <p className="text-muted-foreground">{selectedPhoto.date}</p>
              </DialogHeader>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full rounded-lg"
              />
              
              <div className="mt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Комментарии ({selectedPhoto.comments.length})
                </h4>
                
                <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                  {selectedPhoto.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {comment.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Напишите комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addComment} className="self-end">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedEvent.title}</DialogTitle>
                <p className="text-muted-foreground">{selectedEvent.date}</p>
              </DialogHeader>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full rounded-lg"
              />
              <p className="text-lg">{selectedEvent.description}</p>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Комментарии ({selectedEvent.comments.length})
                </h4>
                
                <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                  {selectedEvent.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar>
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {comment.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Напишите комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addComment} className="self-end">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;