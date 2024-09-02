import { FORM_CHECKBOX_OPTIONS } from "./../types/RegisterPage";
import { Permission, Query, Role } from "appwrite";
import { account, ID, database, DATABASE_ID } from "../lib/appwrite";
import { FormValues, UserProfile } from "../types/RegisterPage";
import { CreateToastFnReturn } from "@chakra-ui/react";

const USER_PROFILE_COLLECTION_ID = process.env
  .REACT_APP_APPWRITE_USER_PROFILE_COLLECTION as string;
const ANSWER_COLLECTION_ID = process.env
  .REACT_APP_APPWRITE_ANSWER_COLLECTION as string;

export const registerUser = async (
  formValues: FormValues,
  toast: CreateToastFnReturn
) => {
  const uid = ID.unique();

  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    state,
    country,
    linkedIn,
    twitter,
    ...rest
  } = formValues;
  const userProfile: UserProfile = {
    firstName,
    lastName,
    email,
    password,
    phone,
    state,
    country,
    linkedIn,
    twitter,
  };
  console.log("ckeck form data", formValues);
  try {
    const registerPromise = account.create(
      uid,
      email,
      password,
      [firstName, lastName].join(" ")
    );

    toast.promise(registerPromise, {
      success: { title: "Account created" },
      error: {
        title: "Account creation failed",
        description:
          "Your account cannot be created right now, please try again",
      },
      loading: {
        title: "Creating account...",
      },
    });

    const registerRes = await registerPromise;

    console.log("reg success: ", registerRes);

    await saveUserProfile(uid, userProfile, toast);

    await saveAnswers(uid, rest, toast);
  } catch (e) {
    throw e;
  }
};

const saveUserProfile = async (
  uid: string,
  userProfile: UserProfile,
  toast: CreateToastFnReturn
) => {
  const promise = database.createDocument(
    DATABASE_ID,
    USER_PROFILE_COLLECTION_ID,
    ID.unique(),
    JSON.stringify({
      UserID: uid,
      FirstName: userProfile.firstName,
      LastName: userProfile.lastName,
      PhoneNumber: userProfile.phone,
      "E-mail": userProfile.email,
      Country: userProfile.country,
      State: userProfile.state,
      Password: userProfile.password,
      LinkedIn: userProfile.linkedIn === "" ? null : userProfile.linkedIn,
      X_Twitter: userProfile.twitter === "" ? null : userProfile.twitter,
    }),
    [Permission.read(Role.any()), Permission.update(Role.any())]
  );
  toast.promise(promise, {
    success: { title: "User profile updated" },
    error: {
      title: "Profile creation failed",
      description: "Your profile cannot be updated right now, please try again",
    },
    loading: {
      title: "Saving form answers...",
    },
  });
  await promise;
};

const saveAnswers = async (
  uid: string,
  answers: Omit<FormValues, keyof UserProfile>,
  toast: CreateToastFnReturn
) => {
  const promise = Promise.all(
    (Object.keys(answers) as (keyof typeof answers)[])
      .filter(
        (key) =>
          answers[key] !== "" ||
          (Array.isArray(answers[key]) && answers[key].length > 0)
      )
      .map(async (key) => {
        await database.createDocument(
          DATABASE_ID,
          ANSWER_COLLECTION_ID,
          ID.unique(),
          JSON.stringify({
            ID_Answers: ID.unique(),
            UserID: uid,
            QuestionID: key,
            Answer: formatAnswer(answers, key),
          }),
          [Permission.read(Role.any()), Permission.update(Role.any())]
        );
      })
  );

  toast.promise(promise, {
    success: { title: "Answers saved" },
    error: {
      title: "Failed to save form answers",
      description:
        "Your form answers cannot be saved right now, please try again",
    },
    loading: {
      title: "Saving form answers...",
    },
  });

  await promise;
};

const formatAnswer = (
  answers: Omit<FormValues, keyof UserProfile>,
  field: keyof Omit<FormValues, keyof UserProfile>
) => {
  if (Object.keys(FORM_CHECKBOX_OPTIONS).includes(field))
    return JSON.stringify(answers[field]);
  return answers[field];
};

export const verifyEmail = async (email: string) => {
  const res = await database.listDocuments(
    DATABASE_ID,
    USER_PROFILE_COLLECTION_ID,
    [Query.equal("E-mail", email)]
  );
  return res.total < 1; //Implies there is no account associated with this email
};
