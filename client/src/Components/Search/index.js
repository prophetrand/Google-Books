import React, { useState } from "react";
import NavBar from "../NavBar";
import Jumbotron from "../Jumbotron";
import SearchBar from "../SearchBar";
import Table from "../Table";
import API from "../../utils/API";

function Search() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  function handleInputChange(event) {
    const { value } = event.target;
    setSearch(value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.googleBooks(search)
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  function saveBook(book) {
    API.saveBook({
      title: book.title,
      authors: book.authors,
      description: book.description,
      image: book.image,
      link: book.link,
    });
  }

  return (
    <div>
      <NavBar />
      <Jumbotron />
      <div className="container">
        <SearchBar
          onChange={handleInputChange}
          onClick={handleFormSubmit}
          value={search}
        />
        {books.map((book, index) => {
          return <Table
            book={book}
            onClick={saveBook}
            key={index}
            status="search"
          />
        })}
      </div>
    </div>
  );
}

export default Search;
