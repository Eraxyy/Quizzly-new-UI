
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizCard from '@/components/QuizCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const QuizPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCommunityFilter, setSelectedCommunityFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes les catégories', emoji: '🎯' },
    { id: 'geography', name: 'Géographie', emoji: '🌍' },
    { id: 'science', name: 'Science', emoji: '🧪' },
    { id: 'history', name: 'Histoire', emoji: '📚' },
    { id: 'sports', name: 'Sports', emoji: '⚽' },
    { id: 'culture', name: 'Culture Générale', emoji: '🎭' },
    { id: 'technology', name: 'Technologie', emoji: '💻' }
  ];

  const featuredQuizzes = [
    {
      id: '1',
      title: 'Capitales du Monde',
      description: 'Testez vos connaissances sur les capitales des pays du monde entier',
      category: 'Géographie',
      difficulty: 'Medium' as const,
      questionCount: 15,
      plays: 1234,
      duration: 10,
      tags: ['géographie', 'capitales', 'monde']
    },
    {
      id: '2',
      title: 'Sciences Physiques',
      description: 'Quiz sur les lois fondamentales de la physique',
      category: 'Science',
      difficulty: 'Hard' as const,
      questionCount: 20,
      plays: 856,
      duration: 15,
      tags: ['physique', 'sciences', 'lois']
    },
    {
      id: '3',
      title: 'Histoire de France',
      description: 'De la Gaule à nos jours, découvrez l\'histoire française',
      category: 'Histoire',
      difficulty: 'Medium' as const,
      questionCount: 25,
      plays: 2103,
      duration: 20,
      tags: ['france', 'histoire', 'chronologie']
    },
    {
      id: '4',
      title: 'Football International',
      description: 'Tout sur le football mondial et ses stars',
      category: 'Sports',
      difficulty: 'Easy' as const,
      questionCount: 12,
      plays: 1567,
      duration: 8,
      tags: ['football', 'sport', 'joueurs']
    }
  ];

  const communityQuizzes = [
    {
      id: '5',
      title: 'Films des années 90',
      description: 'Quiz créé par CinémaFan92',
      category: 'Culture Générale',
      difficulty: 'Medium' as const,
      questionCount: 18,
      plays: 423,
      duration: 12,
      tags: ['cinéma', 'années 90', 'films'],
      author: 'CinémaFan92'
    },
    {
      id: '6',
      title: 'Programmation JavaScript',
      description: 'Quiz créé par DevExpert',
      category: 'Technologie',
      difficulty: 'Hard' as const,
      questionCount: 30,
      plays: 789,
      duration: 25,
      tags: ['javascript', 'programmation', 'code'],
      author: 'DevExpert'
    }
  ];

  const filteredQuizzes = selectedCategory === 'all' 
    ? featuredQuizzes 
    : featuredQuizzes.filter(quiz => quiz.category.toLowerCase().includes(selectedCategory));

  const filteredCommunityQuizzes = selectedCommunityFilter === 'all'
    ? communityQuizzes
    : communityQuizzes.filter(quiz => quiz.category.toLowerCase().includes(selectedCommunityFilter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Découvrez nos Quiz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choisissez parmi nos catégories de quiz ou explorez les créations de la communauté
          </p>
          
          <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <Link to="/create-quiz">
              ➕ Créer mon Quiz
            </Link>
          </Button>
        </div>

        {/* Categories */}
        <Card className="mb-8 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Parcourir par Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`h-20 flex flex-col items-center justify-center space-y-2 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                      : 'hover:bg-purple-50'
                  }`}
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-xs text-center">{category.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Quizzes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiz en Vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex flex-col">
                <QuizCard quiz={quiz} />
              </div>
            ))}
          </div>
        </div>

        {/* Community Quizzes */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Quiz de la Communauté</CardTitle>
              <Select value={selectedCommunityFilter} onValueChange={setSelectedCommunityFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="geography">Géographie</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">Histoire</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="culture">Culture Générale</SelectItem>
                  <SelectItem value="technology">Technologie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunityQuizzes.map((quiz) => (
                <div key={quiz.id} className="relative">
                  <QuizCard quiz={quiz} />
                  <Badge className="absolute top-2 right-2 bg-orange-100 text-orange-800">
                    👥 Communauté
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuizPage;
