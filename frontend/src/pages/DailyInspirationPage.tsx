import React, { useState, useEffect } from 'react';
import { RefreshCw, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InspirationQuote {
  text: string;
  author: string;
}

const DEFAULT_QUOTES: InspirationQuote[] = [
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "The present moment is the only time over which we have dominion.", author: "Thich Nhat Hanh" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "Mindfulness is about being fully awake in our lives. It is about perceiving the exquisite vividness of each moment.", author: "Jon Kabat-Zinn" },
  { text: "You have been assigned this mountain to show others it can be moved.", author: "Mel Robbins" },
  { text: "The wound is the place where the Light enters you.", author: "Rumi" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "Every morning we are born again. What we do today is what matters most.", author: "Buddha" },
  { text: "You cannot control the waves, but you can learn to surf.", author: "Jon Kabat-Zinn" },
  { text: "Sometimes the most important thing in a whole day is the rest we take between two deep breaths.", author: "Etty Hillesum" },
  { text: "Let go or be dragged.", author: "Zen Proverb" },
  { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh" },
  { text: "The only way to live is by accepting each minute as an unrepeatable miracle.", author: "Tara Brach" },
  { text: "When you realize nothing is lacking, the whole world belongs to you.", author: "Lao Tzu" },
  { text: "One small positive thought in the morning can change your whole day.", author: "Unknown" },
  { text: "Wherever you are, be there totally.", author: "Eckhart Tolle" },
  { text: "Let yourself be silently drawn by the strange pull of what you really love.", author: "Rumi" },
  { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
  { text: "Silence is sometimes the best answer.", author: "Dalai Lama" },
  { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
  { text: "It’s not stress that kills us, it is our reaction to it.", author: "Hans Selye" },
  { text: "Nothing can harm you as much as your own thoughts unguarded.", author: "Buddha" },
  { text: "Life is available only in the present moment.", author: "Thich Nhat Hanh" },
  { text: "Be where you are; otherwise you will miss your life.", author: "Buddha" }
];


export function DailyInspirationPage() {
  const [quotes, setQuotes] = useState<InspirationQuote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomQuotes = () => {
    const shuffled = [...DEFAULT_QUOTES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const fetchQuotes = async () => {
    setIsLoading(true);
    
    // Simulate API call with placeholder for AI integration
    try {
      // In a real implementation, this would be:
      // const response = await fetch('https://api.cohere.ai/completions/v1/text', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${COHERE_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     prompt: 'Give me 3 short inspirational quotes for mental wellness.',
      //     model: 'command-xlarge-nightly'
      //   })
      // });
      
      // For now, we'll use our curated quotes with some randomization
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setQuotes(getRandomQuotes());
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setQuotes(getRandomQuotes()); // Fallback to default quotes
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-900 mb-4">Daily Inspiration</h1>
          <p className="text-lg text-slate-700 mb-8">
            Find peace and motivation in these carefully curated quotes designed to nurture your mind and soul.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchQuotes}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg 
                     hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Loading...' : 'New Quotes'}
          </motion.button>
        </motion.div>

        {/* Quotes */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {quotes.map((quote, index) => (
              <motion.div
                key={quote.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-green-100 
                         hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Quote className="h-6 w-6 text-green-600" />
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <blockquote className="text-lg text-slate-800 italic leading-relaxed mb-3">
                      "{quote.text}"
                    </blockquote>
                    <cite className="text-green-700 font-medium">— {quote.author}</cite>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Begin Your Journey</h2>
            <p className="text-slate-700 mb-6">
              Ready to dive deeper into mindfulness and self-reflection? Start journaling your thoughts and track your emotional well-being.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/journal'}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                       text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                       transition-all duration-200"
            >
              Begin Your Journey →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}