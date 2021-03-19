import { toast } from 'react-toastify';

export const notify = (message) => toast.dark(message, {
    position: "bottom-center",
  });

export const notifyError = (message) => toast.error(message, {
    position: "bottom-center",
  });

export const notifyWarn = (message) => toast.warn(message, {
    position: "bottom-center",
  });

export const notifySuccess = (message) => toast.success(message, {
    position: "bottom-center",
  });
