import React, { useEffect, useState } from "react";
import { getMyBack, getMyQuo } from "../serivces/userService";
import { getAllQuotes } from "../serivces/quoteService";
import { getAllBackgrounds } from "../serivces/backgroundService";
import { createArt } from "../serivces/artService";

export const NewArt = () => {
    const [userQuotes, setUserQuotes] = useState([]);
    const [userBacks, setUserBacks] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [selectedBackground, setSelectedBackground] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [publish, setPublish] = useState(false);
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState(40);
    const userId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userQuoteIds = await getMyQuo(userId);
                const allQuotes = await getAllQuotes();
                const filteredQuotes = allQuotes.filter(quote => userQuoteIds.includes(quote.id));
                setUserQuotes(filteredQuotes);

                const userBackIds = await getMyBack(userId);
                const allBacks = await getAllBackgrounds();
                const filteredBacks = allBacks.filter(back => userBackIds.includes(back.id));
                setUserBacks(filteredBacks);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    const convertDriveUrl = (originalUrl) => {
        if (!originalUrl) return '/d.jpg';
        const fileIdMatch = originalUrl.match(/[-\w]{25,}/);
        return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=w1000` : originalUrl;
    };

    const handleCreateClick = async () => {
        try {
            await createArt({ userId: userId, title, textId: selectedQuote, backroundId: selectedBackground, famous: publish, color, size });
            alert("the art created successfully");
            setShowModal(false);
            setTitle("");
            setPublish(false);
            setSelectedQuote(null);
            setSelectedBackground(null);
            setColor("#000000");
            setSize(40);
        } catch (err) {
            console.error("Error creating art:", err);
            alert("error, can't create art");
        }
    };

    const showForm = () => {
        console.log("show form", showModal);
        setShowModal(true);
    };

    return (
        <div className="choose-container">
            <div className="quote-section">
                <h2>בחר ציטוט</h2>
                {userQuotes.length > 0 ? (
                    userQuotes.map(quote => (
                        <div key={quote.id} className={`quote-item ${selectedQuote === quote.id ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="quote"
                                checked={selectedQuote === quote.id}
                                onChange={() => setSelectedQuote(quote.id)}
                            />
                            <span className="quote-text">{quote.text}</span>
                        </div>
                    ))
                ) : (
                    <p>אין לך ציטוטים עדיין</p>
                )}
            </div>

            <div className="background-section">
                <h2>בחר רקע</h2>
                {userBacks.length > 0 ? (
                    userBacks.map(img => (
                        <div key={img.id} className={`background-item ${selectedBackground === img.id ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="background"
                                checked={selectedBackground === img.id}
                                onChange={() => setSelectedBackground(img.id)}
                            />
                            <img src={convertDriveUrl(img.url)} alt={img.name} width="200" />
                        </div>
                    ))
                ) : (
                    <p>אין לך רקעים עדיין</p>
                )}
            </div>

            {selectedQuote && selectedBackground && (
                <button className="create-button" onClick={showForm}>
                    צור
                </button>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>יצירת יצירה</h2>
                        <label>
                            כותרת:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <div className="color-options">
                            <span>בחר צבע:</span>
                            <label>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </label>
                            <div
                                className="color-preview"
                                style={{ backgroundColor: color }}
                            ></div>
                        </div>

                        <div className="publish-options">
                            <span>פרסום:</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={publish}
                                    onChange={() => setPublish(!publish)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        {/* <div className="publish-options">
                            <span>האם לפרסם?</span>
                            <label>
                                <input
                                    type="radio"
                                    name="publish"
                                    checked={publish === true}
                                    onChange={() => setPublish(true)}
                                />
                                כן
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="publish"
                                    checked={publish === false}
                                    onChange={() => setPublish(false)}
                                />
                                לא
                            </label>
                        </div>
                        <div className="color-options">
                            <span>בחר צבע:</span>
                            <label>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </label>
                        </div> */}
                        <div className="size-options">
                            <span>בחר גודל:</span>
                            <label>
                                <input
                                    type="number"
                                    value={size}
                                    onChange={(e) => setSize(Number(e.target.value))}
                                    min="10"
                                    max="100"
                                />
                            </label>
                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleCreateClick}>צור</button>
                            <button onClick={() => setShowModal(false)}>ביטול</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
