import { Route, Routes } from "react-router-dom";
import { HomePage } from "./homePage";
import { MyQuotes } from "./myQuotes";
import { MySuggestions } from "./mySuggestions";
import { NewArt } from "./newArt";
import { NewSuggestion } from "./newSuggestion";
import { Profile } from "./profile";
import { Quotes } from "./quotes";
import { MyArts } from "./myArts";
import { MyBackgrounds } from "./myBackgrounds";
import { Backgrounds } from "./backgrounds";
import { AuthWrapper } from "./AuthWrapper";
export const Routing = () => {
    return <>
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="home" element={<HomePage></HomePage>}></Route>
            <Route path="auth" element={<AuthWrapper></AuthWrapper>}></Route>
            <Route path="back" element={<Backgrounds></Backgrounds>}></Route>
            <Route path="myArts" element={<MyArts></MyArts>}></Route>
            <Route path="myBack" element={<MyBackgrounds></MyBackgrounds>}></Route>
            <Route path="myQu" element={<MyQuotes></MyQuotes>}></Route>
            <Route path="mySug" element={<MySuggestions></MySuggestions>}></Route>
            <Route path="newArt" element={<NewArt></NewArt>}></Route>
            <Route path="newSugg" element={<NewSuggestion></NewSuggestion>}></Route>
            <Route path="pro" element={<Profile></Profile>}></Route>
            <Route path="quotes" element={<Quotes></Quotes>}></Route>
        </Routes>
    </>
}