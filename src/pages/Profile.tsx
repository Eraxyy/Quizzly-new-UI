
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  // Mock user stats and achievements
  const stats = {
    quizzesCompleted: 23,
    averageScore: 78,
    totalPoints: user.score,
    currentRank: user.rank,
    favoriteCategory: 'Geography',
    longestStreak: 7
  };

  const achievements = [
    { name: 'First Quiz', description: 'Complete your first quiz', earned: true, icon: '🎯' },
    { name: 'Speed Demon', description: 'Complete a quiz in under 5 minutes', earned: true, icon: '⚡' },
    { name: 'Perfect Score', description: 'Get 100% on any quiz', earned: true, icon: '💯' },
    { name: 'Quiz Master', description: 'Complete 50 quizzes', earned: false, icon: '👑' },
    { name: 'Knowledge Seeker', description: 'Try quizzes from 5 different categories', earned: true, icon: '📚' },
    { name: 'Top 10', description: 'Reach top 10 on the leaderboard', earned: false, icon: '🏆' }
  ];

  const recentQuizzes = [
    { name: 'World Capitals Challenge', score: 85, date: '2024-01-15', category: 'Geography' },
    { name: 'JavaScript Fundamentals', score: 92, date: '2024-01-14', category: 'Programming' },
    { name: 'Movie Trivia Night', score: 76, date: '2024-01-13', category: 'Entertainment' },
    { name: 'Science Quiz Pro', score: 68, date: '2024-01-12', category: 'Science' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="bg-white text-purple-600 text-2xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                <p className="text-purple-100 mb-4">{user.email}</p>
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                    <p className="text-purple-100">Total Points</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">#{stats.currentRank}</p>
                    <p className="text-purple-100">Global Rank</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.quizzesCompleted}</p>
                    <p className="text-purple-100">Quizzes Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Stats */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Performance Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{stats.averageScore}%</p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{stats.longestStreak}</p>
                    <p className="text-sm text-gray-600">Longest Streak</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{stats.favoriteCategory}</p>
                    <p className="text-sm text-gray-600">Favorite Category</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">4.8</p>
                    <p className="text-sm text-gray-600">Avg. Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Quiz History */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recent Quiz History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{quiz.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="secondary" className="text-xs">{quiz.category}</Badge>
                          <span className="text-sm text-gray-500">{quiz.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${quiz.score >= 80 ? 'text-green-600' : quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {quiz.score}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-xs ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-green-100 text-green-800">Earned</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Take a Quiz
                </Button>
                <Button 
                  onClick={() => navigate('/rankings')} 
                  variant="outline" 
                  className="w-full"
                >
                  View Rankings
                </Button>
                <Button 
                  onClick={logout} 
                  variant="outline" 
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
