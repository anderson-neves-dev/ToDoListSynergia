import React from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { Box, Typography } from "@mui/material";
interface propsType {
  value: number;
  valueMax: number;
  titulo: string;
}
export function GaugeComponet({ value, valueMax, titulo }: propsType) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          marginBottom: "-50px",
          fontSize: "25px",
          fontWeight: "bold",
          fontFamily: "Saira, sans-serif",
        }}
      >
        {titulo}
      </Typography>
      <Gauge
        width={200}
        value={value}
        valueMax={valueMax}
        sx={{
          p: 0,
          m: 0,
          "& text": {
            fontSize: "30px",
            fontWeight: "bold",
            fill: "#333",
          },
        }}
      />
    </Box>
  );
}
