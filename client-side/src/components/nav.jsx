import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Nav = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const updateUser = () => {
            let user = JSON.parse(localStorage.getItem("user"));
            setName(user ? user.name : "");
        };
        updateUser();
        window.addEventListener("storage", updateUser);
        return () => window.removeEventListener("storage", updateUser);
    }, []);
    const logout = () => {
        localStorage.removeItem("user");
        navigate('/home')
        window.location.reload();
    }
    return (
        <header style={{ position: "relative", marginBottom: "180px" }}>
            <div style={{
                position: "absolute",
                top: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
            }}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        boxShadow: "0 0 15px rgba(0.2,0.5,0.1,0.3)"
                    }}
                />
            </div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container d-flex justify-content-between align-items-center">

                    <ul className="navbar-nav flex-row">
                        {name && (<li className="nav-item mx-2">
                            <Link className="nav-link">
                                <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
                            </Link></li>)}
                        {!name && <li className="nav-item mx-2"><Link className="nav-link" to={'auth'}>Login/Register</Link></li>}
                        {name && <li className="nav-item mx-2"><Link className="nav-link" to={'pro'}>
                            <img src="./profile.png" style={{ width: "35px", height: "35px", borderRadius: "50%" }}></img>
                        </Link></li>}

                    </ul>
                    <ul className="navbar-nav flex-row">
                        {name && <li className="nav-item mx-2"><Link className="nav-link" to={'mySug'}>My Suggestions</Link></li>}
                        {name && <li className="nav-item mx-2"><Link className="nav-link" to={'myQu'}>My Quotes</Link></li>}
                        {name && <li className="nav-item mx-2"><Link className="nav-link" to={'myBack'}>My Backgrounds</Link></li>}
                        {name && <li className="nav-item mx-2"><Link className="nav-link" to={'newArt'}>New Art</Link></li>}
                        {name && <li className="nav-item mx-2"><Link className="nav-link" to={'quotes'}>Quotes</Link></li>}
                        {name && <li className="nav-item mx-2"><Link className="nav-link" to={'back'}>Backgrounds</Link></li>}
                        <li className="nav-item mx-2"><Link className="nav-link" to={'home'}>Home Page</Link></li>
                    </ul>

                </div>
            </nav>
        </header>

    );
}