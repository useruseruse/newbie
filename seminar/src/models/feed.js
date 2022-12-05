const mongoose = require("mongoose");

const roomSchemaDefinition = {
    itemName: String,
    room: String,
};

const bookingSchemaDefinition = {
    room:{
    
    },
    startDate: {
        type: Date,
        min: Date.now,
    },

    reserved:{
        type: String
    }
    /*endDate: {
        type: Date,
        min: Date.now,
    }*/
}

const SchemaOptions = { timestamps: true };
const roomSchema = new mongoose.Schema(roomSchemaDefinition);
const bookingSchema =  new mongoose.Schema(bookingSchemaDefinition);


const RoomModel = mongoose.model("room", roomSchema);
const BookingModel = mongoose.model("booking", bookingSchema);
//

exports.RoomModel = RoomModel;
exports.BookingModel = BookingModel;
