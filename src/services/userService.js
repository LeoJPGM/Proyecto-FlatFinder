import { getUsers } from "../services/FireBase";

export const getUserByID = async (userID) => {
  const data = await getUsers();
  const userData = data.find((user) => user.id === userID);
  return userData;
};
