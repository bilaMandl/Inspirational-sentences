import { useEffect, useState } from "react";
import { getByIdUser } from "../serivces/userService";

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState("/profile.png");
    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                const userData = await getByIdUser(storedUser.id);
                setUser(userData);
            }
        };
        fetchUser();
    }, []);

    if (!user) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96 border border-gray-300">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4 border border-gray-300"
                    width="80"
                />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">שלום ל-{user.name}</h3>
                <h5>CONTACT:</h5>
                <div style={{ display: "flex",justifyContent:"center" }}>
                    <i style={{margin:"3.2px"}} className="glyphicon glyphicon-envelope"></i>
                    <p className="text-gray-600">{user.mail}</p>
                </div>
                <div className="mt-4">
                    <p className="font-medium text-gray-700">מספר הצעות: {user.suggestions.length || 0}</p>
                    <p className="font-medium text-gray-700">מספר יצירות: {user.myArts.length || 0}</p>

                </div>
            </div>
        </div>
    );
};
