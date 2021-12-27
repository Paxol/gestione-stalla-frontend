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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useMediaQuery, useTheme } from "@mui/material";

// Soft UI Dashboard PRO React components
import { SuiBox } from "softui/SuiBox";
import { SuiTypography } from "softui/SuiTypography";

export const MenuCard = ({ bgColor, title, description }) => {
  let pt = 2;

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  if (md) pt += 2;
  if (lg) pt += 4;

  return (
    <a href="#registra">
      <Card style={{ height: "100%" }}>
        <SuiBox bgColor={bgColor} variant="gradient">
          <SuiBox px={4} py={2}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <SuiBox pt={pt} lineHeight={1}>
                  <SuiTypography
                    variant="h5"
                    fontWeight="bold"
                    color={bgColor === "white" ? "dark" : "white"}
                  >
                    {title}
                  </SuiTypography>
                </SuiBox>
                <SuiBox pt={2} lineHeight={1}>
                  <SuiTypography
                    variant="button"
                    color={bgColor === "white" ? "text" : "white"}
                    opacity={bgColor === "white" ? 1 : 0.7}
                  >
                    {description}
                  </SuiTypography>
                </SuiBox>
              </Grid>
            </Grid>
          </SuiBox>
        </SuiBox>
      </Card>
    </a>
  );
};

// Setting default values for the props of MenuCard
MenuCard.defaultProps = {
  bgColor: "white",
  title: "",
  description: "",
};

// Typechecking props for the MenuCard
MenuCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
};
