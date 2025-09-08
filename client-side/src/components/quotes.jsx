import { useEffect, useState } from "react";
import { getAllQuotes, putPriority } from "../serivces/quoteService";
import { addQuote, getMyQuo, removeQuote } from "../serivces/userService";

export const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user")).id

    useEffect(() => {
        const show = async () => {
            try {
                let result = await getAllQuotes();
                setQuotes(result);
                console.log(userId);
                setFavorites(await getMyQuo(userId));
                console.log(favorites);

            }
            catch (e) {
                console.error(e);
            }
        };
        show();
    }, []);

    const handleFavoriteClick = async (id) => {
        
        try {
            if (favorites.includes(id)) {
                await removeQuote(userId, id); 
                console.log("1");
            } else {
                await addQuote(userId, id);

            }
            setFavorites(await getMyQuo(userId));            
        } catch (err) {
            console.error("Failed to update favorite:", err);
        }
    };

    const addPri = (id) => {
        const addPriority = async (id) => {
            let newItem = await putPriority(id);
            setQuotes(quotes.map(item =>
                item.id === id ? newItem : item
            ));
        };
        addPriority(id);
    };

    return (
        <div className="quote-list">
            {Array.isArray(quotes) && quotes.length > 0 ? (
                quotes.map((sentence, index) => (
                    <div className="sentence-item" key={index}>
                        <span
                            className="heart-button"
                            onClick={() => handleFavoriteClick(sentence.id)}
                            style={{ color: favorites.includes(sentence.id) ? 'red' : 'gray', fontSize: "24px" }}
                        >like!
                        </span>
                        <span
                            className="star-button2"
                            onClick={() => addPri(sentence.id)}
                            style={{ color: "gold", fontSize: "24px" }}
                        >
                            ★
                        </span>
                        <span className='priority'>{sentence.priority}</span>
                        <span className='quote-text'>{sentence.text}</span>
                        <strong className='quote-title'>{sentence.title}</strong>
                    </div>
                ))
            ) : (
                <p>אין משפטים</p>
            )}
        </div>
    );
};
