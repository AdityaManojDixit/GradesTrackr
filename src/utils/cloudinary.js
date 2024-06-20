import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

         
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null;
        //Uploading file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type:"auto"} );

        console.log("File is uploaded on Cloudinary server. Public URL:", response.url);
        return response;

    } catch(error){
        fs.unlinkSync(localFilePath) //Unlink or remove locally saved temporarily file as upload operation failed
        return null;
    }
}


export {uploadOnCloudinary}