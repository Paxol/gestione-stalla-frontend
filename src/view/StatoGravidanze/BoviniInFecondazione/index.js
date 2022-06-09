import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useQuery } from "hooks/useQuery";
import React from "react";
import { useCustomEventListener } from "react-custom-events";

export const BoviniInFecondazione = () => {
  const { data: bovini, refresh: refreshBovini } = useQuery({
    action: "get-bovini-in-fecondazione",
    showErrorInSnackbar: true,
    defaultErrorMessage: "Errore nella ricezione dell'elenco dei bovini",
    defaultValue: [],
  });

  useCustomEventListener("data-invalidated", (invalid) => {
    if (invalid === "Fecondazione") refreshBovini();
  });

  return (
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableBody>
        <TableRow sx={{ fontWeight: 600 }}>
          <TableCell>Codice</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Riuscita</TableCell>
          <TableCell>In asciutta</TableCell>
        </TableRow>
        {bovini.map((row) => (
          <TableRow
            key={row.codice}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.codice}</TableCell>
            <TableCell>{row.data.split("-").reverse().join("/")}</TableCell>
            <TableCell>{row.riuscita === "1" ? "Si" : "-"}</TableCell>
            <TableCell>{row.inAsciutta === "1" ? "Si" : "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
