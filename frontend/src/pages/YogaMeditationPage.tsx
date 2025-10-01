import React from 'react';
import { Play, Clock, Heart } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  duration: string;
  description: string;
  embedId: string;
  type: 'yoga' | 'meditation';
}

const VIDEOS: Video[] = [
  {
    id: '1',
    title: '10-Minute Morning Yoga',
    duration: '10 min',
    description: 'Start your day with gentle stretches and mindful movement',
    embedId: 'v7AYKMP6rOE',
    type: 'yoga'
  },
  {
    id: '2',
    title: 'Guided Meditation for Anxiety',
    duration: '15 min',
    description: 'Calm your mind and reduce anxiety with this soothing meditation',
    embedId: 'MIr3RsUWrdo',
    type: 'meditation'
  },
  {
    id: '3',
    title: 'Gentle Evening Stretch',
    duration: '12 min',
    description: 'Wind down your day with relaxing stretches and deep breathing',
    embedId: 'sTANio_2E0Q',
    type: 'yoga'
  }
];

const RECOMMENDED_MEDIA = [
  {
    title: 'Every Brilliant Thing',
    year: '2016',
    platform: 'HBO/Apple TV',
    description: 'A heartfelt drama where a son builds a list of life\'s joys to help his depressed mother, exploring themes of hope, resilience, and finding meaning in small moments.',
    link: 'https://tv.apple.com/us/movie/every-brilliant-thing/umc.cmc.5z4uvuwgzjr3f0a5z4w6k0bzx',
    image: '/api/placeholder/300/400'
  }
];

export function YogaMeditationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Mindful Movement & Meditation</h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Nurture your body and mind with guided yoga sessions and meditation practices designed to reduce stress and promote inner peace.
          </p>
        </div>

        {/* Video Grid */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Play className="h-6 w-6 text-green-400 mr-2" />
            <h2 className="text-2xl font-bold text-white">Mindful Movement & Meditation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((video) => (
              <div key={video.id} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="relative">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{video.description}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.embedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Watch Now
                  </a>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Media */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Heart className="h-6 w-6 text-green-400 mr-2" />
            <h2 className="text-2xl font-bold text-white">Recommended Watch</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RECOMMENDED_MEDIA.map((media, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-6 flex space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-32 bg-green-200 rounded-lg flex items-center justify-center">
                    <span className="text-green-800 font-medium text-sm">Movie Poster</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{media.title}</h3>
                  <p className="text-green-400 text-sm mb-2">{media.year} • {media.platform}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{media.description}</p>
                  <a
                    href={media.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg 
                             hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                             transition-colors duration-200"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-green-100">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Benefits of Regular Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Stress Reduction</h3>
              <p className="text-slate-700 text-sm">
                Regular meditation reduces cortisol levels and promotes a sense of calm and relaxation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Improved Flexibility</h3>
              <p className="text-slate-700 text-sm">
                Gentle yoga movements increase flexibility, strength, and overall physical well-being.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Better Sleep</h3>
              <p className="text-slate-700 text-sm">
                Evening practices help quiet the mind and prepare your body for restful sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}