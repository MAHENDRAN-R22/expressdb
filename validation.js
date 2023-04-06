const mongoose = require("mongoose");
const nameSchema = new mongoose.Schema({
    fName: {
        type: String,
        require: true,
        uppercase: true,
    },
    mName: {
        type: String,
        require: true,
        uppercase: true,
    },
    lName: {
        type: String,
        require: true,
        uppercase: true,
    },
    mailId: {
        type: String,
        require: true,
        lowercase: true,
    },
    num: {
        type: Number,
        require: true,
    },
    dob: {
        type: Date,
        require: true,
    },
    genderVal: {
        type: String,
        require: true,
    },
    university: {
        type: String,
        require: true,

    }
});
module.exports  = mongoose.model("formdetail", nameSchema);
