import { useMemo, useState } from "react";

import { FormControl, Grid, TextField, Autocomplete, Box } from "@mui/material";

import { SuiInput } from "softui/SuiInput";
import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";
import { SuiButton } from "softui/SuiButton";

import { useSnackbar } from "notistack";
import { useQuery } from "hooks/useQuery";
import { request } from "utils/request";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";

const valida = (dati) => {
  let valid = dati.id && !Number.isNaN(dati.id) && dati.id !== 0;
  if (!valid) return [valid, "Bovino non valido"];

  valid =
    !Number.isNaN(Date.parse(dati.parto)) && dati.parto > dati.fecondazione;
  if (!valid) {
    return [valid, "Data non valida"];
  }

  return [valid, ""];
};

export const RegistraParto = () => {
  const { data: bovini, refresh: refreshBovini } = useQuery({
    action: "get-bovini-in-gravidanza",
    showErrorInSnackbar: true,
    defaultErrorMessage:
      "Errore nella ricezione dell'elenco dei bovini in gravidanza",
    defaultValue: [],
  });

  const [idFecondazione, setIdFecondazione] = useState(0);
  const [data, setData] = useState(new Date().toISOString().substring(0, 10));

  useCustomEventListener("data-invalidated", (invalid) => {
    if (invalid === "Fecondazione") refreshBovini();
  });

  const { enqueueSnackbar } = useSnackbar();

  const [valid, invalidMessage] = useMemo(() => {
    const selezione = bovini.find((b) => b.id === idFecondazione);
    return valida({
      id: idFecondazione,
      parto: data,
      fecondazione: selezione?.data,
    });
  }, [idFecondazione, data]);

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
          id: Number(idFecondazione),
          data,
        };

        request("registra-parto", {
          headers,
          body: JSON.stringify(reqData),
        }).then(({ status, error, message }) => {
          if (error) {
            enqueueSnackbar(message ?? "Si è verificato un errore, riprova", {
              variant: "error",
            });
          } else if (status === "ok") {
            enqueueSnackbar("Parto inserito con successo", {
              variant: "success",
            });

            setIdFecondazione();
            setData(new Date().toISOString().substring(0, 10));

            emitCustomEvent("data-invalidated", "Fecondazione");
          }
        });
      }}
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs="auto" sm>
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
              key={bovini}
              disablePortal
              id="codici-in-stalla"
              options={bovini}
              getOptionLabel={(c) =>
                `${c.codice} fecondata il ${c.data
                  .split("-")
                  .reverse()
                  .join("/")}`
              }
              onChange={(_, val) => setIdFecondazione(val && val.id)}
              blurOnSelect
              sx={{ minWidth: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs="auto" sm>
          <FormControl fullWidth>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Data
              </SuiTypography>
            </SuiBox>
            <SuiInput
              type="date"
              name="data"
              value={data}
              onChange={({ target: { value } }) => setData(value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} marginY={1} alignItems="baseline">
        <Grid item xs>
          <SuiTypography variant="body2">{invalidMessage}</SuiTypography>
        </Grid>
        <Grid item xs="auto">
          <SuiButton
            variant="contained"
            color="info"
            type="submit"
            disabled={!valid}
          >
            Registra parto
          </SuiButton>
        </Grid>
      </Grid>
    </Box>
  );
};
