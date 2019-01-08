const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        num_packs: {
            type: Number,
            required: true
        }
    }
);

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;