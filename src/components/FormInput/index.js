import PropTypes from "prop-types";

import { SuiBox } from "softui/SuiBox";
import { SuiInput } from "softui/SuiInput";
import { SuiTypography } from "softui/SuiTypography";

export const FormInput = ({ label, placeholder, type, onChange }) => (
  <SuiBox mb={2}>
    <SuiBox mb={1} ml={0.5}>
      <SuiTypography component="label" variant="caption" fontWeight="bold">
        {label}
      </SuiTypography>
    </SuiBox>
    <SuiInput type={type} placeholder={placeholder} onChange={onChange} />
  </SuiBox>
);

FormInput.defaultProps = {
  placeholder: "",
  onChange: null,
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
