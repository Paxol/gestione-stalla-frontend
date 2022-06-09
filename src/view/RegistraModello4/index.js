/* eslint-disable no-unused-vars */

import { DashboardLayout } from "layout/DashboardLayout";

import { SuiBox } from "softui/SuiBox";

import { useQuery } from "hooks/useQuery";
import { ProviderModello4 } from "./ContextModello4";
import { DatiModello4 } from "./DatiModello4";
import { ProviderBovini } from "./ContextBovini";
import { AggiungiBovinoMovimentato } from "./AggiungiBovinoMovimentato";
import { TabellaBoviniMovimentati } from "./TabellaBoviniMovimentati";
import { SelezionaDestinazione } from "./SelezionaDestinazione";
import { SubmitModello4 } from "./SubmitModello4";

export const RegistraModello4 = () => {
  const { data: boviniInStalla, refresh: refreshBovini } = useQuery({
    action: "get-codici-bovini-in-stalla",
    showErrorInSnackbar: true,
    defaultErrorMessage: "Errore nella ricezione dell'elenco dei bovini",
    defaultValue: [],
  });

  const { data: codiciStalle, refresh: refreshStalle } = useQuery({
    action: "get-codici-stalle",
    showErrorInSnackbar: true,
    defaultErrorMessage:
      "Errore nella ricezione dell'elenco dei codici delle stalle",
    defaultValue: [],
  });

  return (
    <DashboardLayout grow>
      <SuiBox
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          paddingBottom: "2em",
        }}
      >
        <ProviderModello4>
          <ProviderBovini boviniInStalla={boviniInStalla}>
            <SuiBox mb={2}>
              <DatiModello4 />
            </SuiBox>

            <SuiBox mb={2}>
              <TabellaBoviniMovimentati />
            </SuiBox>

            <SuiBox mb={2}>
              <AggiungiBovinoMovimentato />
            </SuiBox>

            <SuiBox mb={2}>
              <SelezionaDestinazione codiciStalle={codiciStalle} />
            </SuiBox>

            <SuiBox>
              <SubmitModello4
                handleDataInserted={() => {
                  refreshBovini();
                  refreshStalle();
                }}
              />
            </SuiBox>
          </ProviderBovini>
        </ProviderModello4>
      </SuiBox>
    </DashboardLayout>
  );
};
