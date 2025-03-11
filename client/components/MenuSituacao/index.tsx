import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PropsMenu {
  situacao: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled: boolean;
}

export default function MenuSituacao({
  situacao,
  onChange,
  disabled,
}: PropsMenu) {
  return (
    <Box sx={{ minWidth: 120, width: "30%", marginTop: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Situação</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={situacao}
          label={"Situação"}
          onChange={onChange}
          disabled={disabled}
        >
          <MenuItem value={"Cadastrada"}>Cadastrada</MenuItem>
          <MenuItem value={"Em Andamento"}>Em Andamento</MenuItem>
          {!(situacao == "Cadastrada") && (
            <MenuItem value={"Finalizada"}>Finalizada</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
