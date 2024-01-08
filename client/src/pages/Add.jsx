import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {

    const [book, setBook] = useState({
        title: "",
        desc: "",
        Price: "",
        cover: ""
    });

    const navigate = useNavigate()


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        setBook({ ...book, cover: selectedFile });
    };

    console.log(book)
    const handleChange = (e) => {
    
        const { name, value } = e.target;
        setBook((prev) => ({ ...prev, [name]: value }));

    }

    const handleClick = async e => {
        // alert("hi")
        
        e.preventDefault()
        try {
            
            const formData = new FormData();
            formData.append('file', book?.cover);
         
            console.log("sfbvid---",book)
          const uploadPreset='atharva'
              const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dapjbojec/image/upload',
                formData,{
                    headers:{
                        "Content-Type":'multipart/form-data'
                    },
                    params:{
                        upload_preset:uploadPreset,
                        api_key:'598384173945155'
                    }
                }
              );
              // Handle the response, which will contain the URL of the uploaded image
            //   console.log('Uploaded image URL:', response.data?.url);
            
         
            if(response){

              const sendata=  await axios.post("http://localhost:8800/books",{
                    'title':book?.title,
                    'desc': book?.desc,
                    'Price': book?.Price,
                    'cover':  response.data?.url
                });
                
                if(sendata){

                    navigate("/")
                }
            }

        } catch (err) {
            console.log(err)
        }

    }



    return (
        <div className="form"   >
           
            <h1>ADD NEW BOOK</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title" />
            <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
            <input type="number" placeholder="Price" onChange={handleChange} name="Price" />
            <input type="file" accept=".jpg, .jpeg, .png" placeholder="cover" onChange={handleFileChange} name="cover" />
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>

    )
}

export default Add