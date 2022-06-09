import { config } from "../config";

export const request = (action, options) => {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    ...options,
  };

  return fetch(
    `${config.apiHost}/api.php?action=${action}`,
    requestOptions
  ).then((response) => response.json());
};
