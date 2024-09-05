/*import { Databases, Query } from "appwrite";
import { account, client, database } from "../lib/supabase";

interface Option {
  value: string;
  label: string;
}

class Searching {
  async search(keyword: string) {
    try {
      if (keyword === "") {
        console.error("Keyword is empty");
        return [];
      }
      const result1 = await database.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
        process.env.REACT_APP_APPWRITE_USER_PROFILE_COLLECTION as string,
        [
          Query.or([
            Query.contains("FirstName", keyword),
            Query.contains("LastName", keyword),
            Query.contains("E-mail", keyword),
            Query.contains("Country", keyword),
            Query.contains("State", keyword),
          ]),
        ]
      );

      const result2 = await database.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
        process.env.REACT_APP_APPWRITE_ANSWER_COLLECTION as string,
        [Query.contains("Answer", keyword)]
      );

      const userIDs = result2.documents.map((doc) => doc.UserID);
      if (userIDs.length === 0) userIDs.push("randomthing");

      // Query user information based on the extracted UserIDs

      const result3 = await database.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
        process.env.REACT_APP_APPWRITE_USER_PROFILE_COLLECTION as string,
        [Query.equal("UserID", userIDs)]
      );

      const combinedResults = [...result1.documents, ...result3.documents];

      // Remove duplicates based on UserID
      const userIDMap = new Map();
      for (const doc of combinedResults) {
        if (!userIDMap.has(doc.UserID)) {
          userIDMap.set(doc.UserID, doc);
        }
      }
      const uniqueResults = Array.from(userIDMap.values());

      return uniqueResults;
    } catch (error) {
      console.error("Error searching documents:", error);
      throw error;
    }
  }
}

const searchingFunction = new Searching();

export default searchingFunction;
*/
