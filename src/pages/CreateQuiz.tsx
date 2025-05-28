
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    tags: ''
  });
  const [questions, setQuestions] = useState([{
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  }]);

  const categories = [
    { value: 'geography', label: 'Géographie', emoji: '🌍' },
    { value: 'science', label: 'Science', emoji: '🧪' },
    { value: 'history', label: 'Histoire', emoji: '📚' },
    { value: 'sports', label: 'Sports', emoji: '⚽' },
    { value: 'culture', label: 'Culture Générale', emoji: '🎭' },
    { value: 'technology', label: 'Technologie', emoji: '💻' }
  ];

  const difficulties = [
    { value: 'Easy', label: 'Facile', color: 'bg-green-100 text-green-800' },
    { value: 'Medium', label: 'Moyen', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Hard', label: 'Difficile', color: 'bg-red-100 text-red-800' }
  ];

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    if (field === 'options') {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quizData.title || !quizData.category || !quizData.difficulty) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires" });
      return;
    }

    if (questions.some(q => !q.question || q.options.some(opt => !opt))) {
      toast({ title: "Erreur", description: "Veuillez remplir toutes les questions et réponses" });
      return;
    }

    toast({ title: "Quiz créé!", description: "Votre quiz a été créé avec succès" });
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Créer votre Quiz
          </h1>
          <p className="text-xl text-gray-600">
            Partagez vos connaissances avec la communauté
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Quiz Information */}
          <Card className="mb-8 bg-white">
            <CardHeader>
              <CardTitle>Informations du Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du Quiz *
                </label>
                <Input
                  value={quizData.title}
                  onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                  placeholder="Ex: Les Capitales Européennes"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={quizData.description}
                  onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                  placeholder="Décrivez votre quiz..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <Select value={quizData.category} onValueChange={(value) => setQuizData({...quizData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.emoji} {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulté *
                  </label>
                  <Select value={quizData.difficulty} onValueChange={(value) => setQuizData({...quizData, difficulty: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir la difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff.value} value={diff.value}>
                          {diff.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (séparés par des virgules)
                </label>
                <Input
                  value={quizData.tags}
                  onChange={(e) => setQuizData({...quizData, tags: e.target.value})}
                  placeholder="Ex: géographie, europe, capitales"
                />
                {quizData.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {quizData.tags.split(',').map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card className="mb-8 bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Questions ({questions.length})</CardTitle>
                <Button type="button" onClick={addQuestion} variant="outline">
                  ➕ Ajouter une question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        variant="destructive"
                        size="sm"
                      >
                        🗑️ Supprimer
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question *
                      </label>
                      <Textarea
                        value={question.question}
                        onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                        placeholder="Tapez votre question..."
                        rows={2}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Réponses *
                      </label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                          <input
                            type="radio"
                            name={`correct-${questionIndex}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                            className="text-purple-600"
                          />
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...question.options];
                              newOptions[optionIndex] = e.target.value;
                              updateQuestion(questionIndex, 'options', newOptions);
                            }}
                            placeholder={`Réponse ${optionIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-1">
                        Cochez la bonne réponse
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-center space-x-4">
            <Button type="button" onClick={() => navigate('/quiz')} variant="outline">
              Annuler
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Créer le Quiz
            </Button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateQuiz;
