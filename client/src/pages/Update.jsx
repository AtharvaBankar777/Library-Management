import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = ()=>{

    const [book,setBook]=useState({
        title:"",
        desc:"",
        Price:null,
        cover:""
    });

    const navigate = useNavigate()
    const location = useLocation()

    const bookId = location.pathname.split("/")[2]

    // console.log(location.pathname.split("/")[2])

    const handleChange=(e)=>{
        setBook(prev=>({...prev,[e.target.name]:e.target.value}))
    };

    const handleFile=(e)=>{
        const selectedFile = e.target.files[0];
        
        setBook({ ...book, cover: selectedFile });
    }
    const handleClick = async e =>{
        e.preventDefault()
        try{
console.log("imagvsbv---",book)

            const formData = new FormData();
            formData.append('file', book?.cover);
         
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

if(response){

    await axios.put(`http://localhost:8800/books/${bookId}`, {
        'title':book?.title,
        'desc': book?.desc,
        'Price': book?.Price,
        'cover':  response.data?.url
    }) ;
    navigate("/")
}
        }catch(err){
            console.log(err)
        }

    }

    console.log(book);

    return (
        <div className="form">
            <h1>Update the Book</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
            <input type="number" placeholder="Price" onChange={handleChange}  name="Price"/>
            <input type="file" placeholder="cover" onChange={handleFile} name="cover"/>
        <button className="formButton" onClick={handleClick}>Update</button>
        </div>

    )
}

export default Update