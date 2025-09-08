import { useEffect, useState } from "react";
import { getFamous, putPriorutyArt } from "../serivces/artService";

export const HomePage = () => {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await getFamous();
                setArtworks(response);
                console.log("response"+response);
                
            } catch (error) {
                console.error("Error fetching artworks:", error);
            }
        };

        fetchArtworks();
    }, []);

    const handleIncreasePriority = async (artId) => {
        try {
            await putPriorutyArt(artId);
            setArtworks(prevArtworks =>
                prevArtworks.map(art =>
                    art.Id === artId ? { ...art, priority: art.priority + 1 } : art
                )
            );
        } catch (error) {
            console.error("Failed to increase priority:", error);
        }
    };

    const convertDriveUrl = (originalUrl) => {
        if (!originalUrl) return '/d.jpg';
        const fileIdMatch = originalUrl.match(/[-\w]{25,}/);
        return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=w1000` : originalUrl;
    };

    return (
        <div className="homepage-container">
            <h1 className="page-title">יצירות אמנות מפורסמות</h1>
            <div className="image-container">
                {artworks.length > 0 ? (
                    artworks.map((art) => (
                        <div key={art.Id} className="image-wrapper">
                            <span
                                className="star-button"
                                onClick={() => handleIncreasePriority(art.Id)}
                            >
                                ★
                            </span>
                            <span className='priority'>{art.priority}</span>
                            <img src={convertDriveUrl(art.url)} alt={art.title} className="art-image" />
                            <div className="art-title">{art.title}</div>
                        </div>
                    ))
                ) : (
                    <p>טוען יצירות אמנות...</p>
                )}
            </div>
        </div>
    );
};
