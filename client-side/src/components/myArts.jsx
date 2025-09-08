import { useEffect, useState } from "react";
import { famous } from "../serivces/artService";
import { getMyArts } from "../serivces/userService";

export const MyArts = () => {
    const [artworks, setArtworks] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    useEffect(() => {
        const fetchArtworks = async () => {
            if (!userId) return; 
            try {
                const data = await getMyArts(userId);
                console.log(data);

                if (Array.isArray(data)) {
                    setArtworks(data);
                } else {
                    console.error("Expected data to be an array:", data);
                }
            } catch (error) {
                console.error("Error fetching artworks:", error);
            }
        };

        fetchArtworks();
    }, [userId]);

    const handlePublicationToggle = async (artId) => {
        try {
            await famous(artId);
            setArtworks(prevArtworks => 
                prevArtworks.map(art => 
                    art.id === artId ? { ...art, status: !art.status } : art
                )
            );
        } catch (error) {
            console.error("Failed to update publication status:", error);
        }
    };

    const convertDriveUrl = (originalUrl) => {
        if (!originalUrl) return '/d.jpg';
        const fileIdMatch = originalUrl.match(/[-\w]{25,}/);
        return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=w1000` : originalUrl;
    };

    return (
        <div className="image-container">
            {artworks.length > 0 ? (
                artworks.map((art) => (
                    <div key={art.id} className="image-wrapper">
                        <img src={convertDriveUrl(art.url)} alt={art.title} width="200" />
                        <div className="art-title">{art.title}</div>
                        <div className="art-priority">Priority: {art.priority}</div>
                        <button onClick={() => handlePublicationToggle(art.id)}>
                            {art.status ? "Unpublish" : "Publish"}
                        </button>
                    </div>
                ))
            ) : (
                <p>אין יצירות אמנות זמינות או טוען יצירות אמנות...</p>
            )}
        </div>
    );
};
