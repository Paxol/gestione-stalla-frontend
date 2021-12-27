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

export const Dashboard = () => (
  <DashboardLayout>
    <SuiBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <MenuCard
                title="Registra consegna latte"
                description="Inserisci il latte consegnato oggi"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MenuCard
                title="Registra fecondazione"
                description="Inserisci una fecondazione"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MenuCard
                title="Registra gravidanza"
                description="Segna una vacca come gravida"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MenuCard
                title="Registra aciutta"
                description="Segna una vacca come messa in asciutta"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MenuCard
                title="Inserisci capo"
                description="Inserisci un nuovo capo, nato o acquistato"
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MenuCard
                title="Rimuovi capo"
                description="Rimuovi un nuovo capo venduto"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Notifications />
        </Grid>
      </Grid>
    </SuiBox>
  </DashboardLayout>
);
