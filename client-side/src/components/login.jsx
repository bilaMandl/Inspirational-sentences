import { useState } from "react";
import { userLogin } from "../serivces/userService";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export const Login = () => {
  const [formData, setFormData] = useState({ field1: "", field2: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await userLogin(formData);
    let user = { id: result.id, name: result.name, mail: result.mail };
    localStorage.setItem("user", JSON.stringify(user));
    navigate('/home');
    window.location.reload();
  };

  return (
     <div className="form-container sign-in">
      <form onSubmit={handleSubmit}>
        <h1>התחבר</h1>
        <span>או השתמש בשם משתמש וסיסמה</span>
        <input
          type="text"
          placeholder="שם משתמש"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="סיסמה"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
        />
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
};
