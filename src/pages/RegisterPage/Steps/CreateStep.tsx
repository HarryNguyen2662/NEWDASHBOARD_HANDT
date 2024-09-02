import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  GridItem,
  Select,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "./Step.module.css";
import { FormValues, TextInputData } from "@/types/RegisterPage";

interface Country {
  country_name: string;
  country_short_name: string;
  country_phone_code: number;
}

interface State {
  state_name: string;
}

const FORM_VALUES: {
  textInput: TextInputData[];
} = {
  textInput: [
    {
      name: "firstName",
      label: "First Name *",
      placeholder: "First Name",
    },
    {
      name: "lastName",
      label: "Last Name *",
      placeholder: "Last Name",
    },
    {
      name: "phone",
      label: "Phone Number *",
      placeholder: "xxx-xxx-xxxx",
    },
    {
      name: "email",
      label: "Email *",
      placeholder: "Email",
    },
    { name: "country", label: "Country *", placeholder: "Select Country" },
    {
      name: "state",
      label: "State/Territory *",
      placeholder: "Select State/Territory",
    },
    { name: "password", label: "Password *", placeholder: "Enter Password" },
    {
      name: "linkedIn",
      label: "LinkedIn",
      placeholder: "https://www.linkedin.com",
    },
    { name: "twitter", label: "X (Twitter)", placeholder: "x.com" },
  ],
};

const getAuthToken = async () => {
  const response = await axios.get(
    "https://www.universal-tutorial.com/api/getaccesstoken",
    {
      headers: {
        Accept: "application/json",
        "api-token": process.env.REACT_APP_COUNTRY_API_TOKEN,
        "user-email": process.env.REACT_APP_COUNTRY_ACCESS_EMAIL,
      },
    }
  );
  return response.data.auth_token;
};

const getCountries = async (authToken: string) => {
  const response = await axios.get(
    "https://www.universal-tutorial.com/api/countries",
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const getStates = async (authToken: string, countryName: string) => {
  const response = await axios.get(
    `https://www.universal-tutorial.com/api/states/${countryName}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export const CreateStep: React.FC = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);

  const handleClickPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    // Fetch auth token and then countries
    const fetchData = async () => {
      const authToken = await getAuthToken();
      const countryData = await getCountries(authToken);
      setCountries(countryData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("state changed", errors, touched);
  }, [errors, touched]);

  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCountry = e.target.value;
    setFieldValue("country", selectedCountry);

    const authToken = await getAuthToken();
    const stateData = await getStates(authToken, selectedCountry);
    setStates(stateData);
    setFieldValue("state", "");
  };

  // Type guard to check if the item is a Country
  const isCountry = (item: Country | State): item is Country => {
    return (item as Country).country_short_name !== undefined;
  };

  // Type guard to check if the item is a State
  const isState = (item: Country | State): item is State => {
    return (item as State).state_name !== undefined;
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {FORM_VALUES.textInput.map(({ name, label, placeholder, onBlur }, id) => (
        <GridItem
          colSpan={
            ["firstName", "lastName", "country", "state"].includes(name) ? 1 : 2
          }
          key={id}
        >
          {name === "country" || name === "state" ? (
            <Stack>
              <Text>{label}</Text>
              <Select
                variant="primary"
                className={styles.selectInput}
                id={name}
                name={name}
                onChange={
                  name === "country" ? handleCountryChange : handleChange
                }
                value={values[name]}
                placeholder={placeholder}
                isInvalid={Boolean(errors[name] && touched[name])}
                onBlur={handleBlur}
                disabled={name === "state" && !states.length}
                data-selected={!!values[name]}
              >
                {(name === "country" ? countries : states).map((item) => (
                  <option
                    key={
                      isCountry(item)
                        ? item.country_short_name
                        : item.state_name
                    }
                    value={
                      isCountry(item) ? item.country_name : item.state_name
                    }
                  >
                    {isCountry(item) ? item.country_name : item.state_name}
                  </option>
                ))}
              </Select>
              {errors[name] && touched[name] && (
                <Text color="red">{errors[name]}</Text>
              )}
            </Stack>
          ) : (
            <Stack
              className={name === "password" ? styles.passwordContainer : ""}
            >
              <Text>{label}</Text>
              <InputGroup>
                <Input
                  id={name}
                  name={name}
                  type={
                    name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  onChange={handleChange}
                  value={values[name]}
                  placeholder={placeholder}
                  isInvalid={Boolean(errors[name] && touched[name])}
                  onBlur={(e) => {
                    handleBlur(e);
                  }}
                />
                <InputRightElement>
                  {name === "password" && (
                    <IconButton
                      size="md"
                      aria-label={showPassword ? "hide" : "show"}
                      icon={
                        showPassword ? (
                          <ViewOffIcon w={5} h={5} />
                        ) : (
                          <ViewIcon w={5} h={5} />
                        )
                      }
                      onClick={handleClickPassword}
                      variant="link"
                      colorScheme="gray"
                      position="absolute"
                      right="2"
                      top="50%"
                      transform="translateY(-50%)"
                      _hover={{ stroke: "#F7F7F7" }}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              {errors[name] && touched[name] && (
                <Text color="red">{errors[name]}</Text>
              )}
            </Stack>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

export default CreateStep;
