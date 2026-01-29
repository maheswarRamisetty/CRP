import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBuilding, FaUsers, FaHandshake, FaLeaf, FaSeedling, FaTint, FaTools, 
  FaMobile, FaMapMarkedAlt, FaTractor, FaIndustry, FaMoneyBillWave, 
  FaWater, FaSun, FaFemale, FaGraduationCap, FaStore, FaLaptop, FaBook,
  FaBriefcase, FaGlobe, FaChalkboardTeacher, FaUserGraduate, FaHandHoldingUsd,
  FaPhone, FaTimes, FaInfoCircle, FaExternalLinkAlt
} from 'react-icons/fa';

const Leaf = ({ delay, duration, x, y, size, rotation }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    initial={{ 
      x: x, 
      y: y,
      rotate: rotation,
      opacity: 0,
      scale: 0.5
    }}
    animate={{ 
      x: [x, x + 200, x],
      y: [y, y + 200, y],
      rotate: [rotation, rotation + 360, rotation],
      opacity: [0, 0.3, 0],
      scale: [0.5, 1, 0.5]
    }}
    transition={{ 
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none text-green-600"
  >
    <path
      fill="currentColor"
      d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
    />
  </motion.svg>
);

function Schemes() {
  const [activeTab, setActiveTab] = useState('government');
  const [showHelplineModal, setShowHelplineModal] = useState(false);

  const leaves = Array.from({ length: 30 }, (_, i) => ({
    delay: Math.random() * 3,
    duration: 10 + Math.random() * 15,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 48 + Math.random() * 48,
    rotation: Math.random() * 360
  }));

  const tabs = [
    { id: 'government', label: 'Government Schemes', icon: FaBuilding },
    { id: 'private', label: 'Private Schemes', icon: FaHandshake },
    { id: 'ngo', label: 'NGO Schemes', icon: FaUsers },
    { id: 'other', label: 'Other Initiatives', icon: FaLeaf }
  ];

  const helplines = [
    {
      name: "Kisan Call Center (KCC)",
      number: "1800-180-1551",
      purpose: "Provides information about various government schemes, agricultural best practices, and help regarding technical farming issues.",
      access: "Call to get personalized support in your local language regarding farming, crop production, weather, and government schemes."
    },
    {
      name: "PM Kisan Samman Nidhi Scheme",
      number: "155261",
      purpose: "Helps farmers with queries regarding the PM Kisan Samman Nidhi Yojana, a scheme providing income support to farmers.",
      access: "Dial to check PM Kisan registration status, query about payments, or inquire about eligibility."
    },
    {
      name: "eNAM (National Agriculture Market)",
      number: "1800-180-1551",
      purpose: "Provides guidance on how farmers can access the online national agricultural market to sell their produce at better prices.",
      access: "Call to learn about registration on the eNAM platform and how to start trading crops."
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      number: "1800-180-1551",
      purpose: "For queries related to the crop insurance scheme, which helps farmers mitigate losses caused by natural disasters.",
      access: "Get details about enrolling in crop insurance, claim procedures, and related benefits."
    },
    {
      name: "Soil Health Card Helpline",
      number: "1800-425-1651",
      purpose: "Assists farmers in obtaining soil health cards to improve soil quality and agricultural productivity.",
      access: "Inquire about soil health tests and how to access the soil health card scheme in your area."
    },
    {
      name: "Krishi Vigyan Kendra (KVK)",
      number: "1800-425-1426",
      purpose: "Offers training programs, demonstrations, and expert advice on sustainable farming practices.",
      access: "Get information on upcoming training sessions, workshops, and farm advisory services."
    },
    {
      name: "Department of Agriculture",
      number: "011-23384093/94",
      purpose: "Helps with general queries regarding agricultural policies, subsidies, and government schemes.",
      access: "Get details about agricultural schemes, government funding, or registration for various programs."
    },
    {
      name: "NABARD",
      number: "1800-103-2676",
      purpose: "Provides financial assistance to farmers, including loans for agricultural development and rural projects.",
      access: "Get information about applying for agricultural loans or accessing various NABARD schemes."
    }
  ];

  const schemes = {
    government: [
      {
        title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        objective: "Financial assistance to farmers to support their agricultural activities.",
        benefits: "Rs. 6,000 annually in three installments directly into farmers' bank accounts.",
        icon: FaHandshake
      },
      {
        title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        objective: "Crop insurance to protect farmers against crop loss due to natural calamities.",
        benefits: "Subsidized premiums and insurance coverage for farmers' crops.",
        icon: FaLeaf
      },
      {
        title: "Kisan Credit Card (KCC) Scheme",
        objective: "Provide farmers with easy access to credit for agricultural activities.",
        benefits: "Loans at low interest rates for purchasing seeds, fertilizers, and other agricultural needs.",
        icon: FaHandshake
      },
      {
        title: "Soil Health Card Scheme",
        objective: "Promote soil health and guide farmers on nutrient management.",
        benefits: "Free soil testing and advice on fertilizer usage.",
        icon: FaSeedling
      },
      {
        title: "National Mission for Sustainable Agriculture (NMSA)",
        objective: "Promote sustainable agricultural practices.",
        benefits: "Financial and technical support for organic farming, water management, and soil health management.",
        icon: FaLeaf
      },
      {
        title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        objective: "Improve irrigation systems and water-use efficiency.",
        benefits: "Assistance for micro-irrigation and water conservation projects.",
        icon: FaTint
      },
      {
        title: "Rashtriya Krishi Vikas Yojana (RKVY)",
        objective: "Promote agricultural development in a holistic manner.",
        benefits: "Support to states for infrastructure development and research.",
        icon: FaBuilding
      },
      {
        title: "National Food Security Mission (NFSM)",
        objective: "Increase production of food grains.",
        benefits: "Financial support for the promotion of high-yielding varieties and improved farm practices.",
        icon: FaSeedling
      },
      {
        title: "Fertilizer Subsidy Scheme",
        objective: "Make fertilizers more affordable for farmers.",
        benefits: "Subsidy on fertilizers and fertilizers available at reduced rates.",
        icon: FaLeaf
      },
      {
        title: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
        objective: "Provide rural employment and improve rural infrastructure.",
        benefits: "100 days of guaranteed employment for rural families, including farm-related activities.",
        icon: FaUsers
      },
      {
        title: "Sub-Mission on Agricultural Mechanization (SMAM)",
        objective: "Promote the use of modern agricultural machinery.",
        benefits: "Subsidies for purchasing machinery like tractors, combine harvesters, etc.",
        icon: FaTools
      },
      {
        title: "Kisan Rathi App",
        objective: "Facilitate the transportation of farm produce.",
        benefits: "Connecting farmers with transporters for easy delivery of goods to markets.",
        icon: FaMobile
      },
      {
        title: "State-specific Schemes",
        objective: "Address local agricultural needs and challenges.",
        benefits: "Various state-level subsidies on crop insurance, irrigation projects, and crop-specific farming.",
        icon: FaMapMarkedAlt
      }
    ],
    private: [
      {
        title: "Bajaj Allianz Crop Insurance",
        objective: "To safeguard farmers from crop loss due to natural calamities.",
        benefits: "Customized crop insurance policies covering a range of risks and giving farmers a safety net for their crops.",
        icon: FaHandshake
      },
      {
        title: "Reliance General Insurance",
        objective: "Provide crop insurance and other farmer-related financial products.",
        benefits: "Insurance for crops, farm machinery, and livestock, ensuring financial security for farmers.",
        icon: FaMoneyBillWave
      },
      {
        title: "Mahindra Tractors – Tractor Finance",
        objective: "Provide affordable financing options for farmers to buy tractors.",
        benefits: "Subsidized financing for tractors and farm equipment to improve mechanization in agriculture.",
        icon: FaTractor
      },
      {
        title: "Bayer CropScience",
        objective: "To provide agricultural solutions for increased productivity.",
        benefits: "Access to advanced seeds, crop protection, and nutrition products.",
        icon: FaSeedling
      },
      {
        title: "Godrej Agrovet's Rural Development Initiatives",
        objective: "Support farmers with technological advancements and resources.",
        benefits: "Training in organic farming, livestock management, and rural development initiatives.",
        icon: FaIndustry
      },
      {
        title: "IFFCO (Indian Farmers Fertiliser Cooperative)",
        objective: "Provide affordable fertilizers and agriculture products to farmers.",
        benefits: "Co-operative model that offers fertilizers at lower prices, alongside training and advisory services.",
        icon: FaLeaf
      },
      {
        title: "RBL Bank Agri Loans",
        objective: "Provide financial assistance to farmers for crop cultivation and farm equipment.",
        benefits: "Easy access to low-interest loans for agricultural activities, including buying equipment.",
        icon: FaMoneyBillWave
      }
    ],
    ngo: [
      {
        title: "SEWA (Self-Employed Women's Association)",
        objective: "Empower women farmers through training, financial support, and marketing.",
        benefits: "Access to micro-credit, training in sustainable agricultural practices, and leadership skills development.",
        icon: FaFemale
      },
      {
        title: "BAIF Development Research Foundation",
        objective: "Improve the livelihoods of rural farmers through sustainable agriculture and livestock development.",
        benefits: "Capacity building, access to resources, and technology for improved farming practices.",
        icon: FaLeaf
      },
      {
        title: "The Energy and Resources Institute (TERI)",
        objective: "Promote sustainable farming practices.",
        benefits: "Knowledge dissemination on renewable energy solutions, water conservation techniques, and sustainable agricultural practices.",
        icon: FaSun
      },
      {
        title: "National Bank for Agriculture and Rural Development (NABARD)",
        objective: "Provide financial and technical support to rural areas, including agricultural financing.",
        benefits: "Rural development initiatives, microfinance options, and technical support for sustainable farming.",
        icon: FaMoneyBillWave
      },
      {
        title: "Pradan",
        objective: "Empower rural communities and improve agricultural livelihoods.",
        benefits: "Training in organic farming, livestock management, and assistance in market linkages.",
        icon: FaUsers
      },
      {
        title: "Tata Trusts' Rural Development Initiatives",
        objective: "Improve agricultural practices and increase incomes in rural areas.",
        benefits: "Knowledge sharing, access to farming techniques, seed distribution, and water conservation.",
        icon: FaSeedling
      },
      {
        title: "Barefoot College",
        objective: "Empower women in rural areas with sustainable agricultural practices and solar technology.",
        benefits: "Skills development in solar energy, water conservation, and sustainable farming.",
        icon: FaGraduationCap
      },
      {
        title: "Amul (Gujarat Cooperative Milk Marketing Federation)",
        objective: "Provide support to dairy farmers for better livelihoods.",
        benefits: "Assistance in improving milk production, quality, and market access for dairy farmers.",
        icon: FaStore
      },
      {
        title: "Gram Vikas",
        objective: "Promote water and sanitation programs for rural farmers.",
        benefits: "Water conservation, sanitation facilities, and farming training to improve farmers' productivity.",
        icon: FaWater
      }
    ],
    other: [
      {
        title: "AgriBazaar Platform",
        objective: "Connect farmers directly with buyers for fair price discovery and trade.",
        benefits: "Direct market access, real-time prices, secure payments, and logistics support.",
        icon: FaGlobe,
        features: [
          "Market linkages with buyers",
          "Real-time price transparency",
          "Secure payment system",
          "Logistics support",
          "Verified buyer network"
        ]
      },
      {
        title: "NinjaCart",
        objective: "Streamline fresh produce supply chain from farmers to businesses.",
        benefits: "Direct sourcing, faster payments, reduced wastage, and efficient logistics.",
        icon: FaTractor,
        features: [
          "Supply chain optimization",
          "Online produce listing",
          "Guaranteed payments",
          "Transportation support",
          "Market expansion"
        ]
      },
      {
        title: "BigHaat",
        objective: "Provide one-stop solution for agricultural inputs and services.",
        benefits: "Access to quality products, expert advice, and competitive prices.",
        icon: FaStore,
        features: [
          "Quality input products",
          "Expert agricultural advice",
          "Digital payment options",
          "Product delivery",
          "Certified sellers"
        ]
      },
      {
        title: "Digital Green",
        objective: "Disseminate agricultural knowledge through technology.",
        benefits: "Video-based learning, peer education, and localized content.",
        icon: FaLaptop,
        features: [
          "Community video platform",
          "Peer learning network",
          "Local language content",
          "Extension worker support",
          "Digital resource library"
        ]
      },
      {
        title: "e-Choupal",
        objective: "Provide digital access to agricultural information and markets.",
        benefits: "Real-time information, market access, and better price realization.",
        icon: FaBook,
        features: [
          "Weather information",
          "Market price updates",
          "Best practice guides",
          "Direct buyer access",
          "Local information centers"
        ]
      },
      {
        title: "Rural Entrepreneurship Awareness Program (REAP)",
        objective: "Build capacity and awareness among rural entrepreneurs.",
        benefits: "Training, mentorship, and business development support.",
        icon: FaBriefcase,
        features: [
          "Entrepreneurship workshops",
          "Business management training",
          "Expert mentorship",
          "Networking opportunities",
          "Resource access"
        ]
      },
      {
        title: "National Rural Livelihood Mission (NRLM)",
        objective: "Promote rural entrepreneurship and skill development.",
        benefits: "Financial inclusion, market access, and enterprise development.",
        icon: FaHandHoldingUsd,
        features: [
          "Skill development training",
          "Self-Help Group formation",
          "Micro-financing support",
          "Market linkages",
          "Women empowerment"
        ]
      },
      {
        title: "NGO Rural Support Programs",
        objective: "Provide comprehensive support for rural development.",
        benefits: "Training, technology access, and market connections.",
        icon: FaChalkboardTeacher,
        features: [
          "Organic farming training",
          "Technology adoption",
          "Financial services access",
          "Market development",
          "Sustainable practices"
        ]
      },
      {
        title: "Rural Digital Literacy Program",
        objective: "Enhance digital skills and technology adoption in rural areas.",
        benefits: "Improved access to information, services, and digital markets.",
        icon: FaUserGraduate,
        features: [
          "Basic computer training",
          "Digital payment education",
          "Online marketing skills",
          "E-governance awareness",
          "Technology adoption"
        ]
      }
    ]
  };

  const HelplineModal = () => (
    <AnimatePresence>
      {showHelplineModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowHelplineModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-green-50">
              <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                <FaPhone className="text-green-600" />
                Farmer Helpline Directory
              </h2>
              <button
                onClick={() => setShowHelplineModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid gap-6">
                {helplines.map((helpline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md border border-green-100 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <FaPhone className="text-xl text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-green-800 mb-2">{helpline.name}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <FaPhone className="text-green-600" />
                            <a
                              href={`tel:${helpline.number}`}
                              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              {helpline.number}
                              <FaExternalLinkAlt className="text-sm" />
                            </a>
                          </div>
                          <div className="flex items-start gap-2">
                            <FaInfoCircle className="text-green-600 mt-1" />
                            <p className="text-gray-700">{helpline.purpose}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-green-800">
                              <strong>How to Access:</strong> {helpline.access}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Additional Access Methods</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <FaGlobe className="mt-1" />
                    <span>Many schemes offer online portals for direct registration and status checking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaBuilding className="mt-1" />
                    <span>Visit local government offices or Panchayat for in-person assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaUsers className="mt-1" />
                    <span>Connect with local agricultural officers for personalized guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 relative overflow-hidden">
      {leaves.map((leaf, index) => (
        <Leaf key={index} {...leaf} />
      ))}

      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Agricultural Schemes for Farmers
          </h1>
          <p className="text-lg text-green-600 max-w-3xl mx-auto">
            Comprehensive list of schemes and initiatives from government, private sector, and NGOs to
            support farmers in India with financial assistance, technology, and sustainable practices.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-green-700 hover:bg-green-50'
                }`}
              >
                <Icon className="text-xl" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes[activeTab].map((scheme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <scheme.icon className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800">{scheme.title}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-1">Objective</h4>
                  <p className="text-gray-600">{scheme.objective}</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-1">Benefits</h4>
                  <p className="text-gray-600">{scheme.benefits}</p>
                </div>
                {scheme.features && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">Key Features</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {scheme.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center"
        >
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            Need Help Accessing These Schemes?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact your local agricultural office or call our farmer helpline for assistance
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowHelplineModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaPhone />
              Contact Helpline
            </button>
          </div>
        </motion.div>
      </div>

      <HelplineModal />
    </div>
  );
}

export default Schemes;