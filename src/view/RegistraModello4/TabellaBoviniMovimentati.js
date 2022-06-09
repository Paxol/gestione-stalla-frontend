import { SuiTypography } from "softui/SuiTypography";
import { SuiBox } from "softui/SuiBox";
import { DataGrid } from "@mui/x-data-grid";
import { useContextBovini } from "./ContextBovini";

const dataGridColumns = [
  {
    field: "codice",
    headerName: "Codice",
    width: 160,
    editable: true,
    preProcessEditCellProps: (params) => {
      const hasError = params.props.value.length !== 14;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: "madre",
    headerName: "Codice madre",
    width: 160,
    editable: true,
    preProcessEditCellProps: (params) => {
      const hasError = params.props.value.length !== 14;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: "dataNascita",
    headerName: "Data nascita",
    width: 140,
    type: "date",
    editable: true,
    preProcessEditCellProps: (params) => {
      const date = params.props.value;
      const hasError = date.toISOString() > new Date().toISOString();
      return { ...params.props, error: hasError };
    },
  },
  {
    field: "sesso",
    headerName: "Sesso",
    width: 80,
    type: "singleSelect",
    valueOptions: ["M", "F"],
    editable: true,
    preProcessEditCellProps: (params) => {
      const hasError = params.props.value !== "M" && params.props.value !== "F";
      return { ...params.props, error: hasError };
    },
  },
];

export const TabellaBoviniMovimentati = () => {
  const { boviniMovimentati } = useContextBovini();

  return (
    <div>
      <SuiBox mb={2}>
        <SuiTypography variant="h3">Bovini movimentati</SuiTypography>
      </SuiBox>

      <DataGrid
        sx={{
          height: "400px",
        }}
        columns={dataGridColumns}
        rows={boviniMovimentati.get}
        onCellEditCommit={(change) => {
          boviniMovimentati.set(
            boviniMovimentati.get.map((r) =>
              r.codice !== change.id
                ? r
                : {
                    ...r,
                    [change.field]: change.value,
                  }
            )
          );
        }}
        getRowId={(el) => el.codice}
      />
    </div>
  );
};
