import axios from "axios";
const URL = process.env.REACT_APP_API_URL ;
const API_URL = `${URL}/quotes`;

export const getAllQuotes = async () => {
    let result = "";
    try {
        const response = await axios.get(API_URL);

        result = response.data;
    } catch (error) {
        result = error.message;
    }
    return result;
};

export const getAllSuggs = async () => {
    let result = "";
    try {
        const response = await axios.get(`${API_URL}/status/123`);
        result = response.data;
    } catch (error) {
        result = error.message;
    }
    return result;
};

export const putPriority = async (userId) => {
    let result
    try {
        const response = await axios.put(`${API_URL}/pri/${userId}`);
        result = response.data;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const putStatus = async (userId) => {
    let result
    try {
        const response = await axios.put(`${API_URL}/sta/${userId}`);
        result = response.data;
    } catch (error) {
        result = error.message;
    }
    return result;
};
