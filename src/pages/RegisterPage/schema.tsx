import { verifyEmail } from "../../services/register";
import * as Yup from "yup";

const invalidMessages = {
  password: `Password must contain at least 8 characters, with lowercase letters, uppercase letters, a number and a special character`,
  email: "Email must be of valid format",
  url: "Answer should be a proper url, e.g. https://google.com",
  required: "Required",
};

export const registerSchema = Yup.object().shape({
  // Step 1
  firstName: Yup.string()
    .min(1, invalidMessages.required)
    .required(invalidMessages.required),
  lastName: Yup.string()
    .min(1, invalidMessages.required)
    .required(invalidMessages.required),
  phone: Yup.string()
    .min(1, invalidMessages.required)
    .required(invalidMessages.required),
  email: Yup.string()
    .email(invalidMessages.email)
    .required(invalidMessages.required)
    .test(
      "is-duplicated",
      () => {
        return `This email is already in use. Please choose another one.`;
      },
      async (value) => {
        return await verifyEmail(value);
      }
    ),
  state: Yup.string()
    .min(1, invalidMessages.required)
    .required(invalidMessages.required),
  country: Yup.string()
    .min(1, invalidMessages.required)
    .required(invalidMessages.required),
  password: Yup.string()
    .required(invalidMessages.password)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,32}$/,
      invalidMessages.password
    ),
  linkedIn: Yup.string().url(),
  twitter: Yup.string().url(),

  // Step 2
  organizationName: Yup.string(),
  role: Yup.string(),
  requiredAssistance: Yup.string(),
  requiredProjectAssistance: Yup.string(),
  provideService: Yup.string(),
  skill: Yup.string(),

  // Step 3
  reasons: Yup.array(),
  heardAbout: Yup.string(),
  seeFaith: Yup.string(),
  interests: Yup.array()    
    .min(1, invalidMessages.required)
    .required(invalidMessages.required),

  // Step 4
  conferencePlatform: Yup.string(),
  platform: Yup.string(),
  platformThoughts: Yup.string(),
  channelThoughts: Yup.string(),
  additionalQuestions: Yup.string(),
  interestedActivities: Yup.array(),
});

// export const registerSchema = Yup.object().shape({
//   // Step 1
//   firstName: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   lastName: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   phone: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   email: Yup.string()
//     .email(invalidMessages.email)
//     .required(invalidMessages.required),
//   state: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   country: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   password: Yup.string()
//     .required(invalidMessages.password)
//     .matches(
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,32}$/,
//       invalidMessages.password
//     ),
//   linkedIn: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   twitter: Yup.string(),

//   // Step 2
//   organizationName: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   role: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   requiredAssistance: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   requiredProjectAssistance: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   provideService: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   skill: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),

//   // Step 3
//   reasons: Yup.array().min(1, invalidMessages.required),
//   heardAbout: Yup.string()
//     .min(1, "Required heard!")
//     .required(invalidMessages.required),
//   seeFaith: Yup.string().required(invalidMessages.required),
//   interests: Yup.array().min(1, invalidMessages.required),

//   // Step 4
//   conferencePlatform: Yup.string()
//     .min(1, "Required conferencePlatform!")
//     .required(invalidMessages.required),
//   platform: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   platformThoughts: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   channelThoughts: Yup.string()
//     .min(1, invalidMessages.required)
//     .required(invalidMessages.required),
//   additionalQuestions: Yup.string(),
//   interestedActivities: Yup.array().min(1, invalidMessages.required),
// });
