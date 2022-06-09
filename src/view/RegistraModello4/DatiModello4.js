import { FormControl, Grid, Checkbox } from "@mui/material";
import { SuiInput } from "softui/SuiInput";
import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";
import { SelectOption, Select } from "components/Select";
import { useContextModello4 } from "./ContextModello4";

export const DatiModello4 = () => {
  const [{ tipologia, data, serie, numero, isCartaceo }, setModello4] =
    useContextModello4();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <SuiBox mx={0.5}>
            <SuiTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Tipologia
            </SuiTypography>
          </SuiBox>
          <Select
            name="tipologia"
            value={tipologia}
            onChange={(value) =>
              setModello4((prev) => ({ ...prev, tipologia: value }))
            }
          >
            <SelectOption value={0}>Uscita</SelectOption>
            <SelectOption value={1}>Entrata</SelectOption>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
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
            onChange={({ target: { value } }) =>
              setModello4((prev) => ({ ...prev, data: value }))
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={5} sm={5} md={2}>
        <FormControl fullWidth>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Serie
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type="number"
            name="serie"
            value={serie}
            onChange={({ target: { value } }) =>
              setModello4((prev) => ({ ...prev, serie: value }))
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={5} md={2}>
        <FormControl fullWidth>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Numero
            </SuiTypography>
          </SuiBox>
          <SuiInput
            type="number"
            name="numero"
            value={numero}
            onChange={({ target: { value } }) =>
              setModello4((prev) => ({ ...prev, numero: value }))
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={2} md={1}>
        <FormControl fullWidth>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Cartaceo
            </SuiTypography>
          </SuiBox>
          <SuiBox pt="2px">
            <Checkbox
              name="cartaceo"
              checked={isCartaceo}
              onChange={(_, value) =>
                setModello4((prev) => ({ ...prev, isCartaceo: value }))
              }
            />
          </SuiBox>
        </FormControl>
      </Grid>
    </Grid>
  );
};
