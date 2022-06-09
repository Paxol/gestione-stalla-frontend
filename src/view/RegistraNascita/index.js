import { useEffect, useMemo, useState } from "react";

import { FormControl, Grid, TextField, Autocomplete } from "@mui/material";

import { DashboardLayout } from "layout/DashboardLayout";

import { SuiInput } from "softui/SuiInput";
import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";
import { SuiButton } from "softui/SuiButton";

import { useSnackbar } from "notistack";
import { useQuery } from "hooks/useQuery";
import { request } from "utils/request";
import { Select, SelectOption } from "components/Select";

const defaultBovino = {
  codice: null,
  sesso: "F",
  dataNascita: null,
};

const valida = (dati) => {
  let valid = dati.idParto && !Number.isNaN(dati.idParto) && dati.idParto !== 0;
  if (!valid) return [valid, "Madre non valida"];

  valid = typeof dati.codice === "string" && dati.codice.length === 14;
  if (!valid) {
    return [valid, "Codice non valido"];
  }

  valid =
    typeof dati.sesso === "string" &&
    (dati.sesso === "M" || dati.sesso === "F");
  if (!valid) {
    return [valid, "Sesso non valido"];
  }

  valid = !Number.isNaN(Date.parse(dati.dataNascita));
  if (!valid) {
    return [valid, "Data non valida"];
  }

  return [valid, ""];
};

export const RegistraNascita = () => {
  const { data: nascite, refresh: refreshNascite } = useQuery({
    action: "get-nascite-non-registrate",
    showErrorInSnackbar: true,
    defaultErrorMessage: "Errore nella ricezione delle nascite non registrate",
    defaultValue: [],
  });

  const [parto, setParto] = useState();
  const [bovino, setBovino] = useState(defaultBovino);

  useEffect(() => {
    if (parto) {
      setBovino((prev) => ({ ...prev, dataNascita: parto.data }));
    }
  }, [parto]);

  const { enqueueSnackbar } = useSnackbar();

  const [valid, invalidMessage] = useMemo(
    () =>
      valida({
        idParto: parto?.id,
        ...bovino,
      }),
    [parto, bovino]
  );

  return (
    <DashboardLayout grow>
      <form
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          paddingBottom: "2em",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          const headers = new Headers();
          headers.append("Content-Type", "application/json");

          const reqData = {
            idParto: parto && Number(parto.id),
            codiceMadre: parto?.codiceMadre,
            ...bovino,
          };

          request("registra-nascita", {
            headers,
            body: JSON.stringify(reqData),
          }).then(({ status, error, message }) => {
            if (error) {
              enqueueSnackbar(message ?? "Si è verificato un errore, riprova", {
                variant: "error",
              });
            } else if (status === "ok") {
              enqueueSnackbar("Nascita inserito con successo", {
                variant: "success",
              });

              setParto();
              setBovino(defaultBovino);
              refreshNascite();
            }
          });
        }}
      >
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs="auto">
            <FormControl fullWidth>
              <SuiBox mx={0.5}>
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Madre
                </SuiTypography>
              </SuiBox>
              <Autocomplete
                key={nascite}
                disablePortal
                id="codici-in-stalla"
                options={nascite}
                getOptionLabel={(c) =>
                  `${c.codiceMadre} con parto il ${c.data
                    .split("-")
                    .reverse()
                    .join("/")}`
                }
                onChange={(_, val) => setParto(val)}
                blurOnSelect
                sx={{ minWidth: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Codice
                </SuiTypography>
              </SuiBox>
              <SuiInput
                type="text"
                name="aggiungi_codice"
                value={bovino.codice}
                onChange={({ target: { value } }) =>
                  setBovino((prev) => ({ ...prev, codice: value }))
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <SuiBox mx={0.5}>
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Sesso
                </SuiTypography>
              </SuiBox>
              <Select
                value={bovino.sesso}
                onChange={(value) =>
                  setBovino((prev) => ({ ...prev, sesso: value }))
                }
              >
                <SelectOption value="F">F</SelectOption>
                <SelectOption value="M">M</SelectOption>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Data di nascita
                </SuiTypography>
              </SuiBox>
              <SuiInput
                type="date"
                name="data"
                value={bovino.dataNascita}
                onChange={({ target: { value } }) =>
                  setBovino((prev) => ({
                    ...prev,
                    dataNascita: value,
                  }))
                }
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
              Registra nascita
            </SuiButton>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};
