import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ search, setSearch }) => {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        variant="outlined"
        placeholder="Buscar..."
        onChange={handleChange}
        sx={{
          width: "100%",
          maxWidth: "600px",
          flex: 1,
          backgroundColor: "white",
          borderRadius: "20px",
          "& .MuiInputBase-input": {
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc",
              borderRadius: "20px",
              width: "100%",
            },
            "&:hover fieldset": {
              borderColor: "#888",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6768F2",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ height: "200px" }}>
              <SearchIcon sx={{ color: "#6768F2" }} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchInput;
