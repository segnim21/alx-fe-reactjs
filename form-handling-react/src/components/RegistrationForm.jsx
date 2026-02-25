import { useState } from 'react';

const RegistrationForm = () => {
  // Step 1: Create state for each input field
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Step 2: Handle changes – update state when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Step 3: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation: check if any field is empty
    if (!formData.username || !formData.email || !formData.password) {
      alert('All fields are required!');
      return;
    }

    // Simulate sending data to an API
    console.log('Form submitted:', formData);
    alert('Registration successful (check console)');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;