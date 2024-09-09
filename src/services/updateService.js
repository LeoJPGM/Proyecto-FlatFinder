import { updateUsers } from "./FireBase";

//Actualiza la informacion de usuario.
export const updateProfile = async (userID, updateData) => {
  if (!updateData.success) {
    return { success: true, message: updateData.errorMessage };
  }

  try {
    await updateUsers(userID, updateData.data);
    return { success: false, message: "Usuario actualizado correctamente" };
  } catch (error) {
    return { success: true, message: updateData.errorMessage };
  }
};
