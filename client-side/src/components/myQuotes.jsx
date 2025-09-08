import React, { useState, useEffect } from 'react';
import { getMyQuo, removeQuote } from '../serivces/userService';
import { getAllQuotes } from '../serivces/quoteService';
export const MyQuotes = () => {
    const [userQuotes, setUserQuotes] = useState([]);

    useEffect(() => {
        const fetchUserQuotes = async () => {
           let id = JSON.parse(localStorage.getItem("user")).id
            const userQuoteIds = await getMyQuo(id);
            console.log(id + "--"+userQuoteIds);
            
            try {
                const allQuotes = await getAllQuotes();
                const filteredQuotes = allQuotes.filter(quote => userQuoteIds.includes(quote.id));  
                setUserQuotes(filteredQuotes);
            } catch (err) {
                console.error("Error fetching user quotes:", err);
            }
        };
        fetchUserQuotes();
    }, []);

    const handleRemoveQuote = async (id) => {
        try {
            await removeQuote(id);  
            setUserQuotes(prevQuotes => prevQuotes.filter(quote => quote.Id !== id)); 
        } catch (err) {
            console.error("Failed to remove quote:", err);
        }
    };

    return (
        <div className="quote-list">
            {userQuotes.length > 0 ? (
                userQuotes.map((quote) => (
                    <div className="sentence-item" key={quote.Id}>
                        <span
                            className="trash-button"
                            onClick={() => handleRemoveQuote(quote.Id)}
                            style={{ fontSize: '24px', cursor: 'pointer', color: 'red' }}
                        >
                            🗑️
                        </span>
                        <span
                            className="star-button2"
                            style={{ color: "gold", fontSize: "24px" }}
                        >
                            ★
                        </span>
                        <span className='priority'>{quote.priority}</span>
                        <div className="quote-text">
                            <span>{quote.text}</span>
                        </div>
                        <div className="quote-title">
                            <strong>{quote.title}</strong>
                        </div>

                    </div>
                ))
            ) : (
                <p>אין לך ציטוטים עדיין</p>
            )}
        </div>
    );

}