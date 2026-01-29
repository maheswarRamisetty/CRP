import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, FaTimes, FaExclamationTriangle, FaGlobe, 
  FaBuilding, FaUsers, FaInfoCircle, FaExternalLinkAlt,
  FaMapMarkedAlt, FaClipboardList, FaBullhorn
} from 'react-icons/fa';

const helplines = [
  {
    name: "Central Pollution Control Board (CPCB)",
    number: "1800-11-2111",
    purpose: "Report water pollution incidents, contamination, or concerns about water quality in your area.",
    website: "https://cpcb.nic.in",
    category: "primary"
  },
  {
    name: "National Green Tribunal (NGT)",
    number: "+91-11-26717750",
    purpose: "Legal action or urgent environmental intervention for water contamination issues.",
    website: "https://greentribunal.gov.in",
    category: "primary"
  },
  {
    name: "Indian Council of Agricultural Research (ICAR)",
    number: "1800-180-1551",
    purpose: "Report water quality issues affecting agriculture and get guidance on handling contamination in farming.",
    category: "agriculture"
  },
  {
    name: "Disaster Management Helpline",
    number: "1077",
    purpose: "Emergency situations involving water contamination that pose immediate danger to public health.",
    category: "emergency"
  }
];

const reportingSteps = [
  {
    icon: FaMapMarkedAlt,
    title: "Identify Location",
    description: "Note exact location of contamination"
  },
  {
    icon: FaClipboardList,
    title: "Gather Details",
    description: "Document type of contamination, time noticed, and visible effects"
  },
  {
    icon: FaPhone,
    title: "Contact Authorities",
    description: "Call relevant helpline numbers immediately"
  },
  {
    icon: FaBullhorn,
    title: "Alert Community",
    description: "Inform nearby farmers and residents"
  }
];

function ContaminationReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-red-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-3xl text-red-500" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Water Contamination Reporting
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Emergency Steps */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Steps to Report Contamination
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <step.icon className="text-red-500" />
                      </div>
                      <span className="font-medium text-gray-800">{step.title}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Helplines Section */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Emergency Helplines
              </h3>
              <div className="space-y-4">
                {helplines.map((helpline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      helpline.category === 'emergency' 
                        ? 'bg-red-50 border-red-200'
                        : helpline.category === 'primary'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${
                        helpline.category === 'emergency'
                          ? 'bg-red-100'
                          : helpline.category === 'primary'
                          ? 'bg-blue-100'
                          : 'bg-green-100'
                      }`}>
                        <FaPhone className={`text-xl ${
                          helpline.category === 'emergency'
                            ? 'text-red-600'
                            : helpline.category === 'primary'
                            ? 'text-blue-600'
                            : 'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {helpline.name}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FaPhone className="text-gray-500" />
                            <a
                              href={`tel:${helpline.number}`}
                              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              {helpline.number}
                              <FaExternalLinkAlt className="text-sm" />
                            </a>
                          </div>
                          <div className="flex items-start gap-2">
                            <FaInfoCircle className="text-gray-500 mt-1" />
                            <p className="text-gray-600">{helpline.purpose}</p>
                          </div>
                          {helpline.website && (
                            <div className="flex items-center gap-2">
                              <FaGlobe className="text-gray-500" />
                              <a
                                href={helpline.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                Visit Website
                                <FaExternalLinkAlt className="text-sm" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Information */}
              <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Additional Access Methods
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaGlobe className="text-gray-600 mt-1" />
                    <p className="text-gray-600">
                      Many authorities offer online portals for submitting detailed reports
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaBuilding className="text-gray-600 mt-1" />
                    <p className="text-gray-600">
                      Visit local government offices for in-person reporting
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaUsers className="text-gray-600 mt-1" />
                    <p className="text-gray-600">
                      Contact local agricultural officers for immediate assistance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ContaminationReportModal;