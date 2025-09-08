import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../serivces/userService";
import "./auth.css";

export const Register = () => {
    const [formData, setFormData] = useState({ name: "", mail: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await userRegister(formData);
        let user = { id: result.id, name: result.name, mail: result.mail };
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        navigate('/home');
        window.location.reload();
    };

    return (
        <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <h1>הרשמה</h1>
        <span>או השתמש במייל שלך להרשמה</span>
        <input
          type="text"
          placeholder="שם מלא"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="אימייל"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="סיסמה"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">הרשמה</button>
      </form>
    </div>
    );
};
