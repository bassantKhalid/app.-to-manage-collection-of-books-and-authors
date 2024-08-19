import { Auther } from "../../../database/models/auther.model.js";
import { Book } from "../../../database/models/book.model.js";

export const addAuther = async (req,res,next) =>{
    try{
        const { name , bio , birthDate, books} = req.body
        const addNewAuther = await (await Auther.create({ name , bio , birthDate, books})).populate([{path:"books", 
            select:"title content -_id"
        
        }])
        if(!addNewAuther){
            throw Error('failed to add Auther', {cause:500})
        }
        
        return res.status(201).json({message: "Auther added successfully ", success: true , data: addNewAuther})
    }catch(error){
    return res.status(error.cause || 500 ).json({message: error.message, success: false})
    }
}
export const getAllAuthers= async (req,res,next)=>{
    try{ 
        const searchName = req.query.name ? req.query.name.trim() : '';
        const searchBio = req.query.bio ? req.query.bio.trim() : '';
        const query = {};
        if (searchName) {
          query.name = searchName; 
        }
        if (searchBio) {
          query.bio = searchBio;
        }
    
        const authers = await Auther.find(query).limit( 4 )
        return res.status(200).json({message:"success",success: true,  authers})
    }
       catch(error){
        return res.status(error.cause || 500 ).json({message: error.message, success: false})
        }
}


export const getAutherById = async (req,res,next)=>{

    try{

        const specificAuther = await Auther.findById(req.params.id).populate('books')
        if (!specificAuther) {
            throw Error('Auther not found', { cause: 404 });
          }
        return res.status(200).json({message:"success",success: true, specificAuther})
    
    
    } catch(error){
            return res.status(error.cause || 500 ).json({message: error.message, success: false})
            }
    
}
export const updateAutherById = async (req,res,next)=>{

    try{
        let updateAuther = await Auther.findByIdAndUpdate(req.params.id , req.body , {new : true})
        if (!updateAuther) {
            throw Error('Auther not found', { cause: 404 });
          }
          
        return res.status(200).json({message:"updated successfully",success: true, updateAuther})
    
    
    } catch(error){
            return res.status(error.cause || 500 ).json({message: error.message, success: false})
            }
    
    
}
export const deleteAutherById = async (req,res,next)=>{

    try{
        let deleteAuther = await Auther.findByIdAndDelete(req.params.id )
        if (!deleteAuther) {
            throw Error('Auther not found', { cause: 404 });
          }
          
        return res.status(200).json({message:" deleted successfully",success: true,  deleteAuther})
    
    
    } catch(error){
            return res.status(error.cause || 500 ).json({message: error.message, success: false})
            }
    
}