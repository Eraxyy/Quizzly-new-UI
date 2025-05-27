
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import RankingCard from '@/components/RankingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Rankings = () => {
  const { user } = useAuth();

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

        {/* Rankings Tabs */}
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="daily" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="category" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(categoryRankings).map(([category, rankings]) => (
                <Card key={category} className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>📚</span>
                      <span>{category}</span>
                      <Badge variant="secondary">Top 3</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rankings.map((rankedUser) => (
                      <RankingCard 
                        key={`${category}-${rankedUser.id}`} 
                        user={rankedUser}
                        isCurrentUser={user?.id === rankedUser.id}
                      />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rankings;
