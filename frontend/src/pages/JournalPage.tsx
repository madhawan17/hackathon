import React, { useState, useEffect } from 'react';
import { Heart, Smile, Meh, Frown, Zap, Save, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface JournalEntry {
  id: string;
  mood: string;
  answers: {
    happiness: string;
    selfAppreciation: string;
    gratitude: string;
  };
  timestamp: string;
  reflection?: string;
}

interface MoodOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { id: 'happy', label: 'Happy', icon: <Smile className="h-6 w-6" />, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'calm', label: 'Calm', icon: <Heart className="h-6 w-6" />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'neutral', label: 'Neutral', icon: <Meh className="h-6 w-6" />, color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { id: 'sad', label: 'Sad', icon: <Frown className="h-6 w-6" />, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'stressed', label: 'Stressed', icon: <Zap className="h-6 w-6" />, color: 'bg-red-100 text-red-700 border-red-200' },
];

export function JournalPage() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [answers, setAnswers] = useState({
    happiness: '',
    selfAppreciation: '',
    gratitude: '',
  });
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [isGeneratingReflection, setIsGeneratingReflection] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  };

  const generateAIReflection = async (entry: JournalEntry): Promise<string> => {
    // Simulate AI reflection generation
    // In a real implementation, this would call an AI API
    const reflectionPrompts = [
      "Your journey of self-reflection shows incredible growth. Each moment of awareness brings you closer to inner peace.",
      "The gratitude you express illuminates the beauty in everyday moments. This mindful appreciation enriches your well-being.",
      "Your honest self-reflection demonstrates courage and wisdom. These insights are stepping stones to personal growth.",
      "The emotions you've shared today are valid and important. Your willingness to explore them shows remarkable self-awareness.",
      "Your gratitude practice is creating positive neural pathways that enhance your overall happiness and resilience."
    ];
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    return reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)];
  };

  const handleSaveEntry = async () => {
    if (!selectedMood || !answers.happiness || !answers.selfAppreciation || !answers.gratitude) {
      alert('Please complete all fields before saving.');
      return;
    }

    setIsGeneratingReflection(true);

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      answers,
      timestamp: new Date().toISOString(),
    };

    // Generate AI reflection
    try {
      const reflection = await generateAIReflection(newEntry);
      newEntry.reflection = reflection;
    } catch (error) {
      console.error('Error generating reflection:', error);
    }

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    // Reset form
    setSelectedMood('');
    setAnswers({
      happiness: '',
      selfAppreciation: '',
      gratitude: '',
    });

    setIsGeneratingReflection(false);
  };

  const getMoodOption = (moodId: string) => {
    return MOOD_OPTIONS.find(option => option.id === moodId);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Journal Entry Form */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100"
            >
              <h2 className="text-2xl font-bold text-green-900 mb-6">How are you feeling?</h2>
              
              {/* Mood Selection */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {MOOD_OPTIONS.map((mood, index) => (
                  <motion.button
                    key={mood.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                      selectedMood === mood.id
                        ? `${mood.color} border-opacity-100 transform scale-105`
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {mood.icon}
                    </motion.div>
                    <span className="font-medium text-sm">{mood.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Daily Reflection Questions */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-2 mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heart className="h-6 w-6 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-green-900">Daily Reflection</h2>
              </motion.div>
              
              <div className="space-y-6">
                {[
                  { key: 'happiness', label: 'What made you happy today?' },
                  { key: 'selfAppreciation', label: 'Write one good thing about yourself:' },
                  { key: 'gratitude', label: 'What are you grateful for right now?' }
                ].map((question, index) => (
                  <motion.div
                    key={question.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      {question.label}
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      value={answers[question.key as keyof typeof answers]}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswers({ ...answers, [question.key]: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 
                               focus:border-green-500 resize-none transition-colors duration-200"
                      rows={3}
                      placeholder="Take a moment to reflect..."
                    />
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveEntry}
                  disabled={isGeneratingReflection}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 
                           text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none 
                           focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 
                           disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isGeneratingReflection ? (
                    <>
                      <Sparkles className="h-5 w-5 animate-spin" />
                      <span>Generating AI Insight...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>Save Entry</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Previous Entries */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100"
            >
              <h2 className="text-2xl font-bold text-green-900 mb-6">Your Journey</h2>
              
              <AnimatePresence mode="wait">
                {entries.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Heart className="h-8 w-8 text-green-600" />
                    </motion.div>
                    <p className="text-gray-600">No entries yet</p>
                    <p className="text-sm text-gray-500 mt-1">Start journaling to see your entries here!</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <AnimatePresence>
                      {entries.slice(0, 5).map((entry, index) => {
                        const moodOption = getMoodOption(entry.mood);
                        const isExpanded = expandedEntry === entry.id;
                        
                        return (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-lg p-4 bg-white"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                {moodOption && (
                                  <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className={`p-2 rounded-full ${moodOption.color.split(' ')[0]} ${moodOption.color.split(' ')[1]}`}
                                  >
                                    {moodOption.icon}
                                  </motion.div>
                                )}
                                <span className="text-sm text-gray-500">{formatDate(entry.timestamp)}</span>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                              </motion.button>
                            </div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="space-y-4 pt-4">
                                    <div>
                                      <h3 className="text-sm font-medium text-gray-700 mb-1">Happiness</h3>
                                      <p className="text-gray-600">{entry.answers.happiness}</p>
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-medium text-gray-700 mb-1">Self Appreciation</h3>
                                      <p className="text-gray-600">{entry.answers.selfAppreciation}</p>
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-medium text-gray-700 mb-1">Gratitude</h3>
                                      <p className="text-gray-600">{entry.answers.gratitude}</p>
                                    </div>
                                    {entry.reflection && (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-green-50 rounded-lg p-4"
                                      >
                                        <h3 className="text-sm font-medium text-green-700 mb-1">AI Reflection</h3>
                                        <p className="text-green-600 italic">{entry.reflection}</p>
                                      </motion.div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}