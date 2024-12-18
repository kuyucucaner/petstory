// src/components/SearchComponent.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../features/search/search-slice';
import '../styles/search.css';
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchItems(query));
  };

  return (
    <div className='search-container'>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='search-input'
        />
        <button type="submit" className='search-button'>F</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
{/* 
      <div>
        <h2>Items</h2>
        {results.items.length ? (
          results.items.map((item) => <div key={item._id}>{item.name}</div>)
        ) : (
          <p>No items found.</p>
        )}

        <h2>Users</h2>
        {results.users.length ? (
          results.users.map((user) => <div key={user._id}>{user.name}</div>)
        ) : (
          <p>No users found.</p>
        )}

        <h2>Pets</h2>
        {results.pets.length ? (
          results.pets.map((pet) => <div key={pet._id}>{pet.name}</div>)
        ) : (
          <p>No pets found.</p>
        )}
      </div> */}
    </div>
  );
};

export default SearchComponent;
