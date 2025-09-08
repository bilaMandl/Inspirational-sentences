import { useState } from "react";
import { Register } from "./register";
import { Login } from "./login";
import "./auth.css";

export const AuthWrapper = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggle = () => { setIsSignIn(!isSignIn) }

    return (
        <div className="auth-page">
            <div className={`div-container ${isSignIn ? "" : "right-panel-active"}`}>
                <Login />
                <Register />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>ברוך שובך!</h1>
                            <p>כבר יש לך חשבון? התחבר כאן</p>
                            <button className="ghost" onClick={toggle}>
                                התחבר
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>!שלום</h1>
                            <p>עדיין אין לך חשבון? הירשם עכשיו</p>
                            <button className="ghost" onClick={toggle}>
                                הרשמה
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
