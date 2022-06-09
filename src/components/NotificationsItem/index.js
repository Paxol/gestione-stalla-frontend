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

// @mui material components
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Soft UI Dashboard React components
import { SuiBox } from "softui/SuiBox";
import { SuiTypography } from "softui/SuiTypography";

export const NotificationsItem = ({
  variant,
  little,
  big,
  text,
  desc,
  estimation,
}) => {
  let children = null;

  switch (variant) {
    case "litte-big":
      children = (
        <>
          <SuiTypography
            component="span"
            fontWeight="light"
            style={{ lineHeight: 1 }}
          >
            {little}
          </SuiTypography>
          <SuiTypography
            component="span"
            fontWeight="bold"
            style={{ lineHeight: 1 }}
          >
            {big}
          </SuiTypography>
          <SuiTypography
            variant="caption"
            fontWeight="medium"
            component="div"
            style={{ lineHeight: 1 }}
          >
            {estimation && "Stima: "}
            {desc}
          </SuiTypography>
        </>
      );
      break;

    default:
      children = text;
      break;
  }

  return (
    <>
      <SuiBox px={1}>
        <FiberManualRecordIcon style={{ width: ".7em", height: ".7em" }} />
      </SuiBox>
      <SuiBox py={1}>{children}</SuiBox>
    </>
  );
};

NotificationsItem.defaultProps = {
  variant: "text",
  little: "",
  big: "",
  text: "",
  desc: "",
  estimation: false,
};

// Typechecking props for the DashboardLayout
NotificationsItem.propTypes = {
  variant: PropTypes.oneOf(["litte-big", "text"]),
  little: PropTypes.string,
  big: PropTypes.string,
  text: PropTypes.string,
  desc: PropTypes.string,
  estimation: PropTypes.bool,
};
