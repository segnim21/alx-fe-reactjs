import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  // Inline styles
  const containerStyle = {
    padding: "20px",
    maxWidth: "500px",
    margin: "40px auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
  };

  const titleStyle = {
    textAlign: "center",
    color: "#1f2937",
    marginBottom: "20px"
  };

  const inputStyle = {
    width: "93%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
    outline: "none",
   
  };

  const textAreaStyle = {
    ...inputStyle,
    height: "120px",
    resize: "vertical"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1f2937",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  };
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={textAreaStyle}
        />
        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>
    </div>
  );
}

export default Contact;