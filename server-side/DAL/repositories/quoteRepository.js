const Quote = require("../models/quote");

class QuoteRepository {
    async getAll() {
        let result = await Quote.find({ status: true });
        return result;
    }
    async getAllStatus(){
        let result = await Quote.find({ status: false });
        return result;
    }
    async getById(id) {
        let result = await Quote.find({ id: id });
        return result;
    }
    async insert(newQuote) {
        let last = await Quote.findOne().sort({ id: -1 });
        let newId = last ? last.id + 1 : 0;
        let result = await Quote.insertOne({ id: newId, text: newQuote.text, title: newQuote.title, groupId: newQuote.groupId, priority: 0, status: false });
        return result;
    }
    async updateStatus(id) {
        let qoute = await Quote.findOne({ id: id })
        if (qoute) {
            let updateQoute = await Quote.findOneAndUpdate(
                { id: id },
                { $set: { status: !qoute.status } },
                { new: true }
            );
            return updateQoute
        } else
            return null;
    }
    async updatePriority(id) {
        let quote = await Quote.findOne({ id: id });
        if (quote) {
            if (quote.status) {
                let quoteUpdate = await Quote.findOneAndUpdate(
                    { id: id },
                    { $set: { priority: quote.priority + 1 } }
                );
                return quoteUpdate;
            }
            else
                return { message: "The creation isn't famous, you can't add priority" };
        }
        else
            return null;
    }
    async delete(id) {
        let deleted = await Quote.findOneAndDelete({ id: id })
        if (deleted) {
            return deleted
        }
        else
            return null;
    }
}
const quoteRepository = new QuoteRepository();
module.exports = quoteRepository;