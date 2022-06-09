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

import { useState } from "react";
import { useLocation, Redirect } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import { routes } from "routes";

import PWAInstallerPrompt from "react-pwa-installer-prompt";

// Soft UI Dashboard PRO React components
import { Container, Grid, IconButton } from "@mui/material";
import { SuiBox } from "softui/SuiBox";
import { SuiTypography } from "softui/SuiTypography";
import { SuiButton } from "softui/SuiButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DashboardLayout = ({ children, grow }) => {
  const location = useLocation();
  const [redir, setRedir] = useState();

  if (redir) {
    return <Redirect to={redir} />;
  }

  const route = routes.find(({ route: r }) => r === location.pathname);

  const title = route?.title || "Gestione stalla";
  const childrenStyle = grow ? { flexGrow: 1 } : undefined;

  return (
    <Container
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SuiBox mt={3}>
        <Grid container spacing={2} alignItems="center">
          {!route?.home && (
            <Grid item flex="none">
              <IconButton
                aria-label="go back"
                color="dark"
                onClick={() => setRedir("/")}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item flex={1}>
            <SuiTypography variant="h1">{title}</SuiTypography>
          </Grid>
          <Grid item flex="none">
            <PWAInstallerPrompt
              render={({ onClick }) => (
                <SuiButton type="button" onClick={onClick}>
                  Installa
                </SuiButton>
              )}
            />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox
        sx={() => ({
          position: "relative",
        })}
        style={childrenStyle}
      >
        {children}
      </SuiBox>
      <footer style={{ marginTop: "auto" }}>
        {process.env.REACT_APP_NAME} - v{process.env.REACT_APP_VERSION}
      </footer>
    </Container>
  );
};

// Typechecking props for the DashboardLayout
DashboardLayout.defaultProps = {
  grow: false,
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  grow: PropTypes.bool,
};
