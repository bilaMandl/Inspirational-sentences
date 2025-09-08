import { useEffect, useState } from "react";
import { getMyBack, removeBack } from "../serivces/userService";
import { getAllBackgrounds } from "../serivces/backgroundService";

export const MyBackgrounds = () => {
    const [userBacks, setUserBacks] = useState([]);
    const [isHovered, setIsHovered] = useState(false); 

    useEffect(() => {
        const fetchUserBacks = async () => {
            let id = JSON.parse(localStorage.getItem("user")).id;
            try {
                const userBackIds = await getMyBack(id);
                const allBackes = await getAllBackgrounds();
                const filteredBacks = allBackes.filter(back => userBackIds.includes(back.id));
                setUserBacks(filteredBacks);
            } catch (err) {
                console.error("Error fetching user backgrounds:", err);
            }
        };
        fetchUserBacks();
    }, []);

    const handleRemoveBack = async (id) => {
        try {
            let userId = JSON.parse(localStorage.getItem("user")).id;
            await removeBack(userId, id);
            setUserBacks(prevBacks => prevBacks.filter(back => back.id !== id));
        } catch (err) {
            console.error("Failed to remove background:", err);
        }
    };

    const getDirectDriveLink = (originalUrl) => {
        if (!originalUrl) return '/d.jpg';
        const fileIdMatch = originalUrl.match(/[-\w]{25,}/);
        return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=w1000` : originalUrl;
    };

    return (
        <div className="image-container">
            {userBacks.length > 0 ? (
                userBacks.map((img) => (
                    <div
                        key={img.id}
                        className="image-wrapper"
                        style={{ position: 'relative', display: 'inline-block' }}
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)} 
                    >
                        <img
                            src={getDirectDriveLink(img.url)}
                            alt={`Image ${img.name}`}
                            width="200"
                            onError={(e) => {
                                console.error("Image failed to load:", img.url);
                                e.target.src = "/d.jpg";
                            }}
                        /><div className="image-name">
                            {img.name || `Image without name`}
                        </div>
                        {isHovered && (  
                            <button
                                className="trash-button"
                                onClick={() => handleRemoveBack(img.id)}
                                style={{
                                    position: 'absolute',
                                    bottom: '5px',  
                                    left: '5px',    
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    color: 'red',
                                    background: 'none', 
                                    border: 'none',      
                                    zIndex: 1          
                                }}
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>אין לך רקעים עדיין</p>
            )}
        </div>
    );
};
