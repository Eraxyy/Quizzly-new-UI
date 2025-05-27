
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  // Mock quiz data
  const quiz = {
    id: id,
    title: 'World Capitals Challenge',
    description: 'Test your knowledge of world capitals',
    totalQuestions: 5,
    timeLimit: 900
  };

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      correctAnswer: 2,
      explanation: 'Canberra is the capital city of Australia, located in the Australian Capital Territory.'
    },
    {
      id: '2',
      question: 'Which city is the capital of Japan?',
      options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'],
      correctAnswer: 2,
      explanation: 'Tokyo is the capital and most populous city of Japan.'
    },
    {
      id: '3',
      question: 'What is the capital of Brazil?',
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
      correctAnswer: 2,
      explanation: 'Brasília is the federal capital of Brazil and seat of government.'
    },
    {
      id: '4',
      question: 'Which city serves as the capital of Canada?',
      options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
      correctAnswer: 3,
      explanation: 'Ottawa is the capital city of Canada, located in southeastern Ontario.'
    },
    {
      id: '5',
      question: 'What is the capital of South Africa?',
      options: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'],
      correctAnswer: 3,
      explanation: 'Pretoria is the executive capital of South Africa, though the country has three capitals.'
    }
  ];

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleQuizComplete();
    }
  }, [timeLeft, quizStarted, showResult]);

  const startQuiz = () => {
    setQuizStarted(true);
    toast({ title: "Quiz Started!", description: "Good luck! You have 15 minutes to complete." });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        handleQuizComplete();
      }
    }
  };

  const handleQuizComplete = () => {
    setShowResult(true);
    const finalScore = selectedAnswer === questions[currentQuestion]?.correctAnswer ? score + 1 : score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    toast({ 
      title: "Quiz Completed!", 
      description: `You scored ${finalScore}/${questions.length} (${percentage}%)` 
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {quiz.title}
            </CardTitle>
            <p className="text-gray-600 mt-2">{quiz.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{quiz.totalQuestions}</p>
                <p className="text-sm text-gray-600">Questions</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{formatTime(quiz.timeLimit)}</p>
                <p className="text-sm text-gray-600">Time Limit</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">5</p>
                <p className="text-sm text-gray-600">Points Each</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Quiz Rules:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Answer all questions within the time limit</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Each correct answer earns you 5 points</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>You cannot go back to previous questions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Results will be added to your profile score</span>
                </li>
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={() => navigate('/')} 
                variant="outline" 
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button 
                onClick={startQuiz} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
            <div className="mt-4">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {percentage}%
              </div>
              <p className="text-xl text-gray-600 mt-2">
                You scored {finalScore} out of {questions.length} questions correctly
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{finalScore}</p>
                <p className="text-sm text-gray-600">Correct Answers</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">{questions.length - finalScore}</p>
                <p className="text-sm text-gray-600">Incorrect Answers</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Performance Badge:</h3>
              <div className="flex justify-center">
                {percentage >= 80 && (
                  <Badge className="text-lg py-2 px-4 bg-gold-100 text-gold-800">🏆 Excellent!</Badge>
                )}
                {percentage >= 60 && percentage < 80 && (
                  <Badge className="text-lg py-2 px-4 bg-blue-100 text-blue-800">👍 Good Job!</Badge>
                )}
                {percentage < 60 && (
                  <Badge className="text-lg py-2 px-4 bg-gray-100 text-gray-800">💪 Keep Practicing!</Badge>
                )}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={() => navigate('/')} 
                variant="outline" 
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
          >
            ← Exit Quiz
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{formatTime(timeLeft)}</div>
            <p className="text-sm text-gray-600">Time Left</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`p-4 h-auto text-left justify-start ${
                    selectedAnswer === index 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'hover:bg-purple-50'
                  }`}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center">
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {currentQuestion + 1 === questions.length ? 'Complete Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
