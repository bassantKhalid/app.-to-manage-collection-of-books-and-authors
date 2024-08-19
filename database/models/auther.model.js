import mongoose, { Schema, model  } from "mongoose"
const autherSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },

    bio:String,
    birthDate: Date,
    books: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],

},
{timestamps:true,})
export const Auther =model('Auther', autherSchema)