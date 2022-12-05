const mongoose = require("mongoose");


const bookingSchemaDefinition = {
    itemName:{
        type:String
    },
    room:{
        type: String
    },
    startDate: {
        type: Date,
        min: Date.now,
    },

    reserved:{
        type: String
    },
    userName:{
        type: String
    }
    /*endDate: {
        type: Date,
        min: Date.now,
    }*/
}

const SchemaOptions = { timestamps: true };
const bookingSchema =  new mongoose.Schema(bookingSchemaDefinition);


const BookingModel = mongoose.model("booking", bookingSchema);
//

exports.BookingModel = BookingModel;
