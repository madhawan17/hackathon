import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24hr)
  text: string;
}

export function DiaryPage() {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  });
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedEntries = localStorage.getItem("diaryEntriesV2");
    if (savedEntries) {
      const parsed: DiaryEntry[] = JSON.parse(savedEntries);
      setEntries(parsed);
      setStreak(getStreak(parsed));
    }
  }, []);

  useEffect(() => {
    setStreak(getStreak(entries));
  }, [entries]);

  function getStreak(entries: DiaryEntry[]): number {
    if (entries.length === 0) return 0;
    // Unique days with entries, sorted descending
    const uniqueDates = Array.from(
      new Set(entries.map(e => e.date))
    ).sort((a, b) => b.localeCompare(a));
    let streak = 0;
    let current = new Date();
    for (let i = 0; i < uniqueDates.length; i++) {
      const entryDate = new Date(uniqueDates[i]);
      if (
        entryDate.getFullYear() === current.getFullYear() &&
        entryDate.getMonth() === current.getMonth() &&
        entryDate.getDate() === current.getDate()
      ) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !text.trim()) {
      alert("Please select a date and enter your thoughts.");
      return;
    }
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date,
      time,
      text,
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("diaryEntriesV2", JSON.stringify(updated));
    setText(""); // clear textarea after save
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-10 px-4 flex flex-col items-center"
    >
      {/* Diary Form Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/90 rounded-xl shadow-lg p-8 mb-8"
      >
        {/* Streak Counter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-bold text-green-900">Diary Entry</h2>
          <div className="flex items-center space-x-2">
            <span className="text-green-700 font-semibold text-lg">
              🔥 Streak: {streak}
            </span>
          </div>
        </motion.div>
        <form onSubmit={handleSave} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="diaryDate" className="block text-green-700 font-medium mb-2">
              Select Date
            </label>
            <input
              type="date"
              id="diaryDate"
              name="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              max={new Date().toISOString().substring(0, 10)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="diaryText" className="block text-green-700 font-medium mb-2">
              Your Thoughts
            </label>
            <textarea
              id="diaryText"
              name="text"
              rows={8}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: "100%", borderRadius: "8px", padding: "1rem" }}
              className="border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Save Entry
          </motion.button>
        </form>
      </motion.div>

      {/* Diary Entries Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-xl bg-white/90 rounded-xl shadow p-8"
      >
        <h2 className="text-xl font-bold text-green-900 mb-4">Your Diary Entries</h2>
        <AnimatePresence>
          {entries.length === 0 ? (
            <motion.div
              key="no-entries"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="text-gray-600 text-center"
            >
              No diary entries yet.
            </motion.div>
          ) : (
            <ul className="space-y-6">
              <AnimatePresence>
                {entries
                  .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
                  .map((entry, idx) => (
                    <motion.li
                      key={entry.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.1 * idx }}
                      className="border border-gray-200 rounded-lg p-4 bg-white"
                    >
                      <div className="text-sm text-gray-500 mb-2 font-semibold">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {entry.time}
                      </div>
                      <div className="whitespace-pre-wrap text-gray-700">{entry.text}</div>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}