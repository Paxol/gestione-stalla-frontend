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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import { Container } from "@mui/material";
import { SuiBox } from "softui/SuiBox";
import { SuiTypography } from "softui/SuiTypography";

export const DashboardLayout = ({ children }) => (
  <Container>
    <SuiBox mt={3}>
      <SuiTypography variant="h1">Gestione stalla</SuiTypography>
    </SuiBox>
    <SuiBox
      sx={() => ({
        position: "relative",
      })}
    >
      {children}
    </SuiBox>
  </Container>
);

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
