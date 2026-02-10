import { useState } from "react";

function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        meessage: ''

    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted!');
    };

    return (
        <div style={{padding: '20px'}}>
            <input type='text' name='name' value={formData.name} onChange={handleChange} />
        </div>
    );
}

export default Contact;