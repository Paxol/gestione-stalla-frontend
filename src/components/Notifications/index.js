/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// Soft UI Dashboard React components
import { SuiBox } from "softui/SuiBox";
import { SuiTypography } from "softui/SuiTypography";

// Soft UI Dashboard React example components
import { NotificationsItem } from "components/NotificationsItem";
import { useQuery } from "hooks/useQuery";
import { dateFormatter } from "utils/dateFormatter";

export const Notifications = () => {
  const { data: daFecondare, loading: loadingDaFecondare } = useQuery({
    action: "get-notifica-bovini-da-fecondare",
    showErrorInSnackbar: true,
    defaultErrorMessage:
      "Errore nella ricezione dell'elenco dei bovini da fecondare",
    defaultValue: [],
  });

  const {
    data: daControllareFecondazione,
    loading: loadingDaControllareFecondazione,
  } = useQuery({
    action: "get-notifica-fecondazioni-da-confermare",
    showErrorInSnackbar: true,
    defaultErrorMessage:
      "Errore nella ricezione dell'elenco dei bovini da controllare",
    defaultValue: [],
  });

  const { data: daAsciugare, loading: loadingDaAsciugare } = useQuery({
    action: "get-notifica-bovini-da-asciugare",
    showErrorInSnackbar: true,
    defaultErrorMessage:
      "Errore nella ricezione dell'elenco dei bovini da asciugare",
    defaultValue: [],
  });

  const { data: inTermineGravidanza, loading: loadingInTermineGravidanza } =
    useQuery({
      action: "get-notifica-bovini-termine-gravidanza",
      showErrorInSnackbar: true,
      defaultErrorMessage:
        "Errore nella ricezione dell'elenco dei bovini a termine di gravidanza",
      defaultValue: [],
    });

  const loading =
    loadingDaAsciugare ||
    loadingDaControllareFecondazione ||
    loadingDaFecondare ||
    loadingInTermineGravidanza;

  return (
    <Card className="h-100">
      <SuiBox py={3} px={3}>
        <SuiTypography variant="h4" fontWeight="medium">
          Notifiche
        </SuiTypography>
        {daFecondare.length > 0 && (
          <SuiBox pt={2}>
            <SuiTypography variant="h6" fontWeight="medium">
              Prossime fecondazioni
            </SuiTypography>
            <List>
              {daFecondare.map((vacca) => (
                <ListItem key={vacca}>
                  <NotificationsItem
                    variant="litte-big"
                    little={vacca.codice.substring(0, 10)}
                    big={vacca.codice.substring(10)}
                    desc={`Nata il ${dateFormatter(
                      new Date(vacca.dataNascita)
                    )}`}
                  />
                </ListItem>
              ))}
            </List>
          </SuiBox>
        )}

        {daControllareFecondazione.length > 0 && (
          <SuiBox pt={2}>
            <SuiTypography variant="h6" fontWeight="medium">
              Prossimi controlli delle fecondazioni
            </SuiTypography>
            <List>
              {daControllareFecondazione.map((vacca) => (
                <ListItem key={vacca}>
                  <NotificationsItem
                    variant="litte-big"
                    little={vacca.codice.substring(0, 10)}
                    big={vacca.codice.substring(10)}
                    desc={`Fecondata il ${dateFormatter(new Date(vacca.data))}`}
                  />
                </ListItem>
              ))}
            </List>
          </SuiBox>
        )}

        {daAsciugare.length > 0 && (
          <SuiBox pt={2}>
            <SuiTypography variant="h6" fontWeight="medium">
              Prossime asciutte
            </SuiTypography>
            <List>
              {daAsciugare.map((vacca) => (
                <ListItem key={vacca}>
                  <NotificationsItem
                    variant="litte-big"
                    little={vacca.codice.substring(0, 10)}
                    big={vacca.codice.substring(10)}
                    desc={`Fecondata il ${dateFormatter(new Date(vacca.data))}`}
                  />
                </ListItem>
              ))}
            </List>
          </SuiBox>
        )}

        {inTermineGravidanza.length > 0 && (
          <SuiBox pt={2}>
            <SuiTypography variant="h6" fontWeight="medium">
              Prossime nascite
            </SuiTypography>
            <List>
              {inTermineGravidanza.map((vacca) => {
                const dataParto = new Date(vacca.data);
                dataParto.setDate(dataParto.getDate() + 280); // 280 giorni = durata gravidanza

                return (
                  <ListItem key={vacca}>
                    <NotificationsItem
                      variant="litte-big"
                      little={vacca.codice.substring(0, 10)}
                      big={vacca.codice.substring(10)}
                      desc={`${dateFormatter(dataParto)}`}
                      estimation
                    />
                  </ListItem>
                );
              })}
            </List>
          </SuiBox>
        )}

        {daFecondare.length === 0 &&
          daControllareFecondazione.length === 0 &&
          daAsciugare.length === 0 &&
          inTermineGravidanza.length === 0 && (
            <SuiTypography sx={{ pt: 2 }} variant="h6" fontWeight="medium">
              {loading ? "Caricamento..." : "Non ci sono notifiche"}
            </SuiTypography>
          )}
      </SuiBox>
    </Card>
  );
};
