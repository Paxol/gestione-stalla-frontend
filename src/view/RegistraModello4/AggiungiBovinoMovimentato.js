/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { FormControl, Grid, TextField, Autocomplete } from "@mui/material";
import { SuiInput } from "softui/SuiInput";
import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";
import { SelectOption, Select } from "components/Select";
import { SuiButton } from "softui/SuiButton";
import { useContextModello4 } from "./ContextModello4";
import { useContextBovini } from "./ContextBovini";
import { defaultBovino, validaBovino } from "./utils";

const InserisciBovinoInEntrata = ({ bovino, setBovino }) => (
  <>
    <Grid item xs={6} md={3}>
      <FormControl fullWidth>
        <SuiBox mb={1} ml={0.5}>
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Codice
          </SuiTypography>
        </SuiBox>
        <SuiInput
          type="text"
          name="aggiungi_codice"
          value={bovino.codice}
          onChange={({ target: { value } }) =>
            setBovino((prev) => ({
              ...prev,
              codice: value,
            }))
          }
        />
      </FormControl>
    </Grid>
    <Grid item xs={6} md={3}>
      <FormControl fullWidth>
        <SuiBox mb={1} ml={0.5}>
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Codice madre
          </SuiTypography>
        </SuiBox>
        <SuiInput
          type="text"
          name="lettura"
          value={bovino.madre}
          onChange={({ target: { value } }) =>
            setBovino((prev) => ({
              ...prev,
              madre: value,
            }))
          }
        />
      </FormControl>
    </Grid>
    <Grid item xs={6} md={3}>
      <FormControl fullWidth>
        <SuiBox mx={0.5}>
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Sesso
          </SuiTypography>
        </SuiBox>
        <Select
          value={bovino.sesso}
          onChange={(value) =>
            setBovino((prev) => ({
              ...prev,
              sesso: value,
            }))
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
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Data di nascita
          </SuiTypography>
        </SuiBox>
        <SuiInput
          type="date"
          name="data"
          value={bovino.dataNascita.toISOString().substring(0, 10)}
          onChange={({ target: { value } }) => {
            try {
              new Date(value).toISOString(); // Generate an error if the date is invalid

              setBovino((prev) => ({
                ...prev,
                dataNascita: new Date(value),
              }));
            } catch (e) {
              // Do nothing
            }
          }}
        />
      </FormControl>
    </Grid>
  </>
);

export const AggiungiBovinoMovimentato = () => {
  const [{ tipologia }] = useContextModello4();
  const { boviniMovimentati, boviniInStallaFiltrati } = useContextBovini();

  const [bovino, setBovino] = useState(defaultBovino);

  useEffect(() => {
    setBovino(defaultBovino);
  }, [tipologia]);

  const [isAggiungiBovinoValid, messaggioBovinoNonValido] = useMemo(() => {
    if (tipologia === 0) return [true, ""];

    let [valid, message] = validaBovino(bovino);

    if (valid) {
      valid =
        boviniMovimentati.get.findIndex((r) => r.codice === bovino.codice) ===
        -1;
      if (!valid) message = "È stato già aggiunto un bovino con questo codice";
    }

    return [valid, message];
  }, [bovino, boviniMovimentati.get, tipologia]);

  return (
    <>
      <SuiBox mb={2}>
        <SuiTypography variant="h3">Aggiungi bovino</SuiTypography>
      </SuiBox>
      <Grid container spacing={2}>
        {tipologia === 1 && (
          <InserisciBovinoInEntrata bovino={bovino} setBovino={setBovino} />
        )}
        {tipologia === 0 && (
          <Grid item xs="auto">
            <Autocomplete
              key={boviniInStallaFiltrati.length}
              disablePortal
              id="codici-in-stalla"
              options={boviniInStallaFiltrati}
              getOptionLabel={(c) => c.codice}
              onChange={(_, val) =>
                setBovino(
                  val !== null
                    ? {
                        ...val,
                        dataNascita: new Date(val.dataNascita),
                      }
                    : defaultBovino
                )
              }
              blurOnSelect
              sx={{
                width: 300,
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        )}
        <Grid item xs="auto">
          <SuiTypography variant="body2">
            {messaggioBovinoNonValido}
          </SuiTypography>
        </Grid>
        <Grid item xs>
          <Grid container justifyContent="flex-end">
            <Grid item xs="auto">
              <SuiButton
                variant="contained"
                color="info"
                disabled={!isAggiungiBovinoValid || bovino.codice === ""}
                onClick={() =>
                  boviniMovimentati.set((prev) => [...prev, bovino])
                }
              >
                Aggiungi
              </SuiButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
