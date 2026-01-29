import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCloud, FaThermometerHalf, FaTint, FaWind, FaSun, FaExclamationTriangle, 
  FaMapMarkerAlt, FaSeedling, FaLeaf, FaRecycle, FaTree, FaBug, FaMountain, 
  FaSpider, FaCloudRain, FaCarrot, FaHome, FaUmbrella, FaLemon, FaGlobeAmericas, 
  FaMobileAlt, FaCloudSun, FaBook, FaUsers, FaFlask, FaWater, FaTools, 
  FaRecycle as FaCompost, FaShieldAlt, FaCalendarAlt, FaSolarPanel, 
  FaLeaf as FaGarden, FaCloud as FaCloudIcon, FaEgg, FaDove
} from 'react-icons/fa';

function FoodRecommendations() {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Techniques', icon: FaSeedling },
    { id: 'soil', name: 'Soil Management', icon: FaMountain },
    { id: 'water', name: 'Water Management', icon: FaTint },
    { id: 'pest', name: 'Pest Control', icon: FaBug },
    { id: 'planting', name: 'Planting Methods', icon: FaLeaf },
    { id: 'innovation', name: 'Innovative Solutions', icon: FaFlask }
  ];

  const techniques = [
    // Soil Management Category
    {
      id: 1,
      title: "Mulching",
      icon: FaLeaf,
      category: 'soil',
      description: "Covering soil with organic matter like leaves, straw, or rice husks to conserve water and suppress weeds.",
      benefits: [
        "Reduces water usage by up to 50%",
        "Suppresses weed growth",
        "Improves soil fertility",
        "Maintains soil temperature",
        "Prevents soil erosion"
      ],
      howTo: [
        "Spread 3-4 inch layer around plants",
        "Use thinner layers in wet areas",
        "Apply thicker layers in dry zones",
        "Keep mulch away from plant stems",
        "Replenish as needed"
      ],
      proTip: "In wet areas, use thin mulch to prevent rotting. In dry areas, apply thicker layers to conserve moisture."
    },
    {
      id: 2,
      title: "Composting",
      icon: FaCompost,
      category: 'soil',
      description: "Converting organic waste into nutrient-rich soil through natural decomposition.",
      benefits: [
        "Reduces need for chemical fertilizers",
        "Improves soil structure",
        "Increases microbial activity",
        "Free, sustainable fertilizer",
        "Reduces waste"
      ],
      howTo: [
        "Create 3x3 ft compost pit",
        "Layer green and brown materials",
        "Add soil between layers",
        "Turn pile monthly",
        "Add ash to speed decomposition"
      ],
      proTip: "Use compost pits in wet regions and open piles in dry zones for optimal moisture control."
    },
    {
      id: 3,
      title: "Agroforestry",
      icon: FaTree,
      category: 'soil',
      description: "Integrating trees with crops or livestock for a multi-layered farming system.",
      benefits: [
        "Prevents soil erosion",
        "Provides additional income",
        "Improves soil fertility",
        "Creates windbreaks",
        "Enhances biodiversity"
      ],
      howTo: [
        "Plant nitrogen-fixing trees",
        "Use fruit trees as windbreaks",
        "Incorporate shade-tolerant crops",
        "Manage tree spacing",
        "Prune regularly"
      ],
      proTip: "Consider neem trees for arid areas and bamboo for wet climates."
    },
    {
      id: 4,
      title: "Vermicomposting",
      icon: FaRecycle,
      category: 'soil',
      description: "Using earthworms to convert organic waste into high-quality compost.",
      benefits: [
        "Produces nutrient-rich vermicast",
        "Creates 'worm tea' fertilizer",
        "Improves soil structure",
        "Low maintenance process",
        "Year-round production"
      ],
      howTo: [
        "Set up worm bin with bedding",
        "Add red wiggler worms",
        "Feed kitchen scraps regularly",
        "Maintain moisture levels",
        "Harvest vermicast every 2-3 months"
      ],
      proTip: "Keep the bin in shade and avoid citrus or spicy food scraps."
    },
    {
      id: 5,
      title: "Biochar Production",
      icon: FaFlask,
      category: 'soil',
      description: "Creating charcoal from organic waste to improve soil fertility.",
      benefits: [
        "Long-term soil improvement",
        "Carbon sequestration",
        "Increases water retention",
        "Enhances nutrient availability",
        "Reduces soil acidity"
      ],
      howTo: [
        "Collect organic waste materials",
        "Create low-oxygen burning environment",
        "Cool and crush biochar",
        "Mix with compost",
        "Apply to soil"
      ],
      proTip: "Charge biochar with compost tea before adding to soil for better results."
    },

    // Water Management Category
    {
      id: 6,
      title: "DIY Drip Irrigation",
      icon: FaTint,
      category: 'water',
      description: "Creating low-cost irrigation systems using recycled materials.",
      benefits: [
        "Saves up to 60% water",
        "Targeted root watering",
        "Reduces weed growth",
        "Low-cost setup",
        "Easy maintenance"
      ],
      howTo: [
        "Collect plastic bottles",
        "Create small drainage holes",
        "Bury near plant roots",
        "Fill with water regularly",
        "Monitor soil moisture"
      ],
      proTip: "Use larger bottles for thirsty crops and smaller ones for herbs."
    },
    {
      id: 7,
      title: "Rainwater Harvesting",
      icon: FaCloudRain,
      category: 'water',
      description: "Collecting and storing rainwater for agricultural use.",
      benefits: [
        "Free water source",
        "Reduces runoff",
        "Prevents soil erosion",
        "Sustainable water supply",
        "Improves groundwater levels"
      ],
      howTo: [
        "Install collection systems",
        "Create storage tanks",
        "Filter collected water",
        "Maintain collection surfaces",
        "Plan distribution system"
      ],
      proTip: "Include first-flush diverters to improve water quality."
    },
    {
      id: 8,
      title: "Floating Gardens",
      icon: FaWater,
      category: 'water',
      description: "Creating gardens that float on water in flood-prone areas.",
      benefits: [
        "Utilizes waterlogged areas",
        "Flood-resistant farming",
        "Year-round production",
        "Natural irrigation",
        "Space efficiency"
      ],
      howTo: [
        "Build bamboo rafts",
        "Add organic matter layers",
        "Create planting beds",
        "Anchor the structure",
        "Plant suitable crops"
      ],
      proTip: "Use water hyacinth as base material for better buoyancy."
    },

    // Pest Control Category
    {
      id: 9,
      title: "Natural Pest Control",
      icon: FaBug,
      category: 'pest',
      description: "Using organic methods to manage pests without chemicals.",
      benefits: [
        "Environmentally safe",
        "Cost-effective",
        "Preserves beneficial insects",
        "Long-term effectiveness",
        "No chemical residues"
      ],
      howTo: [
        "Create neem spray",
        "Plant companion crops",
        "Use trap crops",
        "Encourage natural predators",
        "Maintain crop diversity"
      ],
      proTip: "Add soap to natural sprays to improve adhesion to pest surfaces."
    },
    {
      id: 10,
      title: "Mobile Chicken Tractors",
      icon: FaDove,
      category: 'pest',
      description: "Using movable chicken coops for pest control and fertilization.",
      benefits: [
        "Natural pest control",
        "Free fertilization",
        "Weed management",
        "Dual-purpose system",
        "Improved soil health"
      ],
      howTo: [
        "Build lightweight coop",
        "Move daily to new areas",
        "Allow chickens to forage",
        "Collect eggs regularly",
        "Maintain coop cleanliness"
      ],
      proTip: "Move coop in early morning when chickens are calmer."
    },

    // Planting Methods Category
    {
      id: 11,
      title: "Polyculture",
      icon: FaSeedling,
      category: 'planting',
      description: "Growing multiple crops together for better resource use.",
      benefits: [
        "Natural pest control",
        "Improved soil health",
        "Better space utilization",
        "Increased biodiversity",
        "Enhanced yields"
      ],
      howTo: [
        "Select compatible crops",
        "Plan spacing carefully",
        "Consider growth rates",
        "Monitor plant interactions",
        "Rotate combinations"
      ],
      proTip: "Start with proven combinations like the Three Sisters (corn, beans, squash)."
    },
    {
      id: 12,
      title: "Keyhole Gardens",
      icon: FaGarden,
      category: 'planting',
      description: "Circular raised beds with central composting basket.",
      benefits: [
        "Space efficient",
        "Water conservative",
        "Continuous fertilization",
        "Easy maintenance",
        "Year-round production"
      ],
      howTo: [
        "Build circular structure",
        "Create central basket",
        "Layer growing medium",
        "Add composting materials",
        "Plant in zones"
      ],
      proTip: "Use grey water from kitchen for the compost basket."
    },

    // Innovative Solutions Category
    {
      id: 13,
      title: "Solar Hacks",
      icon: FaSolarPanel,
      category: 'innovation',
      description: "Using solar energy for various farming needs.",
      benefits: [
        "Energy efficient",
        "Cost-effective",
        "Environmentally friendly",
        "Multiple applications",
        "Low maintenance"
      ],
      howTo: [
        "Create solar dryers",
        "Install solar pumps",
        "Build solar greenhouses",
        "Use solar pest traps",
        "Monitor effectiveness"
      ],
      proTip: "Paint nearby surfaces white to increase reflected light for plants."
    },
    {
      id: 14,
      title: "Smartphone Farming",
      icon: FaMobileAlt,
      category: 'innovation',
      description: "Using mobile technology for farm management.",
      benefits: [
        "Real-time monitoring",
        "Better decision making",
        "Improved planning",
        "Data collection",
        "Resource optimization"
      ],
      howTo: [
        "Install farming apps",
        "Track weather patterns",
        "Record farm data",
        "Monitor crop health",
        "Share knowledge"
      ],
      proTip: "Use offline-capable apps for areas with poor connectivity."
    }
  ];

  const filteredTechniques = techniques.filter(technique => {
    return selectedCategory === 'all' || technique.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 relative overflow-hidden">
      {/* Animated Leaves Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5,
              opacity: 0.3
            }}
            animate={{
              y: [-20, 0, -20],
              scale: [0.5, 0.8, 0.5],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaLeaf className="text-green-500 text-4xl transform rotate-45" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Universal Farming Techniques
          </h1>
          <p className="text-lg text-green-600 max-w-3xl mx-auto">
            Discover innovative, sustainable, and cost-effective farming methods that thrive in diverse climates and conditions, boosting productivity while preserving the environment.
          </p>
        </motion.div>

        {/* Updated navigation buttons container with centering */}
        <div className="flex justify-center items-center mb-8">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-green-700 hover:bg-green-50'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechniques.map((technique, index) => (
            <motion.div
              key={technique.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                selectedTechnique === technique.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setSelectedTechnique(technique.id === selectedTechnique ? null : technique.id)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <technique.icon className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800">{technique.title}</h3>
                </div>

                <p className="text-gray-600 mb-4">{technique.description}</p>

                {selectedTechnique === technique.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {technique.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Implementation:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {technique.howTo.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Pro Tip:</h4>
                      <p className="text-gray-600">{technique.proTip}</p>
                    </div>
                  </motion.div>
                )}

                <button
                  className={`mt-4 text-green-600 hover:text-green-700 font-medium flex items-center gap-2 ${
                    selectedTechnique === technique.id ? 'rotate-180' : ''
                  }`}
                >
                  {selectedTechnique === technique.id ? 'Show Less' : 'Learn More'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Start Small</h3>
              <p className="text-gray-600">Experiment with 1–2 techniques first.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Use Local Resources</h3>
              <p className="text-gray-600">Turn waste into tools (e.g., bottles → irrigation).</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Work with Nature</h3>
              <p className="text-gray-600">Copy forests' layered growth (trees + shrubs + crops).</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Collaborate</h3>
              <p className="text-gray-600">Share seeds, tools, and labor with neighbors.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FoodRecommendations;