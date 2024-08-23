import snackbarMessages from "./messages";

const showSnackbar = (type: any, messageKey: any) => {
  const message = snackbarMessages[type][messageKey];
  return message;
};
export default showSnackbar;
