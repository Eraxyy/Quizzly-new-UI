
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  username: string;
  avatar?: string;
  score: number;
  rank: number;
  quizzesCompleted: number;
}

interface RankingCardProps {
  user: User;
  isCurrentUser?: boolean;
}

const RankingCard = ({ user, isCurrentUser = false }: RankingCardProps) => {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { emoji: '🥇', color: 'bg-yellow-100 text-yellow-800' };
    if (rank === 2) return { emoji: '🥈', color: 'bg-gray-100 text-gray-800' };
    if (rank === 3) return { emoji: '🥉', color: 'bg-amber-100 text-amber-800' };
    return { emoji: '🏅', color: 'bg-blue-100 text-blue-800' };
  };

  const rankBadge = getRankBadge(user.rank);

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isCurrentUser ? 'ring-2 ring-purple-500 bg-purple-50' : 'bg-white'}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Badge className={`text-sm font-bold ${rankBadge.color}`}>
              {rankBadge.emoji} #{user.rank}
            </Badge>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {user.username}
              {isCurrentUser && <span className="text-purple-600 ml-2">(You)</span>}
            </h3>
            <p className="text-sm text-gray-600">{user.quizzesCompleted} quizzes completed</p>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold text-purple-600">{user.score.toLocaleString()}</p>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingCard;
