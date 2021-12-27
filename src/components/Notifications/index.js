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

const fecondare = ["IT123456789012", "IT345678901234", "IT567890123456"];
const prossimeasciutta = ["IT678901234567", "IT890123456789", "IT012345678901"];
const prossimiparti = ["IT234567890123", "IT456789012345", "IT678901234567"];

export const Notifications = () => (
  <Card className="h-100">
    <SuiBox py={3} px={3}>
      <SuiTypography variant="h4" fontWeight="medium">
        Notifiche
      </SuiTypography>
      <SuiBox pt={2}>
        <SuiTypography variant="h6" fontWeight="medium">
          Prossime vacche da fecondare
        </SuiTypography>
        <List>
          {fecondare.map((vacca) => (
            <ListItem key={vacca}>
              <NotificationsItem
                variant="litte-big"
                little={vacca.substring(0, 10)}
                big={vacca.substring(10)}
                date={new Date()}
              />
            </ListItem>
          ))}
        </List>

        <SuiBox pt={2}>
          <SuiTypography variant="h6" fontWeight="medium">
            Prossime vacche da mettere in asciutta
          </SuiTypography>
          <List>
            {prossimeasciutta.map((vacca) => (
              <ListItem key={vacca}>
                <NotificationsItem
                  variant="litte-big"
                  little={vacca.substring(0, 10)}
                  big={vacca.substring(10)}
                  date={new Date()}
                />
              </ListItem>
            ))}
          </List>
        </SuiBox>

        <SuiBox pt={2}>
          <SuiTypography variant="h6" fontWeight="medium">
            Vacche prossime al parto
          </SuiTypography>
          <List>
            {prossimiparti.map((vacca) => (
              <ListItem key={vacca}>
                <NotificationsItem
                  variant="litte-big"
                  little={vacca.substring(0, 10)}
                  big={vacca.substring(10)}
                  date={new Date()}
                  estimation
                />
              </ListItem>
            ))}
          </List>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  </Card>
);
