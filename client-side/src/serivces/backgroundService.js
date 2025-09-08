import axios from "axios";
const URL = process.env.REACT_APP_API_URL;
const API_URL = `${URL}/backgrouds`;

export const getAllBackgrounds = async () => {
    let result = "";
    try {
        const response = await axios.get(API_URL);
        
        result = response.data;
    } catch (error) {
        result = error.message;
    }
    return result;
};
