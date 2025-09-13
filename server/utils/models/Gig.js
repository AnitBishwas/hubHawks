import mongoose from "mongoose";


const gigSchema = new mongoose.Schema({
    userId:{
        type: String,
        reuired: true
    },
    freelancers:{
        type: Array
    },
    content: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    }
},{
    timestamps: true
});

const GigModel = mongoose.model("Gig", gigSchema);

export default GigModel;