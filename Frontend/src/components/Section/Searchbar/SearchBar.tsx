import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
