import { motion, AnimatePresence } from "framer-motion";

export default function ServiceModal({ service, isOpen, onClose }) {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative neumorphism animate-fadeIn"
          initial={{ scale: 0.8, rotateX: 10 }}
          animate={{ scale: 1, rotateX: 0 }}
          exit={{ scale: 0.8, rotateX: 10 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-[#d3932d]"
          >
            ×
          </button>
          <img
            src={service.image_url}
            alt={service.title}
            className="rounded-lg w-full mb-4 drop-shadow-glow"
          />
          <h2 className="text-2xl font-bold text-[#d3932d] mb-2">{service.title}</h2>
          <p className="text-gray-700">{service.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
