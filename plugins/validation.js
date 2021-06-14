/* eslint-disable */
import { extend, configure } from "vee-validate";
import {
  required,
  alpha_spaces,
  regex,
  max,
  min,
  email,
  digits,
  confirmed,
} from "vee-validate/dist/rules";

configure({
  classes: {
    invalid: "is-invalid",
  }
});

extend("regex", {
  ...regex,
  message: "The {_field_} format is invalid"
});

extend("max", {
  ...max,
  message: "The {_field_} may not be greater than {length} characters"
});

extend("min", {
  ...min,
  message: "The {_field_} must be at least {length} characters"
});

extend("email", {
  ...email,
  message: "The {_field_} must be a valid email address"
});

// for signup and signin
extend("regex_for_username", {
  ...regex,
  message: "The {_field_} may only contain lowercase alphanumeric characters, and special characters are not allowed besides dash -"
});

extend("regex_for_mobile", {
  ...regex,
  message: "Invalid {_field_}"
});

extend("digits_for_varification_code", {
  ...digits,
  message: "The {_field_} must contain a {length} digit code"
});

// extend("regex_for_username_or_mobile", {
//   ...regex,
//   message: "The {_field_} format is invalid"
// });
// end of signup and signin

extend("required", {
  ...required,
  message: "The {_field_} field is required"
});

extend("required_with_no_field_label_passed", {
  ...required,
  message: "This field is required"
});

extend("required_for_dynamic_input_type_selection", {
  ...required,
  message: "You must select an input type, if you don't want, you can remove this section"
});

// for dynamic input field section
extend("required_for_dynamic_input_label_for_the_text", {
  ...required,
  message: "The label for the text field is required"
});
extend("regex_alpha_numeric_space_for_dynamic_input_label_for_text", {
  ...regex,
  message: "The label for the text field may only contain alphabetic, numeric, +&,-'()/ characters, and spaces"
});

extend("regex_alpha_numeric_space_for_dynamic_input_placeholder_for_text", {
  ...regex,
  message: "The placeholder for the text field may only contain alphabetic, numeric, +&,-'()/ characters, and spaces"
});
extend("max_for_dymanic_input_label_for_text", {
  ...max,
  message: "The label for the text field may not be greater than {length} characterss"
});
extend("max_for_dymanic_input_placeholder_for_text", {
  ...max,
  message: "The placeholder for the text field may not be greater than {length} characterss"
});
// end for dynamic input field section

// for dynamic input DDL section
extend("required_for_dynamic_input_label_for_the_drop_down_list", {
  ...required,
  message: "The label for the drop-down list field is required"
});
extend("regex_alpha_numeric_space_for_dynamic_input_label_for_the_drop_down_list", {
  ...regex,
  message: "The label for the drop-down list field may only contain alphabetic, numeric, +&,-'()/ characters, and spaces"
});
extend("max_for_dymanic_input_label_for_the_drop_down_list", {
  ...max,
  message: "The label for the drop-down list field may not be greater than {length} characterss"
});
extend("required_for_tags_for_dynamic_input_tags_for_drop_down_list", {
  ...required,
  message: "You must add at least 1 value for the drop-down list"
});
extend("regex_alpha_numeric_space_for_dynamic_input_tags_for_the_drop_down_list", {
  ...regex,
  message: "The drop-down list field values may only contain alphabetic, numeric, +&,.\"-'()/ characters, and spaces"
});
extend("required_for_tags_for_dynamic_input_tags_for_edit", {
  ...required,
  message: "This field's value cannot be empty, if you want to remove this field click the delete button"
});
extend("regex_alpha_numeric_space_for_dynamic_input_tags_for_edit", {
  ...regex,
  message: "This field value may only contain alphabetic, numeric, +&,.\"-'() characters, and spaces"
});
extend("max_for_tags_dynamic_input_tags_for_edit", {
  ...max,
  message: "The field value may not be greater than {length} characters"
});
extend("max_for_tags_dynamic_input_tags_for_the_drop_down_list", {
  ...max,
  message: "The drop-down list field values may not be greater than {length} characters"
});
// end for dynamic input DDL section

// for dynamic input radio section
extend("required_for_dynamic_input_label_for_the_radio_button_list", {
  ...required,
  message: "The label for the radio button list field is required"
});
extend("regex_alpha_numeric_space_for_dynamic_input_label_for_the_radio_button_list", {
  ...regex,
  message: "The label for the radio button list field may only contain alphabetic, numeric, +&,-'()/ characters, and spaces"
});
extend("max_for_dymanic_input_label_for_the_radio_button_list", {
  ...max,
  message: "The label for the radio button list field may not be greater than {length} characterss"
});
extend("required_for_tags_for_dynamic_input_tags_for_the_radio_button_list", {
  ...required,
  message: "You must add at least 1 value for the radio button list"
});
extend("regex_alpha_numeric_space_for_dynamic_input_tags_for_the_radio_button_list", {
  ...regex,
  message: "The radio button list field values may only contain alphabetic, numeric, +&,.\"-'()/ characters, and spaces"
});
extend("max_for_tags_dynamic_input_tags_for_the_radio_button_list", {
  ...max,
  message: "The radio button list field values may not be greater than {length} characters"
});
// end for dynamic input radio section

// for dynamic input checkbox section
extend("required_for_dynamic_input_label_for_the_checkbox_list", {
  ...required,
  message: "The label for the checkbox list field is required"
});
extend("regex_alpha_numeric_space_for_dynamic_input_label_for_the_checkbox_list", {
  ...regex,
  message: "The label for the checkbox list field may only contain alphabetic, numeric, +&,-'()/ characters, and spaces"
});
extend("max_for_dymanic_input_label_for_the_checkbox_list", {
  ...max,
  message: "The label for the checkbox list field may not be greater than {length} characterss"
});
extend("required_for_tags_for_dynamic_input_tags_for_the_checkbox_list", {
  ...required,
  message: "You must add at least 1 value for the checkbox list"
});
extend("regex_alpha_numeric_space_for_dynamic_input_tags_for_the_checkbox_list", {
  ...regex,
  message: "The checkbox list field values may only contain alphabetic, numeric, +&,.\"-'()/ characters, and spaces"
});
extend("max_for_tags_dynamic_input_tags_for_the_checkbox_list", {
  ...max,
  message: "The checkbox list field values may not be greater than {length} characters"
});
// end for dynamic input checkbox section

extend("required_for_tags", {
  ...required,
  message: "You must add at least 1 value for the {_field_}"
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "The {_field_} field may only contain alphabetic characters, and spaces"
});

extend("regex_alpha_numeric_space", {
  ...regex,
  message: "The {_field_} field values may only contain alphabetic, numeric, +&,-'()/ characters, and spaces"
});

extend("max_for_tags", {
  ...max,
  message: "The {_field_} field values may not be greater than {length} characters"
});

extend("confirmed", {
  ...confirmed,
  message: "Password confirmation does not match with the new password"
});

// for update profile
extend("regex_for_name", {
  ...regex,
  message: "The {_field_} may only contain alphanumeric characters, and spaces"
});

extend("regex_for_bio", {
  ...regex,
  message: "The {_field_} may only contain alphanumeric characters, ().\"/-&,' characters, and spaces"
});
// end for update profile
