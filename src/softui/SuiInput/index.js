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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for SuiInput
import { SuiInputRoot } from "softui/SuiInput/SuiInputRoot";
import { SuiInputWithIconRoot } from "softui/SuiInput/SuiInputWithIconRoot";
import { SuiInputIconBoxRoot } from "softui/SuiInput/SuiInputIconBoxRoot";

export const SuiInput = forwardRef(
  ({ size, append, error, success, disabled, ...rest }, ref) => {
    let template;
    const iconDirection = append.direction;

    if (append.component && append.direction === "left") {
      template = (
        <SuiInputWithIconRoot
          ref={ref}
          ownerState={{ error, success, disabled }}
        >
          <SuiInputIconBoxRoot ownerState={{ size }}>
            {append.component}
          </SuiInputIconBoxRoot>
          <SuiInputRoot
            {...rest}
            ownerState={{
              size,
              error,
              success,
              iconDirection,
              disabled,
            }}
          />
        </SuiInputWithIconRoot>
      );
    } else if (append.component && append.direction === "right") {
      template = (
        <SuiInputWithIconRoot
          ref={ref}
          ownerState={{ error, success, disabled }}
        >
          <SuiInputRoot
            {...rest}
            ownerState={{
              size,
              error,
              success,
              iconDirection,
              disabled,
            }}
          />
          <SuiInputIconBoxRoot ownerState={{ size }}>
            {append.component}
          </SuiInputIconBoxRoot>
        </SuiInputWithIconRoot>
      );
    } else {
      template = (
        <SuiInputRoot
          {...rest}
          ref={ref}
          ownerState={{ size, error, success, disabled }}
        />
      );
    }

    return template;
  }
);

// Setting default values for the props of SuiInput
SuiInput.defaultProps = {
  size: "medium",
  append: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the SuiInput
SuiInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  append: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};
