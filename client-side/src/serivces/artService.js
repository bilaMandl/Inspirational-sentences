import axios from "axios";
const URL = process.env.REACT_APP_API_URL;
const API_URL = `${URL}/arts`;

export const createArt = async (obj) => {
    let result = "";
    try {
        
        const response = await axios.post(`${API_URL}/`, obj);
        result = response.data;

    } catch (error) {
        result = error.response ? error.response.data : error.message;
    }
    return result;
};
export const putPriorutyArt = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/priority/${id}`)
        return response.data
    }
    catch (error) {
        return error.message;
    }
}

export const famous = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/famous/${id}`)
        return response.data
    }
    catch (error) {
        return error.message;
    }
}

export const getFamous = async () => {
    try {
        console.log(API_URL);
        
        const response = await axios.get(API_URL)
        return response.data
    }
    catch (error) {
        return error.message;
    }
}


