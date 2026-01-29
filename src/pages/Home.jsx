import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaTractor, FaLeaf, FaSeedling, FaWater, FaSun, FaCamera, FaHandHoldingWater, FaTree } from 'react-icons/fa';
import logo1 from '../assets/logo1.jpg';
import farmVideo from '../assets/a1.mp4';

const closeplant1 = 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600';
const closeplant2 = 'https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?auto=compress&cs=tinysrgb&w=600';
const arial = 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=600';

function PlantingIcon() {
  return (
    <svg 
      viewBox="0 0 48 48" 
      className="w-12 h-12"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Plant Stem */}
      <motion.path
        d="M24 45V25"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
      
      {/* Leaves */}
      <motion.path
        d="M24 25C24 25 18 15 24 8C30 15 24 25 24 25Z"
        fill="#22c55e"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1, 0.9, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.path
        d="M24 22C24 22 30 12 24 5C18 12 24 22 24 22Z"
        fill="#16a34a"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1, 0.9, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 3,
          delay: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Side Leaves */}
      <motion.path
        d="M24 30C24 30 16 28 12 22C20 24 24 30 24 30Z"
        fill="#22c55e"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1, 0.9, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          delay: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.path
        d="M24 30C24 30 32 28 36 22C28 24 24 30 24 30Z"
        fill="#16a34a"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1, 0.9, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 3,
          delay: 0.9,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Ground/Pot */}
      <motion.path
        d="M15 45H33C33 45 36 42 36 40C36 38 35 37 31 37H17C13 37 12 38 12 40C12 42 15 45 15 45Z"
        fill="#854d0e"
        initial={{ scaleY: 0 }}
        animate={{ 
          scaleY: [0, 1, 0.95, 1],
          y: [2, 0, 1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </svg>
  );
}

function Home() {
  const farmingPhotos = [
    {
      url: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600",
      title: "Sustainable Rice Farming",
      description: "Traditional paddy cultivation using eco-friendly methods"
    },
    {
      url: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600",
      title: "Organic Vegetable Garden",
      description: "Chemical-free cultivation of fresh vegetables"
    },
    {
      url: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=600",
      title: "Modern Irrigation",
      description: "Advanced water management systems for efficient farming"
    },
    {
      url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600",
      title: "Greenhouse Farming",
      description: "Controlled environment agriculture for year-round production"
    },
    {
      url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600",
      title: "Soil Preparation",
      description: "Essential groundwork for successful crop growth"
    },
    {
      url: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=600",
      title: "Wheat Cultivation",
      description: "Large-scale grain production for food security"
    },
    {
      url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600",
      title: "Fruit Orchards",
      description: "Systematic cultivation of fruit-bearing trees"
    },
    {
      url: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600",
      title: "Vertical Farming",
      description: "Space-efficient urban agriculture solutions"
    },
    {
      url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=600",
      title: "Organic Fertilization",
      description: "Natural methods for soil enrichment"
    },
    {
      url: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=600",
      title: "Harvesting Technology",
      description: "Modern equipment for efficient crop collection"
    },
    {
      url: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600",
      title: "Seed Selection",
      description: "Choosing quality seeds for better yields"
    },
    {
      url: "https://images.unsplash.com/photo-1602330102257-04c00af50c1a?auto=format&fit=crop&w=600",
      title: "Water Conservation",
      description: "Efficient water usage in agriculture"
    },
    {
      url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600",
      title: "Crop Rotation",
      description: "Sustainable land use through varied cultivation"
    },
    {
      url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600",
      title: "Smart Farming",
      description: "Technology-driven agricultural practices"
    },
    {
      url: "https://images.unsplash.com/photo-1595356700395-6f14b5c1f33f?auto=format&fit=crop&w=600",
      title: "Community Farming",
      description: "Collaborative agricultural initiatives"
    }
  ];

  const sustainabilityImages = [
    {
      url: closeplant1,
      title: "Traditional Farming",
      description: "Embracing age-old farming wisdom with modern techniques",
      icon: FaTractor
    },
    {
      url: closeplant2,
      title: "Sustainable Growth",
      description: "Nurturing plants with care for a greener future",
      icon: FaHandHoldingWater
    },
    {
      url: arial,
      title: "Aerial Farming",
      description: "Modern perspective on agricultural landscapes",
      icon: FaLeaf
    }
  ];

  return (
    <div className="relative">
      <div 
        className="fixed inset-0 bg-gradient-to-br from-green-50 to-green-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l7.9-7.9h-.83zm5.657 0L19.514 8.485 20.93 9.9l8.485-8.485h-1.415zM32.372 0L26.8 5.657 28.214 7.07l5.657-5.657h-1.5zM38.03 0L29.543 8.485l1.415 1.415L41.37 0h-3.34zM43.687 0L35.2 8.485l1.415 1.415L45.1 1.415 43.687 0zm-15.115 0L29.543 0 35.2 5.657 33.785 7.07 28.572 0zm-5.657 0L26.8 3.828l-1.415 1.415L20.93 0h2.828zM16.686 0L24.17 7.485 22.757 8.9l-7.9-7.9h1.83zm5.657 0L28.8 6.485 27.384 7.9l-7.9-7.9h2.83zm5.657 0L34.457 6.485 33.043 7.9l-7.9-7.9h2.83zm5.657 0L40.114 6.485 38.7 7.9l-7.9-7.9h2.83zm5.657 0L45.77 6.485 44.357 7.9l-7.9-7.9h2.83zm5.657 0L51.427 6.485 50.014 7.9l-7.9-7.9h2.83zM51.427 0L52.84 1.414 51.427 2.828 50.014 1.414 51.427 0zM46.684 0l1.414 1.414-1.414 1.414L45.27 1.414 46.684 0zM41.94 0l1.415 1.414-1.414 1.414L40.527 1.414 41.94 0zM37.198 0l1.414 1.414-1.414 1.414L35.784 1.414 37.198 0zM32.456 0l1.414 1.414-1.414 1.414L31.042 1.414 32.456 0zM27.714 0l1.414 1.414-1.414 1.414L26.3 1.414 27.714 0zM22.972 0l1.414 1.414-1.414 1.414L21.558 1.414 22.972 0zM18.23 0l1.414 1.414-1.414 1.414L16.816 1.414 18.23 0z' fill='%2322c55e' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="relative z-10">
        <div className="relative bg-gradient-to-r from-green-600/50 to-green-700/50 text-white"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/60 to-green-700/60" />
          <div className="relative max-w-7xl mx-auto px-4 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6">
                Empowering Farmers Through Technology
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                FARM-SMart brings innovative solutions to agriculture, combining traditional wisdom with modern technology to enhance farming practices, improve yields, and ensure sustainable growth for a better tomorrow.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-100"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100"
              >
                <img
                  src={logo1}
                  alt="Farmer in field"
                  className="w-full h-full object-cover mix-blend-multiply filter contrast-125 brightness-110"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8))'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-100/50 to-transparent mix-blend-overlay" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <PlantingIcon />
                  <h2 className="text-3xl font-bold text-gray-800">THE FARMING</h2>
                </div>

                <div className="prose max-w-none text-gray-600 space-y-4">
                  <p className="leading-relaxed">
                    Farming is the heart of providing food and resources for people. It's about working with the land, nurturing crops, and caring for animals. Farmers put in hard work to grow what we need to live, while also taking care of the environment. With each season, they face challenges, but they keep going to feed families and communities. Farming is not just a job; it's a way of life that connects us all to nature and each other.
                  </p>

                  <p className="leading-relaxed">
                    Through farming, we experience the cycle of life, from planting seeds to harvesting the fruits of hard work. It's a reminder of the beauty of nature and the importance of sustainable practices to protect our future. Whether it's growing food, raising livestock, or taking care of the soil, farming brings us closer to the earth and helps us appreciate the simple things that nourish our lives.
                  </p>

                  <div className="space-y-4 pl-6">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800 text-3xl">Key Stages of the Farming Process</h4>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800 mb-4"></h4>
                      <h4 className="font-semibold text-gray-800 mb-4">1. Planning and Research</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">2. Land Preparation</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">3. Selecting Seeds or Livestock</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">4. Planting or Breeding</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">5. Irrigation and Water Management</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">6. Fertilization and Soil Health</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">7. Weed and Pest Control</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">8. Crop Maintenance and Care</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">9. Harvesting</h4>
                      <h4 className="font-semibold text-gray-800 mb-4">10. Post-Harvest Handling and Storage</h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-100"
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <FaCamera className="text-3xl text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800">Farming Gallery</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {farmingPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-xl aspect-square"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-4">
                        <h3 className="text-white font-semibold text-lg mb-1">{photo.title}</h3>
                        <p className="text-gray-200 text-sm">{photo.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-100"
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <FaLeaf className="text-3xl text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800">Sustainable Farming Practices</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sustainabilityImages.slice(0, 2).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative group overflow-hidden rounded-xl"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="text-2xl text-green-400" />
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          </div>
                          <p className="text-gray-200">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Third image in full width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group overflow-hidden rounded-xl mt-8"
              >
                <div className="aspect-[21/9] overflow-hidden">
                  <img
                    src={sustainabilityImages[2].url}
                    alt={sustainabilityImages[2].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      {(() => {
                        const Icon = sustainabilityImages[2].icon;
                        return <Icon className="text-2xl text-green-400" />;
                      })()}
                      <h3 className="text-xl font-bold text-white">{sustainabilityImages[2].title}</h3>
                    </div>
                    <p className="text-gray-200">{sustainabilityImages[2].description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-8 text-center overflow-hidden border border-black/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative mb-8">
              <video 
                className="w-full h-[500px] object-cover rounded-lg shadow-lg border border-black"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={farmVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-900/30 to-transparent rounded-lg border border-black/10">
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-0 right-0 text-center text-yellow-400 text-3xl font-serif italic px-4"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                "Cultivating the Future, One Seed Today"
              </motion.p>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4"></h2>
            <p className="text-lg text-green-700 mb-6">
              
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-600 text-2xl font-medium italic text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 border border-black/10">
              Just like a river nourishes the land, farming is the cultivation of life, rooted in timeless wisdom.
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;