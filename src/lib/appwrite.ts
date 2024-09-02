import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.REACT_APP_APPWRITE_API_ENDPOINT as string)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);

export const database = new Databases(client);
export const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID as string;
export const USER_PROFILE_COLLECTION_ID = process.env
  .REACT_APP_APPWRITE_USER_PROFILE_COLLECTION as string;

export { ID } from "appwrite";
