import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const JoinCommunity = () => {

  return (
    <section className="relative lg:rounded-3xl bg-accent shadow-2xl overflow-hidden max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10 px-8 py-16 md:p-20 text-center text-white">
          <Users size={48} className="mx-auto mb-6 text-gold-200" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Join Our Global Art Community
          </h2>
          <p className="text-xl text-gold-100 mb-10 max-w-2xl mx-auto">
            Connect with thousands of artists and art lovers. Share your passion, get feedback, and grow your audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="px-8 py-4 flex justify-center items-center w-full lg:w-auto text-white rounded-full cinzel-font font-extrabold bg-white/10 shadow-[inset_0_0_4px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center  hover:shadow-white/30">Join Community</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
