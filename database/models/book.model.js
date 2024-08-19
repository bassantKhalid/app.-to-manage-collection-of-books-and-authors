import mongoose, {Schema, model} from "mongoose";
const bookSchema = new Schema({
    title: {
        type:String,
        required : true

    },
    content:{
        type:String,
        required : true

    },
    auther:{
        type: Schema.Types.ObjectId,
         ref: 'Auther',
        required : true
    },
    publishedDate:{
        type: Date,
        default: Date.now
    }

},{timestamps: true})

export const Book =model('Book', bookSchema)