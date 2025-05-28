import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import QuizCard from '@/components/QuizCard';
import RankingCard from '@/components/RankingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
  const [dailyRankings, setDailyRankings] = useState([]);

  // Mock data
  const mockQuizzes = [
    {
      id: '1',
      title: 'World Capitals Challenge',
      description: 'Test your knowledge of world capitals in this comprehensive geography quiz.',
      category: 'Geography',
      difficulty: 'Medium' as const,
      questionCount: 20,
      plays: 15420,
      duration: 15
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals',
      description: 'A comprehensive quiz covering the basics of JavaScript programming.',
      category: 'Programming',
      difficulty: 'Hard' as const,
      questionCount: 25,
      plays: 8930,
      duration: 20
    },
    {
      id: '3',
      title: 'Movie Trivia Night',
      description: 'How well do you know your movies? Test your cinema knowledge!',
      category: 'Entertainment',
      difficulty: 'Easy' as const,
      questionCount: 15,
      plays: 23150,
      duration: 10
    },
    {
      id: '4',
      title: 'Science Quiz Pro',
      description: 'Advanced science questions covering physics, chemistry, and biology.',
      category: 'Science',
      difficulty: 'Hard' as const,
      questionCount: 30,
      plays: 5680,
      duration: 25
    },
    {
      id: '5',
      title: 'History Timeline',
      description: 'Journey through important historical events and dates.',
      category: 'History',
      difficulty: 'Medium' as const,
      questionCount: 18,
      plays: 12340,
      duration: 18
    },
    {
      id: '6',
      title: 'Pop Culture 2024',
      description: 'Stay current with the latest trends, memes, and pop culture.',
      category: 'Entertainment',
      difficulty: 'Easy' as const,
      questionCount: 12,
      plays: 31200,
      duration: 8
    }
  ];

  const mockRankings = [
    { id: '1', username: 'QuizMaster99', score: 2850, rank: 1, quizzesCompleted: 47, avatar: undefined },
    { id: '2', username: 'BrainiacBob', score: 2720, rank: 2, quizzesCompleted: 39, avatar: undefined },
    { id: '3', username: 'WisdomWizard', score: 2650, rank: 3, quizzesCompleted: 42, avatar: undefined },
    { id: '4', username: 'SmartCookie', score: 2580, rank: 4, quizzesCompleted: 35, avatar: undefined },
    { id: '5', username: 'ThinkTank', score: 2490, rank: 5, quizzesCompleted: 31, avatar: undefined }
  ];

  useEffect(() => {
    setFeaturedQuizzes(mockQuizzes);
    setDailyRankings(mockRankings);
  }, []);

  const filteredQuizzes = featuredQuizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalQuizzes: 1247,
    totalPlayers: 28430,
    questionsAnswered: 1250000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header onSearch={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Défiez Votre Esprit
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de passionnés de quiz et testez vos connaissances sur divers sujets. 
            Grimpez dans les classements et devenez un champion des quiz !
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-purple-600">{stats.totalQuizzes.toLocaleString()}</p>
                <p className="text-gray-600">Quiz Disponibles</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.totalPlayers.toLocaleString()}</p>
                <p className="text-gray-600">Joueurs Actifs</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-indigo-600">{stats.questionsAnswered.toLocaleString()}</p>
                <p className="text-gray-600">Questions Répondues</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Quizzes */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Résultats de recherche (${filteredQuizzes.length})` : 'Quiz en Vedette'}
                </h2>
                {searchQuery && (
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    Recherche: "{searchQuery}"
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
              
              {filteredQuizzes.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Aucun quiz trouvé pour "{searchQuery}"</p>
                  <p className="text-gray-500 mt-2">Essayez de rechercher avec d'autres mots-clés ou parcourez nos quiz en vedette</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* User Stats */}
            {user && (
              <Card className="mb-6 bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Vos Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Rang Actuel</span>
                      <span className="font-bold">#{user.rank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Score Total</span>
                      <span className="font-bold">{user.score.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quiz Complétés</span>
                      <span className="font-bold">{user.quizzesCompleted}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Daily Rankings */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🏆</span>
                  <span>Classement Quotidien</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyRankings.slice(0, 5).map((rankedUser) => (
                  <RankingCard 
                    key={rankedUser.id} 
                    user={rankedUser}
                    isCurrentUser={user?.id === rankedUser.id}
                  />
                ))}
                {user && !dailyRankings.find(u => u.id === user.id) && (
                  <RankingCard user={user} isCurrentUser={true} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
