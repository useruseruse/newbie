const mongoose = require("mongoose");

const UserSchemaDefinition = {
    userName: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    }
}

const UserSchema =  new mongoose.Schema(UserSchemaDefinition);
const UserModel = mongoose.model("user", UserSchema);
exports.UserModel = UserModel;




