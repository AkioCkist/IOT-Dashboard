"use client";
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Plus, Edit, Trash2, X, Save, Search } from 'lucide-react';

// Default profile object for form state
const defaultProfile = {
  id: '',
  name: '',
  email: '',
  position: '',
  department: '',
  status: 'Active',
};

// Memoized Form Components to prevent re-renders
const FormInput = React.memo(({ label, inputRef, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
    <input ref={inputRef} {...props} className="w-full p-2 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
  </div>
));

const FormTextarea = React.memo(({ label, textareaRef, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
    <textarea ref={textareaRef} {...props} className="w-full p-2 bg-slate-900 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
  </div>
));

// Stable ProfileCard component
const ProfileCard = React.memo(({ profile, handleEdit, handleDelete }) => (
  <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-blue-500 transition-colors duration-300 group relative">
    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      <button onClick={() => handleEdit(profile)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"><Edit size={20} /></button>
      <button onClick={() => handleDelete(profile.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={20} /></button>
    </div>
    <div className="flex items-center space-x-4">
      <img
        src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.name.replace(' ', '+')}&background=0D89EC&color=fff`}
        alt={profile.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
        onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name.replace(' ', '+')}&background=0D89EC&color=fff`; }}
      />
      <div>
        <h3 className="text-xl font-bold text-slate-50 break-words max-w-[8rem]">{profile.name}</h3>
        <p className="text-blue-400 font-semibold">{profile.position}</p>
      </div>
    </div>
  </div>
));

// Stable Modal component
const Modal = React.memo(({ children, onClose, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
});

const ProfileDashboard = () => {  // Create refs for form inputs
  const idInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const positionInputRef = useRef(null);
  const departmentInputRef = useRef(null);
  
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
      phone: '+1 (555) 222-3344',
      position: 'Backend Developer',
      department: 'Engineering',
      location: 'Seattle, WA',
      joinDate: '2021-07-21',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Backend specialist with a love for scalable systems and APIs.',
      skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      status: 'Active'
    },
    {
      id: 4,
      name: 'Priya Singh',
      email: 'priya.singh@example.com',
      phone: '+1 (555) 333-4455',
      position: 'QA Engineer',
      department: 'Quality Assurance',
      location: 'Austin, TX',
      joinDate: '2020-12-10',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Detail-oriented QA engineer ensuring bug-free releases.',
      skills: ['Selenium', 'Cypress', 'Jest', 'Manual Testing'],
      status: 'Active'
    },
    {
      id: 5,
      name: 'Carlos Ramirez',
      email: 'carlos.ramirez@example.com',
      phone: '+1 (555) 444-5566',
      position: 'DevOps Engineer',
      department: 'Operations',
      location: 'Miami, FL',
      joinDate: '2019-09-18',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      bio: 'DevOps engineer automating deployments and monitoring.',
      skills: ['AWS', 'Terraform', 'CI/CD', 'Kubernetes'],
      status: 'Active'
    },
    {
      id: 6,
      name: 'Emily Zhang',
      email: 'emily.zhang@example.com',
      phone: '+1 (555) 555-6677',
      position: 'Product Manager',
      department: 'Product',
      location: 'Boston, MA',
      joinDate: '2022-03-05',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Product manager bridging the gap between users and engineering.',
      skills: ['Agile', 'Scrum', 'Roadmapping', 'User Stories'],
      status: 'Active'
    },
    {
      id: 7,
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '+1 (555) 666-7788',
      position: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Chicago, IL',
      joinDate: '2021-11-30',
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
      bio: 'Full stack developer with a passion for learning new tech.',
      skills: ['React', 'Node.js', 'GraphQL', 'TypeScript'],
      status: 'Active'
    },
    {
      id: 8,
      name: 'Anna Petrova',
      email: 'anna.petrova@example.com',
      phone: '+1 (555) 777-8899',
      position: 'UI Engineer',
      department: 'Design',
      location: 'Denver, CO',
      joinDate: '2023-01-12',
      avatar: 'https://randomuser.me/api/portraits/women/81.jpg',
      bio: 'UI engineer crafting beautiful and accessible interfaces.',
      skills: ['HTML', 'CSS', 'JavaScript', 'Accessibility'],
      status: 'Active'
    },
    {
      id: 9,
      name: 'James Lee',
      email: 'james.lee@example.com',
      phone: '+1 (555) 888-9900',
      position: 'Data Scientist',
      department: 'Data',
      location: 'Los Angeles, CA',
      joinDate: '2020-05-25',
      avatar: 'https://randomuser.me/api/portraits/men/90.jpg',
      bio: 'Data scientist uncovering insights from big data.',
      skills: ['Python', 'Pandas', 'Machine Learning', 'SQL'],
      status: 'Active'
    },
    {
      id: 10,
      name: 'Linda Brown',
      email: 'linda.brown@example.com',
      phone: '+1 (555) 999-0011',
      position: 'HR Specialist',
      department: 'Human Resources',
      location: 'Portland, OR',
      joinDate: '2018-08-14',
      avatar: 'https://randomuser.me/api/portraits/women/92.jpg',
      bio: 'HR specialist focused on people and culture.',
      skills: ['Recruiting', 'Onboarding', 'Employee Relations', 'Benefits'],
      status: 'Active'
    },
    {
      id: 11,
      name: 'Omar Farouk',
      email: 'omar.farouk@example.com',
      phone: '+1 (555) 101-1122',
      position: 'Security Analyst',
      department: 'Security',
      location: 'Dallas, TX',
      joinDate: '2021-04-02',
      avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
      bio: 'Security analyst keeping our systems safe.',
      skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response'],
      status: 'Active'
    },
    {
      id: 12,
      name: 'Sophia Rossi',
      email: 'sophia.rossi@example.com',
      phone: '+1 (555) 202-2233',
      position: 'Marketing Lead',
      department: 'Marketing',
      location: 'Las Vegas, NV',
      joinDate: '2019-06-19',
      avatar: 'https://randomuser.me/api/portraits/women/100.jpg',
      bio: 'Marketing lead driving brand growth and engagement.',
      skills: ['SEO', 'Content Marketing', 'Social Media', 'Branding'],
      status: 'Active'
    }
  ]);

  // Selected profile functionality removed
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editForm, setEditForm] = useState(defaultProfile);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Store the active input field
  const [activeField, setActiveField] = useState(null);

  const filteredProfiles = useMemo(() =>
    profiles.filter(profile =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.department.toLowerCase().includes(searchTerm.toLowerCase())
    ), [profiles, searchTerm]);
  const handleEdit = useCallback((profile) => {
    setEditForm({ ...profile });
    setIsFormOpen(true);
  }, []);
  const handleSave = useCallback(() => {
    const updatedProfileData = { ...editForm };
    if (editForm.id) {
      setProfiles(prev => prev.map(p => p.id === editForm.id ? updatedProfileData : p));
    } else {
      setProfiles(prev => [...prev, { ...updatedProfileData, id: editForm.id || Date.now() }]);
    }
    closeModals();
  }, [editForm]);
  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setProfiles(prev => prev.filter(p => p.id !== id));
    }
  }, []);

  const handleAddNew = useCallback(() => {
    setEditForm(defaultProfile);
    setIsFormOpen(true);
  }, []);
  const closeModals = useCallback(() => {
    setIsFormOpen(false);
    setEditForm(defaultProfile);
    setActiveField(null);
  }, []);

  // Handle form field changes with focus retention
  const handleFormChange = useCallback((field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
    
    // Keep track of which field is active
    setActiveField(field);
    
    // Restore focus to the appropriate input after render
    setTimeout(() => {
      if (field === 'id' && idInputRef.current) idInputRef.current.focus();
      if (field === 'name' && nameInputRef.current) nameInputRef.current.focus();
      if (field === 'email' && emailInputRef.current) emailInputRef.current.focus();
      if (field === 'position' && positionInputRef.current) positionInputRef.current.focus();
      if (field === 'department' && departmentInputRef.current) departmentInputRef.current.focus();
    }, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-50">
              Profile Dashboard
            </h1>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Add Profile</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
             <p className="text-slate-400">Total Profiles</p>
             <div className="text-3xl font-bold text-slate-50">{profiles.length}</div>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search profiles..."
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        {!filteredProfiles.length && (
          <div className="text-center text-slate-500 py-16">
            <p className="text-xl font-semibold">No profiles found.</p>
          </div>
        )}
      </main>      {/* View details modal removed */}
      
      <Modal isOpen={isFormOpen} onClose={closeModals}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-50 mb-6">{editForm.id ? 'Edit Profile' : 'Add New Profile'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput 
              label="ID" 
              placeholder="Enter ID (NOT OPTIONAL)" 
              value={editForm.id || ''} 
              onChange={e => handleFormChange('id', e.target.value)}
              inputRef={idInputRef}
            />
            <FormInput 
              label="Name" 
              placeholder="John Doe" 
              value={editForm.name || ''} 
              onChange={e => handleFormChange('name', e.target.value)}
              inputRef={nameInputRef}
            />
            <FormInput 
              label="Email" 
              type="email" 
              placeholder="john@example.com" 
              value={editForm.email || ''} 
              onChange={e => handleFormChange('email', e.target.value)}
              inputRef={emailInputRef}
            />
            <FormInput 
              label="Position" 
              placeholder="Frontend Developer" 
              value={editForm.position || ''} 
              onChange={e => handleFormChange('position', e.target.value)}
              inputRef={positionInputRef}
            />
            <FormInput 
              label="Department" 
              placeholder="Engineering" 
              value={editForm.department || ''} 
              onChange={e => handleFormChange('department', e.target.value)}
              inputRef={departmentInputRef}
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-slate-700">
            <button onClick={closeModals} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{editForm.id ? 'Update' : 'Create'}</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ProfileDashboard;