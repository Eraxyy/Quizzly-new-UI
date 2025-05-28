import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RankingCard from '@/components/RankingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Rankings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('global');

  // Mock ranking data
  const globalRankings = [
    { id: '1', username: 'QuizMaster99', score: 2850, rank: 1, quizzesCompleted: 47, avatar: undefined },
    { id: '2', username: 'BrainiacBob', score: 2720, rank: 2, quizzesCompleted: 39, avatar: undefined },
    { id: '3', username: 'WisdomWizard', score: 2650, rank: 3, quizzesCompleted: 42, avatar: undefined },
    { id: '4', username: 'SmartCookie', score: 2580, rank: 4, quizzesCompleted: 35, avatar: undefined },
    { id: '5', username: 'ThinkTank', score: 2490, rank: 5, quizzesCompleted: 31, avatar: undefined },
    { id: '6', username: 'KnowledgeKing', score: 2420, rank: 6, quizzesCompleted: 38, avatar: undefined },
    { id: '7', username: 'FactFinder', score: 2380, rank: 7, quizzesCompleted: 29, avatar: undefined },
    { id: '8', username: 'QuizWhiz', score: 2340, rank: 8, quizzesCompleted: 33, avatar: undefined },
    { id: '9', username: 'MindBender', score: 2290, rank: 9, quizzesCompleted: 27, avatar: undefined },
    { id: '10', username: 'LogicLord', score: 2250, rank: 10, quizzesCompleted: 30, avatar: undefined }
  ];

  const weeklyRankings = [
    { id: '2', username: 'BrainiacBob', score: 450, rank: 1, quizzesCompleted: 8, avatar: undefined },
    { id: '1', username: 'QuizMaster99', score: 420, rank: 2, quizzesCompleted: 7, avatar: undefined },
    { id: '5', username: 'ThinkTank', score: 380, rank: 3, quizzesCompleted: 6, avatar: undefined },
    { id: '3', username: 'WisdomWizard', score: 360, rank: 4, quizzesCompleted: 5, avatar: undefined },
    { id: '8', username: 'QuizWhiz', score: 340, rank: 5, quizzesCompleted: 6, avatar: undefined }
  ];

  const dailyRankings = [
    { id: '5', username: 'ThinkTank', score: 95, rank: 1, quizzesCompleted: 2, avatar: undefined },
    { id: '2', username: 'BrainiacBob', score: 85, rank: 2, quizzesCompleted: 1, avatar: undefined },
    { id: '8', username: 'QuizWhiz', score: 80, rank: 3, quizzesCompleted: 1, avatar: undefined },
    { id: '1', username: 'QuizMaster99', score: 75, rank: 4, quizzesCompleted: 1, avatar: undefined }
  ];

  const categoryRankings = {
    Geography: [
      { id: '1', username: 'QuizMaster99', score: 850, rank: 1, quizzesCompleted: 15, avatar: undefined },
      { id: '3', username: 'WisdomWizard', score: 780, rank: 2, quizzesCompleted: 12, avatar: undefined },
      { id: '2', username: 'BrainiacBob', score: 720, rank: 3, quizzesCompleted: 10, avatar: undefined }
    ],
    Science: [
      { id: '2', username: 'BrainiacBob', score: 920, rank: 1, quizzesCompleted: 18, avatar: undefined },
      { id: '5', username: 'ThinkTank', score: 840, rank: 2, quizzesCompleted: 14, avatar: undefined },
      { id: '1', username: 'QuizMaster99', score: 780, rank: 3, quizzesCompleted: 12, avatar: undefined }
    ]
  };

  const tabs = [
    { id: 'global', label: 'Global', icon: '🌍' },
    { id: 'weekly', label: 'Weekly', icon: '📅' },
    { id: 'daily', label: 'Daily', icon: '⚡' },
    { id: 'category', label: 'By Category', icon: '📚' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Leaderboards
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how you stack up against other quiz enthusiasts from around the world!
          </p>
        </div>

        {/* User's Current Position */}
        {user && (
          <Card className="mb-8 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Your Current Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">#{user.rank}</p>
                  <p className="text-purple-100">Global Rank</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{user.score.toLocaleString()}</p>
                  <p className="text-purple-100">Total Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">23</p>
                  <p className="text-purple-100">Quizzes Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">78%</p>
                  <p className="text-purple-100">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Custom Tab Navigation with Smooth Transition */}
        <div className="mb-8">
          <div className="relative bg-white rounded-full p-1 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <div className="flex relative">
              {/* Active tab indicator */}
              <div 
                className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${100 / tabs.length}%`,
                  transform: `translateX(${tabs.findIndex(tab => tab.id === activeTab) * 100}%)`
                }}
              />
              
              {/* Tab buttons */}
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex-1 py-3 px-4 text-sm font-medium rounded-full transition-colors duration-300 ${
                    activeTab === tab.id 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'global' && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🌍</span>
                  <span>Global Leaderboard</span>
                  <Badge variant="secondary">All Time</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {globalRankings.map((rankedUser) => (
                  <RankingCard 
                    key={rankedUser.id} 
                    user={rankedUser}
                    isCurrentUser={user?.id === rankedUser.id}
                  />
                ))}
                {user && !globalRankings.find(u => u.id === user.id) && (
                  <div className="border-t pt-4">
                    <RankingCard user={user} isCurrentUser={true} />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'weekly' && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📅</span>
                  <span>Weekly Leaderboard</span>
                  <Badge variant="secondary">This Week</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyRankings.map((rankedUser) => (
                  <RankingCard 
                    key={rankedUser.id} 
                    user={rankedUser}
                    isCurrentUser={user?.id === rankedUser.id}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'daily' && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Daily Leaderboard</span>
                  <Badge variant="secondary">Today</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyRankings.map((rankedUser) => (
                  <RankingCard 
                    key={rankedUser.id} 
                    user={rankedUser}
                    isCurrentUser={user?.id === rankedUser.id}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'category' && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📚</span>
                  <span>Category Leaderboard</span>
                  <Badge variant="secondary">Top 3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categoryRankings).map(([category, rankings]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-2">{category}</h3>
                    {rankings.map((rankedUser) => (
                      <RankingCard 
                        key={`${category}-${rankedUser.id}`} 
                        user={rankedUser}
                        isCurrentUser={user?.id === rankedUser.id}
                      />
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Rankings;
