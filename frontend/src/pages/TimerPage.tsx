import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Clock, Settings } from 'lucide-react';

interface TimerPreset {
  name: string;
  minutes: number;
  seconds: number;
}

const TIMER_PRESETS: TimerPreset[] = [
  { name: 'Pomodoro', minutes: 25, seconds: 0 },
  { name: 'Short Break', minutes: 5, seconds: 0 },
  { name: 'Long Break', minutes: 15, seconds: 0 },
  { name: 'Deep Work', minutes: 45, seconds: 0 },
];

export function TimerPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (timeLeft === 0) {
      const totalSeconds = minutes * 60 + seconds;
      setTimeLeft(totalSeconds);
    }
    setIsRunning(true);
    setIsCompleted(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsCompleted(false);
  };

  const setPreset = (preset: TimerPreset) => {
    if (!isRunning) {
      setMinutes(preset.minutes);
      setSeconds(preset.seconds);
      setTimeLeft(0);
      setIsCompleted(false);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft > 0 ? ((minutes * 60 + seconds - timeLeft) / (minutes * 60 + seconds)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Focus Timer</h1>
          <p className="text-lg text-slate-700">
            Stay focused and productive with the Pomodoro Technique
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer Display */}
          <div className="bg-slate-800 rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium mb-4">
                <Clock className="h-4 w-4 mr-2" />
                Focus Time
              </div>
            </div>

            <div className="mb-8">
              <div className="text-6xl md:text-7xl font-mono font-bold text-white mb-4">
                {timeLeft > 0 ? formatTime(timeLeft) : formatTime(minutes * 60 + seconds)}
              </div>
              
              {/* Progress Ring */}
              {timeLeft > 0 && (
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-600"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-green-500"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${progress}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              )}

              {isCompleted && (
                <div className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6">
                  <p className="font-semibold">Time's up! Great work! 🎉</p>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg 
                           hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                           transition-colors duration-200"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Timer
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="flex items-center px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg 
                           hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
                           transition-colors duration-200"
                >
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </button>
              )}
              
              <button
                onClick={stopTimer}
                className="flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg 
                         hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
                         transition-colors duration-200"
              >
                <Square className="h-5 w-5 mr-2" />
                Stop
              </button>
            </div>
          </div>

          {/* Timer Settings */}
          <div className="space-y-6">
            {/* Timer Settings */}
            <div className="bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-5 w-5 text-white mr-2" />
                <h2 className="text-xl font-bold text-white">Timer Settings</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minutes</label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={minutes}
                    onChange={(e) => !isRunning && setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                    disabled={isRunning}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                             focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 
                             disabled:cursor-not-allowed transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Seconds</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => !isRunning && setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    disabled={isRunning}
                    className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                             focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 
                             disabled:cursor-not-allowed transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-slate-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Presets</h2>
              <div className="grid grid-cols-2 gap-3">
                {TIMER_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setPreset(preset)}
                    disabled={isRunning}
                    className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 
                             hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 
                             disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <div className="font-medium text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-400">
                      {preset.minutes}:{preset.seconds.toString().padStart(2, '0')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}