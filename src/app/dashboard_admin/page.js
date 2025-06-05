"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, X, Save, Mail, Phone, MapPin, Calendar, User, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated, useTrail } from '@react-spring/web';
import ProfileCard from '../../../components/ProfileCard';

const ProfileDashboard = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      position: 'Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      joinDate: '2023-03-15',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      bio: 'Passionate frontend developer with expertise in React and modern web technologies.',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 987-6543',
      position: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      joinDate: '2022-11-08',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Creative UX designer focused on creating intuitive and beautiful user experiences.',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 456-7890',
      position: 'Backend Developer',
      department: 'Engineering',
      location: 'Austin, TX',
      joinDate: '2023-01-20',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      bio: 'Experienced backend developer specializing in scalable systems and APIs.',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
      status: 'Active'
    }
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const particlesArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      size: Math.random() * 12 + 4,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      color: [
        "rgba(236, 72, 153, 0.3)",  // pink-500
        "rgba(219, 39, 119, 0.3)",  // rose-600
        "rgba(232, 121, 249, 0.3)", // fuchsia-400
        "rgba(192, 132, 252, 0.3)", // purple-400
      ][Math.floor(Math.random() * 4)],
      pattern: Math.floor(Math.random() * 3)
    }));
    
    setParticles(particlesArray);
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trail = useTrail(filteredProfiles.length, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const statsSpring = useSpring({
    from: { number: 0 },
    to: { number: profiles.length },
    config: { duration: 1000 },
  });

  const defaultProfile = {
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    location: '',
    joinDate: '',
    avatar: '',
    bio: '',
    skills: [],
    status: 'Active'
  };

  const handleEdit = (profile) => {
    setEditForm({ ...profile, skills: profile.skills.join(', ') });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedProfile = {
      ...editForm,
      skills: editForm.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    };

    if (editForm.id) {
      setProfiles(profiles.map(p => p.id === editForm.id ? updatedProfile : p));
    } else {
      const newProfile = {
        ...updatedProfile,
        id: profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1
      };
      setProfiles([...profiles, newProfile]);
    }

    setIsEditing(false);
    setShowAddForm(false);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      setProfiles(profiles.filter(p => p.id !== id));
      if (selectedProfile?.id === id) {
        setSelectedProfile(null);
      }
    }
  };

  const handleAddNew = () => {
    setEditForm(defaultProfile);
    setShowAddForm(true);
    setIsEditing(true);
  };

  const ProfileModal = ({ profile, onClose }) => (
    <AnimatePresence>
      {profile && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.7, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <motion.div
                className="h-32 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-t-3xl relative overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                      "linear-gradient(45deg, #8b5cf6, #ec4899)",
                      "linear-gradient(45deg, #3b82f6, #8b5cf6)"
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
              <motion.div
                className="absolute -bottom-16 left-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", damping: 15 }}
              >
                <img
                  src={profile.avatar || 'https://placehold.co/150x150/FFF/000?text=Avatar'}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-6 border-white object-cover shadow-2xl"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/FFF/000?text=Avatar'; }}
                />
              </motion.div>
            </div>
            <motion.div
              className="pt-20 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <motion.h2
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {profile.name}
                  </motion.h2>
                  <motion.p
                    className="text-xl text-blue-600 font-semibold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    {profile.position}
                  </motion.p>
                  <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    {profile.department}
                  </motion.p>
                </div>
                <motion.span
                  className={`px-4 py-2 rounded-full font-semibold ${profile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", damping: 15 }}
                >
                  {profile.status}
                </motion.span>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.1 } }
                }}
              >
                {[
                  { icon: Mail, label: 'Email', value: profile.email },
                  { icon: Phone, label: 'Phone', value: profile.phone },
                  { icon: MapPin, label: 'Location', value: profile.location },
                  { icon: Calendar, label: 'Join Date', value: new Date(profile.joinDate).toLocaleDateString() }
                ].map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <motion.div
                      className="text-blue-500"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{label}</p>
                      <p className="text-gray-900 font-semibold">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{profile.bio}</p>
              </motion.div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.8 } }
                  }}
                >
                  {profile.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
                      variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                className="flex space-x-3 pt-4 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => handleEdit(profile)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Profile</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(profile.id)}
                  className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2 font-semibold"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const EditForm = () => (
    <AnimatePresence>
      {(isEditing || showAddForm) && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <motion.h2
                  className="text-2xl font-bold text-gray-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {editForm.id ? 'Edit Profile' : 'Add New Profile'}
                </motion.h2>
                <motion.button
                  onClick={() => {
                    setIsEditing(false);
                    setShowAddForm(false);
                    setEditForm({});
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
                }}
              >
                {[
                  { label: 'Name', key: 'name', type: 'text', placeholder: 'Enter full name' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'Enter email address' },
                  { label: 'Phone', key: 'phone', type: 'tel', placeholder: 'Enter phone number' },
                  { label: 'Position', key: 'position', type: 'text', placeholder: 'Enter job position' },
                ].map((field) => (
                  <motion.div
                    key={field.key}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <motion.input
                      type={field.type}
                      value={editForm[field.key] || ''}
                      onChange={(e) => setEditForm({...editForm, [field.key]: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder={field.placeholder}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                ))}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <motion.select
                    value={editForm.department || ''}
                    onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select department</option>
                    {['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'].map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </motion.select>
                </motion.div>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.9 } }
                  }}
                >
                  {[
                    { label: 'Location', key: 'location', type: 'text', placeholder: 'Enter location' },
                    { label: 'Join Date', key: 'joinDate', type: 'date' },
                  ].map((field) => (
                    <motion.div
                      key={field.key}
                      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <motion.input
                        type={field.type}
                        value={editForm[field.key] || ''}
                        onChange={(e) => setEditForm({...editForm, [field.key]: e.target.value})}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                        placeholder={field.placeholder}
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <motion.select
                      value={editForm.status || 'Active'}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </motion.select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar URL</label>
                    <motion.input
                      type="url"
                      value={editForm.avatar || ''}
                      onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="Enter avatar image URL"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="mt-6 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                    <motion.textarea
                      value={editForm.bio || ''}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows="3"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="Enter a brief bio"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skills (comma separated)</label>
                    <motion.input
                      type="text"
                      value={editForm.skills || ''}
                      onChange={(e) => setEditForm({...editForm, skills: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="e.g., React, JavaScript, Node.js"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="flex space-x-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="w-5 h-5" />
                    <span>{editForm.id ? 'Update Profile' : 'Create Profile'}</span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setIsEditing(false);
                      setShowAddForm(false);
                      setEditForm({});
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-semibold"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return (
    <motion.div
    className="min-h-screen bg-gradient-to-br from-rose-100 via-fuchsia-100 to-purple-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-400 rounded-full opacity-20"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-40"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center py-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <motion.h1
                className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Profile Dashboard
              </motion.h1>
              <motion.p
                className="text-gray-600 mt-2 text-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Manage team profiles and information
              </motion.p>
            </div>
            <motion.button
              onClick={handleAddNew}
              className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 shadow-xl font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Plus className="w-5 h-5" />
              </motion.div>
              <span>Add Profile</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 w-full lg:w-auto"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <User className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-gray-600 font-medium">Total Profiles</p>
                <animated.div className="text-3xl font-bold text-gray-900">
                  {statsSpring.number.to(n => Math.floor(n))}
                </animated.div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="relative flex-1 max-w-md w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
            <motion.input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-700 bg-white/90 text-gray-900 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 font-medium shadow-md"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.9 } }
          }}
        >
          {trail.map((style, index) => {
            const profile = filteredProfiles[index];
            if (!profile) return null;

            return (
              <ProfileCard
                key={profile.id}
                profile={profile}
                setSelectedProfile={setSelectedProfile}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                style={style}
              />
            );
          })}
        </motion.div>
        {filteredProfiles.length === 0 && searchTerm && (
          <motion.div
            className="text-center text-gray-600 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl font-semibold">No profiles found for "{searchTerm}"</p>
            <p className="text-md">Try adjusting your search criteria.</p>
          </motion.div>
        )}
        {filteredProfiles.length === 0 && !searchTerm && (
          <motion.div
            className="text-center text-gray-600 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl font-semibold">No profiles added yet.</p>
            <p className="text-md">Click "Add Profile" to get started!</p>
          </motion.div>
        )}
      </motion.div>
      <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      <EditForm />
    </motion.div>
  );
};

export default ProfileDashboard;