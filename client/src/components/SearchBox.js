import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    // <Form className="d-flex me-auto" onSubmit={submitHandler}>
    <Form className="p-1" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          className="search-bar"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, Author, Genre"
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <button
          className="search-btn"
          variant="outline-primary"
          type="submit"
          id="button-search"
        >
          <i className="fas fa-search"></i>
        </button>
      </InputGroup>
    </Form>
  );
}
