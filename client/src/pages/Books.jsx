import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const Books = () => {

  const [books, setBooks] = useState([])
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books")
        
        setBooks(res.data);
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    };
    fetchAllBooks();
  }, []);

  

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  


  return (
    <div>
      <div id="a1">
        <h1>Library Management System</h1>
      </div>

      

      {/* <h1 i="1">Library Management System </h1> */}

    




      <div className="books">
        {Array.isArray(books) && books.map((book) => (
          <div className="book" key={book.id}>
            {/* {book.cover && <img src={book.cover} alt="" />} */}
            <img src={book?.cover} alt="image" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>&#8377;{book.Price}</span>
            <div className="last">
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
          </div>
        ))}

      </div>
      <button className="addBook"><Link to="/add">Add new book</Link></button>
    </div>
  );


}

export default Books