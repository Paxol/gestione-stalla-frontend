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

// Soft UI Dashboard PRO React base styles
import { colors } from "assets/theme/base/colors";
import { boxShadows } from "assets/theme/base/boxShadows";
import { borders } from "assets/theme/base/borders";

const { white } = colors;
const { xxl } = boxShadows;
const { borderRadius } = borders;

export const tableContainer = {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: xxl,
      borderRadius: borderRadius.xl,
    },
  },
};
