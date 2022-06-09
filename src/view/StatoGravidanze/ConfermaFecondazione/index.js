import { useState } from "react";

import { FormControl, Grid, TextField, Autocomplete, Box } from "@mui/material";

import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";
import { SelectOption, Select } from "components/Select";
import { SuiButton } from "softui/SuiButton";

import { useSnackbar } from "notistack";
import { useQuery } from "hooks/useQuery";
import { request } from "utils/request";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";

export const ConfermaFecondazione = () => {
  const { data: bovini, refresh: refreshBovini } = useQuery({
    action: "get-fecondazioni-da-confermare",
    showErrorInSnackbar: true,
    defaultErrorMessage:
      "Errore nella ricezione dell'elenco dei bovini da fecondare",
    defaultValue: [],
  });

  const [fecondazione, setFecondazione] = useState(0);
  const [feconda, setFeconda] = useState(1);

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
          riuscita: feconda,
        };

        request("conferma-fecondazione", {
          headers,
          body: JSON.stringify(reqData),
        }).then(({ status, error, message }) => {
          if (error) {
            enqueueSnackbar(message ?? "Si è verificato un errore, riprova", {
              variant: "error",
            });
          } else if (status === "ok") {
            enqueueSnackbar("Fecondazione inserita con successo", {
              variant: "success",
            });

            setFecondazione(0);
            setFeconda(1);

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
        <Grid item xs={12} sm>
          <FormControl fullWidth>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Fecondazione riuscita
              </SuiTypography>
            </SuiBox>
            <Select name="feconda" value={feconda} onChange={setFeconda}>
              <SelectOption value={1}>Si</SelectOption>
              <SelectOption value={0}>No</SelectOption>
            </Select>
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
            Registra esito
          </SuiButton>
        </Grid>
      </Grid>
    </Box>
  );
};
