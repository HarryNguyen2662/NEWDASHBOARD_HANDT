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
      name: "conferencePlatform",
      label: "Preferred video conference platform for online gatherings?",
      placeholder: "e.g. Zoom, Microsoft Team",
    },
    {
      name: "platform",
      label:
        "Which communication platform should we move to? (Discord/Discourse/Multytude/Upstream/Other)",
      placeholder: "e.g. Discord",
    },
    {
      name: "platformThoughts",
      label:
        "Please share your platform recommendations or additional thoughts.",
      placeholder: "e.g. I think Discord is good platform because ...",
    },
    {
      name: "channelThoughts",
      label: "Do our WhatsApp and Telegram channels need more curation?",
      placeholder: "e.g. It is perfect!",
    },
    {
      name: "additionalQuestions",
      label: "Any other questions?",
      placeholder: "e.g. What is Web3?",
    },
  ],
  checkbox: [
    {
      name: "interestedActivities",
      label: "Tell us why you're here. Please select all that apply:",
      values: FORM_CHECKBOX_OPTIONS["interestedActivities"]!,
    },
  ],
};

export const FinalStep: React.FC = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<FormValues>();

  return (
    <>
      {FORM_VALUES.textInput.map(({ name, label, placeholder }, id) => (
        <Stack key={id}>
          <Text>{label}</Text>
          <Input
            id={name}
            name={name}
            type="text"
            onChange={handleChange}
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
        <Text>Tell us why you're here. Please select all that apply:</Text>
        <CheckboxGroup value={values.interestedActivities}>
          <div className={styles.inputGrid2}>
            {FORM_VALUES.checkbox[0].values.map((value, id) => (
              <Checkbox
                key={id}
                id="interestedActivities"
                name="interestedActivities"
                value={value}
                onChange={handleChange}
                isInvalid={Boolean(
                  errors.interestedActivities && touched.interestedActivities
                )}
                onBlur={handleBlur}
              >
                {value}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </Stack>
    </>
  );
};

export default FinalStep;
