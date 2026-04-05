import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import CustomerLayout from '../../components/layout/CustomerLayout';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { success, error } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zip: user?.address?.zip || ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const result = updateProfile(formData);
    if (result.success) {
      success('Profile updated successfully!');
      setIsEditing(false);
    } else {
      error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zip: user?.address?.zip || ''
      }
    });
    setIsEditing(false);
  };

  return (
    <CustomerLayout activeTab="profile">
      <div className="profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          {!isEditing ? (
            <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
              <Edit2 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                <Check size={16} />
                Save
              </button>
              <button className="btn btn-outline" onClick={handleCancel}>
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-content">
          {/* Personal Info */}
          <section className="profile-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.name}</p>
                )}
              </div>
              <div className="info-item">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.email}</p>
                )}
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.phone || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{user?.createdAt || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Address Info */}
          <section className="profile-section">
            <h2>Default Address</h2>
            <div className="info-grid">
              <div className="info-item full-width">
                <label>Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.address?.street || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.address?.city || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>State</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.address?.state || 'Not provided'}</p>
                )}
              </div>
              <div className="info-item">
                <label>ZIP Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user?.address?.zip || 'Not provided'}</p>
                )}
              </div>
            </div>
          </section>

          {/* Account Security */}
          <section className="profile-section">
            <h2>Account Security</h2>
            <div className="security-options">
              <div className="security-item">
                <div>
                  <h3>Password</h3>
                  <p>Last changed 30 days ago</p>
                </div>
                <button className="btn btn-outline btn-sm">Change Password</button>
              </div>
              <div className="security-item">
                <div>
                  <h3>Two-Factor Authentication</h3>
                  <p>Not enabled</p>
                </div>
                <button className="btn btn-outline btn-sm">Enable</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Profile;
