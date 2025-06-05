import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div style={styles.searchBar}>
      <input
        type="text"
        placeholder="Пошук чату..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  searchBar: {
    padding: '10px 20px 10px 16px',
    borderBottom: '1px solid #ccc',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
  },
};

export default SearchBar;
