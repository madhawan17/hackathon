import React, { useState } from 'react';
import { CheckCircle, Circle, BarChart3, TrendingUp, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

interface QuizResult {
  score: number;
  category: string;
  description: string;
  recommendations: string[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'How often do you feel overwhelmed?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
  },
  {
    id: '2',
    question: 'How well do you sleep at night?',
    options: ['Very well', 'Well', 'Okay', 'Poorly', 'Very poorly']
  },
  {
    id: '3',
    question: 'How satisfied are you with your daily routine?',
    options: ['Very satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'Very unsatisfied']
  },
  {
    id: '4',
    question: 'How often do you engage in activities you enjoy?',
    options: ['Daily', 'A few times a week', 'Weekly', 'Rarely', 'Never']
  },
  {
    id: '5',
    question: 'How connected do you feel to others?',
    options: ['Very connected', 'Connected', 'Somewhat connected', 'Disconnected', 'Very disconnected']
  }
];

export function MoodQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / QUIZ_QUESTIONS.length;

    let result: QuizResult;

    if (averageScore <= 1) {
      result = {
        score: Math.round(averageScore * 25),
        category: 'Excellent Mental Wellness',
        description: 'You demonstrate strong mental wellness practices and emotional resilience.',
        recommendations: [
          'Continue your current wellness practices',
          'Consider sharing your strategies with others',
          'Maintain regular check-ins with yourself'
        ]
      };
    } else if (averageScore <= 2) {
      result = {
        score: Math.round(averageScore * 25),
        category: 'Good Mental Wellness',
        description: 'You have a solid foundation for mental wellness with room for growth.',
        recommendations: [
          'Incorporate more mindfulness practices',
          'Focus on improving sleep quality',
          'Engage in regular physical activity'
        ]
      };
    } else if (averageScore <= 3) {
      result = {
        score: Math.round(averageScore * 25),
        category: 'Moderate Mental Wellness',
        description: 'There are areas where you can improve your mental wellness and life satisfaction.',
        recommendations: [
          'Establish a consistent daily routine',
          'Practice stress management techniques',
          'Connect with supportive friends or family'
        ]
      };
    } else {
      result = {
        score: Math.round(averageScore * 25),
        category: 'Needs Attention',
        description: 'Your mental wellness could benefit from focused attention and support.',
        recommendations: [
          'Consider speaking with a mental health professional',
          'Start with small, manageable wellness practices',
          'Prioritize self-care and stress reduction'
        ]
      };
    }

    setQuizResult(result);
    setShowResults(true);

    // Save result to localStorage
    const previousResults = JSON.parse(localStorage.getItem('moodQuizResults') || '[]');
    const newResult = {
      ...result,
      timestamp: new Date().toISOString()
    };
    previousResults.unshift(newResult);
    localStorage.setItem('moodQuizResults', JSON.stringify(previousResults.slice(0, 10))); // Keep last 10 results
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizResult(null);
  };

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  if (showResults && quizResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-green-100"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <BarChart3 className="h-8 w-8 text-green-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-green-900 mb-2">Your Mood Assessment Results</h1>
              <p className="text-slate-700">Based on your responses, here's your wellness overview</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Score Display */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="text-4xl font-bold text-green-700 mb-2"
                  >
                    {quizResult.score}%
                  </motion.div>
                  <h3 className="text-xl font-semibold text-green-900 mb-3">{quizResult.category}</h3>
                  <p className="text-green-700">{quizResult.description}</p>
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-green-900 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {quizResult.recommendations.map((recommendation, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-slate-700">{recommendation}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                         transition-colors duration-200 mr-4"
              >
                Take Quiz Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/journal'}
                className="px-6 py-3 bg-white text-green-700 font-medium rounded-lg border border-green-300 
                         hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                         transition-colors duration-200"
              >
                Start Journaling
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-green-100"
        >
          {/* Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-700">
                Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-sm font-medium text-green-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-green-600 h-2 rounded-full"
              />
            </div>
          </motion.div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-green-900 mb-6">{question.question}</h2>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(question.id, index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                      answers[question.id] === index
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {answers[question.id] === index ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </motion.div>
                    <span className="font-medium">{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-white text-green-700 font-medium rounded-lg border border-green-300 
                       hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}