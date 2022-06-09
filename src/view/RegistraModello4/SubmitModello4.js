import { useMemo } from "react";

import { useSnackbar } from "notistack";
import { Grid } from "@mui/material";
import { SuiTypography } from "softui/SuiTypography";
import { SuiButton } from "softui/SuiButton";
import { request } from "utils/request";
import { useContextModello4 } from "./ContextModello4";
import { useContextBovini } from "./ContextBovini";

import { validaLuogo } from "./utils";

// eslint-disable-next-line react/prop-types
export const SubmitModello4 = ({ handleDataInserted }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [
    {
      tipologia,
      data,
      serie,
      numero,
      isCartaceo,

      destinazione,
      nuovoLuogo,
    },
    // eslint-disable-next-line no-unused-vars
    _,
    resetModello4,
  ] = useContextModello4();

  const {
    boviniMovimentati: { get: boviniMovimentati },
  } = useContextBovini();

  const [modelloValido, messaggioModelloNonValido] = useMemo(() => {
    let valid = tipologia === 0 || tipologia === 1;
    if (!valid) {
      return [valid, "Tipologia non valida"];
    }

    valid = boviniMovimentati.length > 0;
    if (!valid) {
      return [valid, "Deve essere selezionato almeno un bovino"];
    }

    valid = !Number.isNaN(Date.parse(data));
    if (!valid) {
      return [valid, "Data non valida"];
    }

    valid = Number(serie) > 0;
    if (!valid) {
      return [valid, "Serie non valida"];
    }

    valid = Number(numero) > 0;
    if (!valid) {
      return [valid, "Numero non valido"];
    }

    valid = typeof isCartaceo === "boolean";
    if (!valid) {
      return [valid, 'Campo "Cartaceo" non valido'];
    }

    valid = !Number.isNaN(Number(destinazione));
    if (!valid) {
      return [valid, "Destinazione non valida"];
    }

    if (destinazione === 0) {
      return validaLuogo(nuovoLuogo);
    }

    return [valid, ""];
  }, [
    tipologia,
    data,
    serie,
    numero,
    isCartaceo,
    destinazione,
    boviniMovimentati,
    nuovoLuogo,
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <SuiTypography variant="body2">
          {messaggioModelloNonValido}
        </SuiTypography>
      </Grid>
      <Grid item xs="auto">
        <Grid container justifyContent="flex-end">
          <Grid item xs="auto">
            <SuiButton
              variant="contained"
              color="info"
              type="submit"
              disabled={!modelloValido}
              onClick={() => {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const capi =
                  tipologia === 0
                    ? boviniMovimentati.map((b) => b.codice)
                    : boviniMovimentati.map((b) => ({
                        ...b,
                        dataNascita: b.dataNascita
                          .toISOString()
                          .substring(0, 10),
                      }));
                const reqLuogo =
                  destinazione === 0 ? nuovoLuogo : Number(destinazione);
                const reqData = {
                  tipologia,
                  data,
                  serie: Number(serie),
                  numero: Number(numero),
                  cartaceo: isCartaceo,
                  nuovoLuogo: destinazione === 0,
                  luogo: reqLuogo,
                  capi,
                };
                request("registra-modello-4", {
                  headers,
                  body: JSON.stringify(reqData),
                }).then(({ status, error, message }) => {
                  if (error) {
                    enqueueSnackbar(
                      message ?? "Si è verificato un errore, riprova",
                      {
                        variant: "error",
                      }
                    );
                  } else if (status === "ok") {
                    enqueueSnackbar("Modello 4 inserito con successo", {
                      variant: "success",
                    });

                    resetModello4();
                    if (handleDataInserted) handleDataInserted();
                  }
                });
              }}
            >
              Registra modello 4
            </SuiButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
