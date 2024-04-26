const mongoose = require('mongoose');
const pad = require('pad');
const sequenceSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
});
 
// Define a model for the sequence
const Sequence = mongoose.model('Sequence', sequenceSchema);
 
let getNextSequenceValue=async(sequenceName, sequenceID)=> {
    const sequenceDoc = await Sequence.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceID ? (sequenceID).concat(pad(3, (sequenceDoc["sequence_value"]).toString(), '0')) : (sequenceDoc.sequence_value).toString();
}
module.exports = getNextSequenceValue;
