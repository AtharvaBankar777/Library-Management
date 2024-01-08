import cloudinary from "cloudinary";

const CLoudinaryConnect=()=>{
    cloudinary.config({
        cloud_name:'',
        api_key:'',
        api_secret:'',
    });

    
    return cloudinary
}


export default CLoudinaryConnect;