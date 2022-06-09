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
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import { SuiBox } from "softui/SuiBox";
// import { SuiTypography } from "softui/SuiTypography";

// Soft UI Dashboard React example components
import { DashboardLayout } from "layout/DashboardLayout";

// Dashboard layout components
import { MenuCard } from "components/MenuCard";
import { Notifications } from "components/Notifications";

import { features } from "features";

export const Dashboard = () => (
  <DashboardLayout>
    <SuiBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xxl={4}>
              <MenuCard
                title="Stato gravidanze"
                description="Visualizza lo stato delle gravidanze"
                href="/stato-gravidanze"
              />
            </Grid>

            <Grid item xs={12} sm={6} xxl={4}>
              <MenuCard
                title="Registra capo"
                description="Inserisci un capo nato in azienda"
                href="/registra-nascita"
              />
            </Grid>

            <Grid item xs={12} sm={6} xxl={4}>
              <MenuCard
                title="Registra Modello 4"
                description="Inserisci un modello 4 in entrata o uscita"
                href="/registra-modello-4"
              />
            </Grid>

            {/* {features.fecondazione && (
              <Grid item xs={12} sm={6} xxl={4}>
                <MenuCard
                  title="Registra fecondazione"
                  description="Inserisci una fecondazione"
                  href="/registra-fecondazione"
                />
              </Grid>
            )}
            {features.gravidanza && (
              <Grid item xs={12} sm={6} xxl={4}>
                <MenuCard
                  title="Conferma fecondazione"
                  description="Segna una vacca come gravida"
                  href="/conferma-fecondazione"
                />
              </Grid>
            )}
            {features.asciutta && (
              <Grid item xs={12} sm={6} xxl={4}>
                <MenuCard
                  title="Registra asciutta"
                  description="Segna una vacca come messa in asciutta"
                  href="/registra-asciutta"
                />
              </Grid>
            )}
            {features.nascita && (
              <Grid item xs={12} sm={6} xxl={4}>
                <MenuCard
                  title="Registra parto"
                  description="Registra un parto"
                  href="/registra-parto"
                />
              </Grid>
            )}
            {features.aggiungiAnimale && (
              <Grid item xs={12} sm={6} xxl={4}>
                <MenuCard
                  title="Registra capo"
                  description="Inserisci un capo nato in azienda"
                  href="/registra-nascita"
                />
              </Grid>
            )}
            {features.registraModello4 && (

            )} */}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          {features.notifiche && <Notifications />}
        </Grid>
      </Grid>
    </SuiBox>
  </DashboardLayout>
);
