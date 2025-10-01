import React from 'react';
import { Mail, MapPin, Star, User } from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  experience: string;
  location: string;
  rating: number;
  bio: string;
  contact: string;
  image: string;
}

const THERAPISTS: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Maya Patel',
    credentials: 'PhD, Licensed Clinical Psychologist',
    specialty: 'Anxiety & Stress Management',
    experience: '8 years',
    location: 'San Francisco, CA',
    rating: 4.9,
    bio: 'Dr. Patel specializes in cognitive-behavioral therapy and mindfulness-based interventions for anxiety disorders. She has extensive experience helping clients develop healthy coping strategies.',
    contact: 'maya.patel@example.com',
    image: '/api/placeholder/150/150'
  },
  {
    id: '2',
    name: 'Liam Chen',
    credentials: 'MFT, Licensed Marriage & Family Therapist',
    specialty: 'Family & Couples Therapy',
    experience: '6 years',
    location: 'Los Angeles, CA',
    rating: 4.8,
    bio: 'Liam uses evidence-based approaches to help couples and families improve communication, resolve conflicts, and strengthen their relationships.',
    contact: 'liam.chen@example.com',
    image: '/api/placeholder/150/150'
  },
  {
    id: '3',
    name: 'Dr. Sara Nguyen',
    credentials: 'PhD, Clinical Psychologist',
    specialty: 'Depression & Mood Disorders',
    experience: '10 years',
    location: 'Seattle, WA',
    rating: 4.9,
    bio: 'Dr. Nguyen specializes in treating depression and mood disorders using a combination of cognitive-behavioral therapy and interpersonal therapy approaches.',
    contact: 'sara.nguyen@example.com',
    image: '/api/placeholder/150/150'
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    credentials: 'LCSW, Licensed Clinical Social Worker',
    specialty: 'Trauma & PTSD',
    experience: '7 years',
    location: 'Austin, TX',
    rating: 4.7,
    bio: 'Michael provides trauma-informed care using EMDR and other evidence-based treatments to help clients heal from traumatic experiences.',
    contact: 'michael.rodriguez@example.com',
    image: '/api/placeholder/150/150'
  },
  {
    id: '5',
    name: 'Dr. Emily Thompson',
    credentials: 'PsyD, Licensed Clinical Psychologist',
    specialty: 'Adolescent & Young Adult Therapy',
    experience: '5 years',
    location: 'Denver, CO',
    rating: 4.8,
    bio: 'Dr. Thompson works with teens and young adults navigating life transitions, identity issues, and mental health challenges using person-centered approaches.',
    contact: 'emily.thompson@example.com',
    image: '/api/placeholder/150/150'
  },
  {
    id: '6',
    name: 'James Mitchell',
    credentials: 'LPCC, Licensed Professional Clinical Counselor',
    specialty: 'Addiction & Substance Abuse',
    experience: '9 years',
    location: 'Phoenix, AZ',
    rating: 4.6,
    bio: 'James provides compassionate, non-judgmental support for individuals struggling with addiction using motivational interviewing and relapse prevention techniques.',
    contact: 'james.mitchell@example.com',
    image: '/api/placeholder/150/150'
  }
];

export function TherapistDirectoryPage() {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8E6C9] to-[#E0F7FA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Find Your Therapist</h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Connect with licensed mental health professionals who can provide personalized support for your wellness journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">Search by Name</label>
              <input
                type="text"
                placeholder="Enter therapist name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                         transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">Specialty</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                               transition-colors duration-200">
                <option value="">All Specialties</option>
                <option value="anxiety">Anxiety & Stress</option>
                <option value="depression">Depression</option>
                <option value="couples">Couples Therapy</option>
                <option value="trauma">Trauma & PTSD</option>
                <option value="addiction">Addiction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">Location</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                               transition-colors duration-200">
                <option value="">All Locations</option>
                <option value="sf">San Francisco, CA</option>
                <option value="la">Los Angeles, CA</option>
                <option value="seattle">Seattle, WA</option>
                <option value="austin">Austin, TX</option>
                <option value="denver">Denver, CO</option>
                <option value="phoenix">Phoenix, AZ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Therapist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {THERAPISTS.map((therapist) => (
            <div key={therapist.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-900">{therapist.name}</h3>
                    <p className="text-sm text-green-700">{therapist.credentials}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1">
                        {renderStars(therapist.rating)}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{therapist.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-slate-700">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    {therapist.location}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">Specialty:</p>
                    <p className="text-sm text-slate-700">{therapist.specialty}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">Experience:</p>
                    <p className="text-sm text-slate-700">{therapist.experience}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{therapist.bio}</p>

                {/* Contact Button */}
                <a
                  href={`mailto:${therapist.contact}`}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 
                           text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none 
                           focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notice</h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            This directory provides information about licensed mental health professionals. Please verify credentials and licensing status before beginning treatment. If you're experiencing a mental health emergency, please contact your local emergency services or call the National Suicide Prevention Lifeline at 988.
          </p>
        </div>
      </div>
    </div>
  );
}