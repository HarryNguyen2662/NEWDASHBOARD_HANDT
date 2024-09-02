import React from "react";
import { Input, Stack, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { FormValues, TextInputData } from "@/types/RegisterPage";

// Constant containing form values
const FORM_VALUES: {
  textInput: TextInputData[];
} = {
  textInput: [
    {
      name: "organizationName",
      label: "Organization/Business name",
      placeholder: "Christians in Web3",
    },
    {
      name: "role",
      label: "Role",
      placeholder: "What's your role?",
    },
    {
      name: "requiredAssistance",
      label: "Do you have a current business that may need assistance?",
      placeholder: "I need assistance on ...",
    },
    {
      name: "requiredProjectAssistance",
      label: "Do you have a startup project that may need assistance?",
      placeholder: "If you have one, please type the name of the project",
    },
    {
      name: "provideService",
      label: "Do you formally provide services to businesses or organizations?",
      placeholder: "Website, Branding, Marketing",
    },
    {
      name: "skill",
      label:
        "Do you have skills or expertise you are open to provide to people in CW3?",
      placeholder: "System Model, Web3 Development",
    },
  ],
};

export const AssistStep: React.FC = () => {
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
    </>
  );
};
