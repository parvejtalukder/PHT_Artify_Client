import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const images = [
  {
    image: "https://media.timeout.com/images/103166739/750/562/image.jpg",
    alt: "Artwork on bg"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzLYZngDsa4VGXRVtss4q8ZHlfRxCYzCfWlQ&s",
    alt: "Artwork on bg"
  },
  {
    image: "https://ontheroadwithmariastephen.net/wp-content/uploads/2021/05/08541bde-34f7-4c90-bb23-8139ad0ecae1.jpeg?w=1024",
    alt: "Artwork on bg"
  }
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-140 overflow-hidden cinzel-font">
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index].image}   
          alt={images[index].alt}     
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-blue-950/80 py-30"></div>
      <div className="relative z-20 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-6 lg:px-10">
        <span className="inline-block px-4 py-1.5 rounded-full border border-yellow-400/50 text-yellow-300 text-sm tracking-widest uppercase mb-4 bg-black/20 backdrop-blur-sm cinzel-font font-bold">Discover Exceptional Art</span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight cinzel-font">Where Creativity <br />
          <span className="text-yellow-400 cinzel-font">
            <Typewriter
              words={['Breathes.', 'Inspires.', 'Connects.']}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={70}
              delaySpeed={1000}
            />
          </span>
        </h1>

        <p className="cinzel-font text-lg sm:text-xl text-gray-200  mb-6 max-w-2xl leading-relaxed">Explore a curated collection of contemporary masterpieces from emerging artists worldwide. Artify connects creators with collectors.</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/explore" className="px-8 py-4 text-white rounded-full cinzel-font font-extrabold bg-accent shadow-[inset_0_0_4px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center  hover:shadow-yellow-500/30">Start Exploring <ArrowRight size={20} className="ml-2" />
          </Link>
          <Link to="/register" className="px-8 py-4 text-white rounded-full cinzel-font font-extrabold bg-white/10 shadow-[inset_0_0_4px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center  hover:shadow-white/30"
          >Join Community</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;