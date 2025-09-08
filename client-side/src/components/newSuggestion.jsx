import { useState } from "react";

export const NewSuggestion = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        text: "",
        title: "",
        groupId: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">הצעת הצעה חדשה</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="כותרת" 
                    value={formData.title} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md"
                />
                <textarea 
                    name="text" 
                    placeholder="תוכן ההצעה" 
                    value={formData.text} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md"
                />
                <input 
                    type="text" 
                    name="groupId" 
                    placeholder="מזהה קבוצה" 
                    value={formData.groupId} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    שלח הצעה
                </button>
            </form>
        </div>
    );
};
