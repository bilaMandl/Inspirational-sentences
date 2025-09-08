const Art = require("../models/art");

class ArtRepository {
    async getAll() {
        let result = await Art.find({ famous: true });
        return result;
    }
    async updatePriority(id) {
        let artToUpdate = await Art.findOne({ id: id });
        if (artToUpdate) {
            if (artToUpdate.famous) {
                await Art.findOneAndUpdate(
                    { id: Number(id) },
                    { $set: { priority: artToUpdate.priority + 1 } }
                );
                return artToUpdate;
            }
            else
                return { message: "The creation isn't famous, you can't add priority" };
        }
        else
            return null;
    }
    async updateFamous(id) {
        let artToUpdate = await Art.findOne({ id: id });
        if (artToUpdate) {
            const updateArt = await Art.findOneAndUpdate(
                { id: id },
                { $set: { famous: !artToUpdate.famous } },
                { new: true }
            );
            return updateArt;
        }
        else
            return null;
    }
    async getById(id){
        let result = await Art.findOne({id:id});
        return result;
    }
    async insert(newArt){
        let last = await Art.findOne().sort({ id: -1 });
        let newId = last ? last.id + 1 : 0;
        let result = await Art.insertOne({ id: newId,title:newArt.title,userId:newArt.userId, famous:newArt.famous, priority:0,backroundId:newArt.backroundId,textId:newArt.textId,url:newArt.url});
        return result;
    }
    async getMyArt(userId){
        let result = await Art.find({userId:userId});
        return result;
    }
}

const artRepository = new ArtRepository();
module.exports = artRepository;