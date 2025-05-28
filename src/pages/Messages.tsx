
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  isOnline: boolean;
}

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Quiz Masters',
      lastMessage: 'Quelqu\'un veut créer un quiz sur l\'histoire ?',
      timestamp: '14:30',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Science Lovers',
      lastMessage: 'Super quiz sur la physique quantique !',
      timestamp: '13:45',
      unread: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Geography Experts',
      lastMessage: 'Nouveau défi : capitales africaines',
      timestamp: '12:20',
      unread: 5,
      isOnline: true
    },
    {
      id: '4',
      name: 'Sports Fans',
      lastMessage: 'Les résultats du tournoi sont sortis !',
      timestamp: '11:15',
      unread: 1,
      isOnline: false
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'QuizMaster99',
      content: 'Salut tout le monde ! Quelqu\'un veut créer un quiz sur l\'histoire de France ?',
      timestamp: '14:25',
      avatar: undefined
    },
    {
      id: '2',
      sender: 'HistoryBuff',
      content: 'Excellente idée ! Je peux contribuer avec des questions sur la Révolution française.',
      timestamp: '14:27',
      avatar: undefined
    },
    {
      id: '3',
      sender: user?.username || 'Vous',
      content: 'Je suis partant ! J\'ai des questions intéressantes sur Napoléon.',
      timestamp: '14:29',
      avatar: user?.avatar
    },
    {
      id: '4',
      sender: 'WisdomWizard',
      content: 'Parfait ! On peut créer un quiz collaboratif. Qui veut coordonner ?',
      timestamp: '14:30',
      avatar: undefined
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Ici, on ajouterait la logique pour envoyer le message
      console.log('Message envoyé:', newMessage);
      setNewMessage('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connexion requise</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder à la messagerie.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Se connecter
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Messages
          </h1>
          <p className="text-xl text-gray-600">
            Discutez avec la communauté Quizzly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-purple-50 border-purple-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            {conversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      
                      {conversation.unread > 0 && (
                        <Badge className="bg-purple-600">{conversation.unread}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="lg:col-span-2 bg-white">
            <CardHeader>
              <CardTitle>
                {conversations.find(c => c.id === selectedConversation)?.name || 'Sélectionnez une conversation'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[500px]">
              {/* Messages Area */}
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === user.username ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[70%] ${
                        message.sender === user.username ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                            {message.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className={`rounded-lg p-3 ${
                          message.sender === user.username
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === user.username ? 'text-purple-100' : 'text-gray-500'
                          }`}>
                            {message.sender !== user.username && `${message.sender} • `}{message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Envoyer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Messages;
