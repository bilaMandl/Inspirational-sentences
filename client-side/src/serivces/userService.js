import axios from "axios";
const URL = process.env.REACT_APP_API_URL ;
const API_URL = `${URL}/users`;

export const userLogin = async (user) => {
    let result = "";
    try {
        const response = await axios.post(`${API_URL}/log`, { name: user.field1, pass: user.field2 });
        result = response.data;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const userRegister = async (user) => {
    let result = "";
    try {
        const response = await axios.post(`${API_URL}/`, user);
        result = response.data;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const getByIdUser = async (id) => {
    let result
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        result = response.data;
    } catch (error) {
        result = error.message
    }
    return result;
}
export const getMyArts = async (id) => {
    let result = [];
    try {
        const response = await getByIdUser(id);
        console.log("Response from getByIdUser:", response);

        if (response && response.myArts) {
            result = response.myArts;
        } else {
            console.error("myArts not found in response:", response);
        }
    } catch (error) {
        console.error("Error fetching user arts:", error.message);
        result = [];
    }
    return result;
};

export const getMyQuo = async (id) => {
    let result = "";
    try {
        const response = await getByIdUser(id)
        result = response.myQuotes;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const removeQuote = async (id, quoteId) => {
    let result = "";
    try {
        const response = await axios.put(`${API_URL}/quote/d/${id}`, { "quoteId": quoteId })
        result = response.myQuotes;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const addQuote = async (id, quoteId) => {
    let result = "";
    try {
        const response = await axios.put(`${API_URL}/quote/${id}`, { "quoteId": quoteId })
        result = response.myQuotes;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const getMyBack = async (id) => {
    let result = "";
    try {
        const response = await getByIdUser(id)
        result = response.myBackgrounds;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const removeBack = async (id, backId) => {
    let result = "";
    try {
        const response = await axios.put(`${API_URL}/background/d/${id}`, { "backgroundId": backId })
        console.log(backId);
        result = response.myBackgrounds;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const addBack = async (id, backId) => {
    let result = null;
    try {
        const response = await axios.put(`${API_URL}/background/${id}`, { "backgroundId": backId })
        console.log(response.data);
        result = response.data.myBackgrounds;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const getMySugg = async (id) => {

    let result = "";
    try {
        const response = await getByIdUser(id)
        console.log(response.suggestions);
        result = response.suggestions;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const removeSugg = async (id, suggId) => {
    let result = "";
    try {
        const response = await axios.put(`${API_URL}/suggest/d/${id}`, { "quoteId": suggId.quoteId })
        result = response.suggestions;
    } catch (error) {
        result = error.message;
    }
    return result;
};
export const addSugg = async (id, sugg) => {
    let result = null;
    try {
        const response = await axios.put(`${API_URL}/suggest/${id}`, {
            "text": sugg.text,
            "title": sugg.title, "groupId": sugg.groupId
        })
        console.log(response.data);
        result = response.data.suggestions;
    } catch (error) {
        result = error.message;
    }
    return result;
};