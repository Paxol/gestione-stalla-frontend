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

import { useEffect } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard PRO React themes
import { theme } from "assets/theme";

// Soft UI Dashboard PRO React routes
import { routes } from "routes";
import { OnlineStatusProvider } from "utils/OnlineStatus";
import { SnackbarProvider } from "notistack";

export const App = () => {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            component={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <SnackbarProvider maxSnack={3}>
      <OnlineStatusProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </ThemeProvider>
      </OnlineStatusProvider>
    </SnackbarProvider>
  );
};
