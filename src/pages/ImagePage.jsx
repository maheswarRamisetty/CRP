import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaUpload, FaCamera, FaLeaf } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

function ImagePage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  });

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-3">
            <FaImage className="text-green-600" />
            Image Gallery
          </h1>
          <p className="text-lg text-green-600 max-w-3xl mx-auto">
            Upload and manage your agricultural images for analysis and documentation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaUpload className="text-green-600" />
              Upload Image
            </h2>

            <div
              {...getRootProps()}
              className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <input {...getInputProps()} />
              <FaCamera className="text-6xl text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-green-600 font-semibold">Drop the image here</p>
              ) : (
                <div>
                  <p className="text-gray-600 font-semibold mb-2">
                    Drag and drop an image here, or click to select
                  </p>
                  <p className="text-gray-500 text-sm">
                    Supports: JPG, PNG, GIF
                  </p>
                </div>
              )}
            </div>

            {uploadedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Uploaded File:</h3>
                  <p className="text-gray-700">{uploadedImage.name}</p>
                  <p className="text-gray-500 text-sm">
                    Size: {(uploadedImage.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={handleRemoveImage}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove Image
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Image Preview</h2>

            {imagePreview ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={imagePreview}
                  alt="Uploaded preview"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No image uploaded yet</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Image Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                Upload high-resolution images for better analysis results
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Lighting</h3>
              <p className="text-gray-600">
                Ensure good lighting conditions when capturing images
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Focus</h3>
              <p className="text-gray-600">
                Keep the subject clear and in focus for accurate predictions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ImagePage;
