import { useEffect, useState } from "react";
import { getAllBackgrounds } from "../serivces/backgroundService";
import { addBack, getMyBack, removeBack } from "../serivces/userService";

export const Backgrounds = () => {
    const [images, setImages] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [imageLoadErrors, setImageLoadErrors] = useState(new Set());
    const userId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getAllBackgrounds();
                const validImage = data.map(img => ({ ...img, url: convertDriveUrl(img.url) }));
                setImages(prevImage => JSON.stringify(prevImage) === JSON.stringify(validImage) ? prevImage : validImage);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const myBackgrounds = await getMyBack(userId);
                setFavorites(myBackgrounds);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            }
        };

        fetchImages();
        fetchFavorites();
    }, []);

    const convertDriveUrl = (originalUrl) => {
        if (!originalUrl) return '/d.jpg';
        const fileIdMatch = originalUrl.match(/[-\w]{25,}/);
        return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=w1000` : originalUrl;
    };

    const like = async (id) => {
        try {
            if (favorites.includes(id)) {
                await removeBack(userId, id);
            } else {
                await addBack(userId, id);
            }
            const updatedFavorites = await getMyBack(userId);
            setFavorites(updatedFavorites);
        } catch (err) {
            console.error("Failed to update favorite:", err);
        }
    };

    return (
        <div className="image-container">
            {images.length > 0 ? (
                images.map((img, index) => (

                    <div key={img.id} className="image-wrapper">
                        <img
                            src={img.url}
                            alt={`Image ${index}`}
                            width="200"
                            onError={(e) => {
                                if (!imageLoadErrors.has(img.url)) {
                                    setImageLoadErrors(prev => new Set(prev).add(img.url));
                                    setTimeout(() => { e.target.src = img.url; }, 30000);
                                    e.target.src = "/d.jpg";
                                    console.error("Image failed to load:", e.target.src);
                                }
                            }}
                        />
                        <div className="image-name">
                            {img.name || `Image ${index}`}
                        </div>
                        <div className="button-container">
                            <button
                                className="heart-button"
                                onClick={() => like(Number(img.id))}
                                style={{ color: favorites.includes(img.id) ? "red" : "black" }}
                            >
                                like!
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading images...</p>
            )}
        </div>
    );
};
