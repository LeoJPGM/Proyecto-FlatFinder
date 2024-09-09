import * as v from "valibot";

export const FormSubmit = (form, scheme) => {
  const data = new FormData(form.current);
  const dataObject = Object.fromEntries([...data.entries()]);

  try {
    const dataValidate = v.parse(scheme, dataObject);
    return { success: true, data: dataValidate };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};
