import mongoose from "mongoose"

const OptionSchema = mongoose.Schema({
    callOrPut: {
        type: String,
        required: true
    },
    strategy: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    todayPrice: {
        type: Number,
        required: true
    },
    todayDate: {
        type: String,
        required: true
    },
    strikeDate: {
        type: String,
        required: true
    },
    strikePrice: {
        type: Number,
        required: true
    },
    inputs: {
        type: Array,
        required: true
    },

});

export default mongoose.model('Options', OptionSchema)