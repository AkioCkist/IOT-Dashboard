// ProfileCard.jsx
"use client";
import React from 'react'; // Ensure React is imported
import { Eye, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Wrap the component with React.memo to optimize performance
const ProfileCard = React.memo(({ profile, setSelectedProfile, handleEdit, handleDelete, style }) => {
  return (
    <motion.div
      style={style}
      className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 relative group"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedProfile(profile)}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Card Background Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
      
      {/* Header with gradient background */}
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <motion.div
          className="absolute -bottom-8 left-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <img
            src={profile.avatar || 'https://placehold.co/80x80/FFF/000?text=P'}
            alt={profile.name}
            className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x80/FFF/000?text=P'; }}
          />
        </motion.div>
      </div>

      {/* Profile Info */}
      <div className="pt-10 p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <motion.h3
              className="text-xl font-bold text-gray-900 mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {profile.name}
            </motion.h3>
            <motion.p
              className="text-blue-600 font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {profile.position}
            </motion.p>
            <motion.p
              className="text-gray-500 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              {profile.department}
            </motion.p>
          </div>
          <motion.span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              profile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {profile.status}
          </motion.span>
        </div>

        {/* Contact Info */}
        <motion.div
          className="space-y-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center text-gray-600 text-sm">
            <Mail className="w-4 h-4 mr-2" />
            {profile.email}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Phone className="w-4 h-4 mr-2" />
            {profile.phone}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {profile.location}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 3).map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + skillIndex * 0.1, type: "spring" }}
              >
                {skill}
              </motion.span>
            ))}
            {profile.skills.length > 3 && (
              <motion.span
                className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + 3 * 0.1, type: "spring" }}
              >
                +{profile.skills.length - 3} more
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProfile(profile);
            }}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(profile);
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(profile.id);
            }}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default ProfileCard;