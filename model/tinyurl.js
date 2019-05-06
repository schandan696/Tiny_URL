const mongoose =  require('mongoose');

const TinyUrl = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unique_id: {
    type: String, 
    required: true, 
    unique: true
    },
    original_Link: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const TinyUrls = module.exports = mongoose.model('TinyUrl', TinyUrl);