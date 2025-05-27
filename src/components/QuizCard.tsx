
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionCount: number;
  plays: number;
  duration: number;
  image?: string;
}

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
              {quiz.title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{quiz.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <Badge variant="secondary" className="text-xs">{quiz.category}</Badge>
          <Badge className={`text-xs ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{quiz.questionCount} questions</span>
          <span>{quiz.duration} min</span>
          <span>{quiz.plays.toLocaleString()} plays</span>
        </div>
        
        <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Link to={`/quiz/${quiz.id}`}>
            Start Quiz
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
