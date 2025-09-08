import React, { useState, useEffect } from 'react';
import { addSugg, getMySugg, removeSugg } from '../serivces/userService';
import { getAllSuggs } from '../serivces/quoteService';
import { NewSuggestion } from './newSuggestion';

export const MySuggestions = () => {
    const [userSuggs, setUserSuggs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    useEffect(() => {
        const fetchUserSuggs = async () => {
            try {
                const userSuggIds = await getMySugg(userId) || [];
                const allSuggs = await getAllSuggs() || [];
                console.log(allSuggs);

                const filteredSuggs = allSuggs.filter(quote => userSuggIds.includes(quote.id));
                setUserSuggs(filteredSuggs);
            } catch (err) {
                console.error("Error fetching user suggestions:", err);
            }
        };

        fetchUserSuggs();
    }, []);

    const refreshUserSuggs = async () => {
        if (!userId) return;
        try {
            const userSuggIds = await getMySugg(userId) || [];
            const allSuggs = await getAllSuggs() || [];
            const filteredSuggs = allSuggs.filter(quote => userSuggIds.includes(quote.id));
            setUserSuggs(filteredSuggs);
        } catch (err) {
            console.error("Error refreshing user suggestions:", err);
        }
    };

    const handleRemoveSugg = async (id) => {
        try {
            await removeSugg(userId, id);
            console.log(`Suggestion ${id} removed successfully`);
            await refreshUserSuggs();
        } catch (err) {
            console.error("Failed to remove suggestion:", err);
        }
    };

    const handleAddSugg = async (newSugg) => {
        try {
            await addSugg(userId, newSugg);
            await refreshUserSuggs();
            setShowForm(false);
            window.location.reload();
        } catch (err) {
            console.error("Failed to add suggestion:", err);
        }
    };

    return (
            <div className="sugg-list">
                {userSuggs.length > 0 ? (
                    userSuggs.map((quote) => (
                        <div className="sentence-item" key={quote.id}>
                            <div className="quote-text">
                                <span>{quote.text || ""}</span>
                            </div>
                            <div className="quote-title">
                                <strong>{quote.title || ""}</strong>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>אין לך הצעות עדיין</p>
                )}

                <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
                    {showForm ? "סגור טופס" : "הוסף הצעה חדשה"}
                </button>

                {showForm && <NewSuggestion onSubmit={handleAddSugg} />}
            </div>
    );
};
