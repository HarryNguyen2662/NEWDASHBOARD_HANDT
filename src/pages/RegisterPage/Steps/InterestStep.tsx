import React from "react";
import { Checkbox, CheckboxGroup, Input, Stack, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import styles from "./Step.module.css";
import {
  CheckboxData,
  FORM_CHECKBOX_OPTIONS,
  FormValues,
  TextInputData,
} from "../../../types/RegisterPage";

const FORM_VALUES: {
  textInput: TextInputData[];
  checkbox: CheckboxData[];
} = {
  textInput: [
    {
      name: "heardAbout",
      label: "How did you hear about the group?",
      placeholder: "I heard about CW3 through ... ",
    },
    {
      name: "seeFaith",
      label: "How do you see faith integrating/intersecting in the Web3 space?",
      placeholder: "I see faith as ...",
    },
  ],
  checkbox: [
    {
      name: "reasons",
      label: "Tell us why you're here. Please select all that apply:",
      values: FORM_CHECKBOX_OPTIONS["reasons"]!,
    },
    {
      name: "interests",
      label:
        "Which of the following best describes your interest/expertise/engagement? * Please select all that apply:",
      values: FORM_CHECKBOX_OPTIONS["interests"]!,
    },
  ],
};

export const InterestStep: React.FC = () => {
  const { values, handleChange, errors, touched, handleBlur } =
    useFormikContext<FormValues>();

  return (
    <>
      <Stack>
        <Text>Tell us why you're here. Please select all that apply:</Text>
        <CheckboxGroup value={values.reasons}>
          <div className={styles.inputGrid3}>
            {FORM_VALUES.checkbox[0].values.map((value, id) => (
              <Checkbox
                key={id}
                id="reasons"
                name="reasons"
                value={value}
                onChange={handleChange}
                isInvalid={Boolean(errors.reasons && touched.reasons)}
              >
                {value}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </Stack>
      {FORM_VALUES.textInput.map(({ name, label, placeholder }, id) => (
        <Stack key={id}>
          <Text>{label}</Text>
          <Input
            id={name}
            name={name}
            type="text"
            onChange={(e) => {
              handleChange(e);
            }}
            value={values[name]}
            placeholder={placeholder}
            isInvalid={Boolean(errors[name] && touched[name])}
            onBlur={handleBlur}
          />
          {errors[name] && touched[name] && (
            <Text color="red">{errors[name]}</Text>
          )}
        </Stack>
      ))}
      <Stack>
        <Text>
          Which of the following best describes your
          interest/expertise/engagement? * Please select all that apply:
        </Text>
        <CheckboxGroup value={values.interests}>
          <div className={styles.inputGrid3}>
            {FORM_VALUES.checkbox[1].values.map((value, id) => (
              <Checkbox
                key={id}
                id="interests"
                name="interests"
                value={value}
                onChange={handleChange}
                isInvalid={Boolean(errors.interests && touched.interests)}
                onBlur={handleBlur}
              >
                {value}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
        {errors.interests && touched.interests && (
          <Text color="red">{errors.interests}</Text>
        )}
      </Stack>
    </>
  );
};

export default InterestStep;
