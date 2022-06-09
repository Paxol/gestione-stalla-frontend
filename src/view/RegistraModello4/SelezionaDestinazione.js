/* eslint-disable react/prop-types */
import { FormControl, Grid } from "@mui/material";
import { SuiInput } from "softui/SuiInput";
import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";

import { SelectOption, Select } from "components/Select";
import { useContextModello4 } from "./ContextModello4";

export const SelezionaDestinazione = ({ codiciStalle }) => {
  const [{ tipologia, destinazione, nuovoLuogo }, setModello4] =
    useContextModello4();

  const luogo = tipologia === 0 ? "destinazione" : "provenienza";
  return (
    <>
      <SuiBox mb={2}>
        <SuiTypography variant="h3">Seleziona {luogo}</SuiTypography>
      </SuiBox>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <SuiBox mx={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Destinazione
              </SuiTypography>
            </SuiBox>
            <Select
              value={destinazione}
              onChange={(value) =>
                setModello4((prev) => ({ ...prev, destinazione: value }))
              }
              style={{ minWidth: 150, width: "100%", maxWidth: 350 }}
            >
              <SelectOption value={0}>Aggiungi nuova {luogo}</SelectOption>
              {codiciStalle.map((c) => (
                <SelectOption key={c.id} value={c.id}>
                  {c.codice} - {c.descrizione}
                </SelectOption>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {destinazione === 0 && (
          <>
            <Grid item xs={12} sm={6}>
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
                  name="lettura"
                  value={nuovoLuogo.codice}
                  onChange={({ target: { value } }) =>
                    setModello4((prev) => ({
                      ...prev,
                      nuovoLuogo: { ...prev.nuovoLuogo, codice: value },
                    }))
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <SuiBox mb={1} ml={0.5}>
                  <SuiTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Descrizione
                  </SuiTypography>
                </SuiBox>
                <SuiInput
                  type="text"
                  name="lettura"
                  value={nuovoLuogo.descrizione}
                  onChange={({ target: { value } }) =>
                    setModello4((prev) => ({
                      ...prev,
                      nuovoLuogo: { ...prev.nuovoLuogo, descrizione: value },
                    }))
                  }
                />
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
