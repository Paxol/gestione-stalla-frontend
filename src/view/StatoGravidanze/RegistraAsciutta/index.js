/* eslint-disable no-unused-vars */

import { useState } from "react";

import { FormControl, Grid, TextField, Autocomplete, Box } from "@mui/material";

import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";
import { SuiButton } from "softui/SuiButton";

import { useSnackbar } from "notistack";
import { useQuery } from "hooks/useQuery";
import { request } from "utils/request";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";

export const RegistraAsciutta = () => {
  const { data: bovini, refresh: refreshBovini } = useQuery({
    action: "get-bovini-da-asciugare",
    showErrorInSnackbar: true,
    defaultErrorMessage:
      "Errore nella ricezione dell'elenco dei bovini da asciugare",
    defaultValue: [],
  });

  const [fecondazione, setFecondazione] = useState(0);

  useCustomEventListener("data-invalidated", (invalid) => {
    if (invalid === "Fecondazione") refreshBovini();
  });

  const { enqueueSnackbar } = useSnackbar();

  const valid =
    fecondazione && !Number.isNaN(fecondazione) && fecondazione !== 0;

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        pb: 1,
      }}
      onSubmit={(e) => {
        e.preventDefault();

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const reqData = {
          id: Number(fecondazione),
        };

        request("registra-asciutta", {
          headers,
          body: JSON.stringify(reqData),
        }).then(({ status, error, message }) => {
          if (error) {
            enqueueSnackbar(message ?? "Si è verificato un errore, riprova", {
              variant: "error",
            });
          } else if (status === "ok") {
            enqueueSnackbar("Asciutta inserita con successo", {
              variant: "success",
            });

            setFecondazione(0);
            refreshBovini();

            emitCustomEvent("data-invalidated", "Fecondazione");
          }
        });
      }}
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm>
          <FormControl fullWidth>
            <SuiBox mx={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Bovino
              </SuiTypography>
            </SuiBox>
            <Autocomplete
              disablePortal
              id="codici-in-stalla"
              style={{ margin: 7 }}
              options={bovini}
              getOptionLabel={(c) =>
                `${c.codice} fecondata il ${c.data
                  .split("-")
                  .reverse()
                  .join("/")}`
              }
              onChange={(_, val) => setFecondazione(val && Number(val.id))}
              blurOnSelect
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} marginY={1} alignItems="baseline">
        <Grid item xs>
          <SuiTypography variant="body2">
            {!valid && "Bovino non valido"}
          </SuiTypography>
        </Grid>
        <Grid item xs="auto">
          <SuiButton
            variant="contained"
            color="info"
            type="submit"
            disabled={!valid}
          >
            Registra asciutta
          </SuiButton>
        </Grid>
      </Grid>
    </Box>
  );
};
