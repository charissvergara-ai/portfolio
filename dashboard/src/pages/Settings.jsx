import { useState } from 'react';
import { User, Bell, Lock, Palette, CreditCard, Save, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Pages.css';

function Settings() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 234 567 890',
    company: 'Acme Inc.',
    timezone: 'UTC-5',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactor: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun, description: 'Light background with dark text' },
    { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark background with light text' },
    { id: 'system', label: 'System', icon: Monitor, description: 'Follows your system preference' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Settings</h2>
          <p className="page-description">Manage your account preferences</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h3 className="section-title">Profile Information</h3>
              <p className="section-description">Update your personal details</p>

              <div className="profile-header">
                <div className="profile-avatar">JD</div>
                <div className="profile-upload">
                  <button className="secondary-button">Change Photo</button>
                  <span className="upload-hint">JPG, PNG or GIF. Max 2MB</span>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="primary-button">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h3 className="section-title">Notification Preferences</h3>
              <p className="section-description">Choose how you want to be notified</p>

              <div className="toggle-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Email Notifications</span>
                    <span className="toggle-description">Receive email updates about your account</span>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Push Notifications</span>
                    <span className="toggle-description">Receive push notifications in your browser</span>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={formData.pushNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Marketing Emails</span>
                    <span className="toggle-description">Receive emails about new features and offers</span>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      checked={formData.marketingEmails}
                      onChange={handleInputChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h3 className="section-title">Security Settings</h3>
              <p className="section-description">Manage your account security</p>

              <div className="security-item">
                <div className="security-info">
                  <h4>Password</h4>
                  <p>Last changed 3 months ago</p>
                </div>
                <button className="secondary-button">Change Password</button>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    name="twoFactor"
                    checked={formData.twoFactor}
                    onChange={handleInputChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <h4>Active Sessions</h4>
                  <p>Manage devices where you're logged in</p>
                </div>
                <button className="secondary-button">View Sessions</button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h3 className="section-title">Appearance</h3>
              <p className="section-description">Customize the look and feel</p>

              <div className="theme-section">
                <label className="form-label">Theme</label>
                <div className="theme-options">
                  {themeOptions.map(option => (
                    <button
                      key={option.id}
                      className={`theme-option ${theme === option.id ? 'active' : ''}`}
                      onClick={() => setTheme(option.id)}
                    >
                      <div className="theme-option-icon">
                        <option.icon size={24} />
                      </div>
                      <div className="theme-option-content">
                        <span className="theme-option-label">{option.label}</span>
                        <span className="theme-option-description">{option.description}</span>
                      </div>
                      {theme === option.id && (
                        <div className="theme-option-check">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div className="form-group">
                <label>Timezone</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">UTC</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="settings-section">
              <h3 className="section-title">Billing & Subscription</h3>
              <p className="section-description">Manage your subscription and payment methods</p>

              <div className="plan-card">
                <div className="plan-info">
                  <span className="plan-badge">Current Plan</span>
                  <h4>Pro Plan</h4>
                  <p>$29/month</p>
                </div>
                <button className="secondary-button">Upgrade Plan</button>
              </div>

              <h4 className="subsection-title">Payment Method</h4>
              <div className="payment-method">
                <div className="card-icon">
                  <CreditCard size={24} />
                </div>
                <div className="card-details">
                  <span className="card-number">•••• •••• •••• 4242</span>
                  <span className="card-expiry">Expires 12/25</span>
                </div>
                <button className="text-button">Edit</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
