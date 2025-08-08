import React, { useState } from 'react';

type Role =
  | 'Users Management'
  | 'Session Metadata'
  | 'Counselors Approval'
  | 'KPI Dashboard'
  | 'Token Management'
  | 'Subscription Plan';

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: Record<Role, boolean>;
}

const SuperAdminForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: {
      'Users Management': false,
      'Session Metadata': false,
      'Counselors Approval': false,
      'KPI Dashboard': false,
      'Token Management': false,
      'Subscription Plan': false,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (role: Role) => {
    setFormData((prevData) => ({
      ...prevData,
      roles: {
        ...prevData.roles,
        [role]: !prevData.roles[role],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 dark:bg-gray-800 mt-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-center ">Manage Sub-Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 ">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border dark:bg-[#28334e] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border dark:bg-[#28334e] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border dark:bg-[#28334e] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border dark:bg-[#28334e] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Role and Permission */}
        <div>
          <label className="block text-sm font-medium mb-3 ">Access to Sub-admin</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData.roles).map((role) => (
              <div key={role} className="flex items-center justify-between dark:bg-[#28334e] px-4 py-2 rounded">
                <span className="">{role}</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.roles[role as Role]}
                    onChange={() => handleRoleToggle(role as Role)}
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full shadow-inner transition duration-300 ease-in-out ${
                      formData.roles[role as Role] ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
                        formData.roles[role as Role] ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full  py-3 px-4 rounded text-white bg-primary transition"
        >
          Create Super Admin
        </button>
      </form>
    </div>
  );
};

export default SuperAdminForm;
