const User = require("../models/user");

class UserRepository {
    async getAll() {
        let result = await User.find()
        return result;
    }
    async getById(id) {
        let result = await User.findOne({ id: id });
        return result;
    }
    async insert(newUser) {
        let last = await User.findOne().sort({ id: -1 });
        let newId = last ? last.id + 1 : 0;
        let result = await User.insertOne({
            id: newId,
            name: newUser.name,
            password: newUser.password,
            mail: newUser.mail,
            myArts: [],
            myBackgrounds: [],
            myQuotes: [],
            suggestions: []
        });
        return result;
    }
    async login(name, pass) {
        let result = await User.findOne({ name: name })
        if (result && result.password == pass)
            return result;
        return false;
    }
    async postNewSuggest(id, sugg) {
        let result = await User.updateOne({ id: id }, { $push: { suggestions: sugg } });
        return result;
    }
    async postNewBackground(id, background) {
        let result = await User.updateOne({ id: id }, { $push: { myBackgrounds: background.backgroundId } });
        return result;
    }
    async postNewArt(userId, id) {
        let result = await User.updateOne({ id: userId }, { $push: { myArts: id } });
        return result;
    }
    async deleteSuggest(id, sugg) {
        let result = await User.updateOne({ id: id }, { $pull: { suggestions: sugg } }, { new: true });
        return result;
    }
    async deleteBackground(id, background) {
        let result = await User.updateOne({ id: id }, { $pull: { myBackgrounds: background.backgroundId } });
        return result;
    }
    async postNewQuote(id, quote) {
        try {
            let result = await User.updateOne({ id: id }, { $push: { myQuotes: quote.quoteId } });
            return result;
        } catch (error) {
            console.error("Error updating quote:", error);
            throw error;
        }
    }
    async deleteQuote(id, quote) {
        let result = await User.updateOne({ id: id }, { $pull: { myQuotes: quote.quoteId } });
        return result;
    }

}

const userRepository = new UserRepository();
module.exports = userRepository;