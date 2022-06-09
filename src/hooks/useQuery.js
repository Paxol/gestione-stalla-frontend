import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { request } from "utils/request";

export const useQuery = ({
  action,
  fetchOptions,
  showErrorInSnackbar,
  defaultErrorMessage,
  defaultValue,
}) => {
  const [data, setData] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!data) {
      request(action, fetchOptions)
        .then(({ error, message, status, data: resData }) => {
          if (error) {
            setErr({ error, message });
            return;
          }

          if (status === "ok") {
            setLoading(false);
            setData(resData);
          }
        })
        .catch((error) => setErr({ error }));
    }
  }, [data]);

  useEffect(() => {
    if (err && showErrorInSnackbar)
      enqueueSnackbar(err.message ?? defaultErrorMessage ?? err.error, {
        variant: "error",
      });
  }, [err]);

  return {
    data: data || defaultValue,
    error: err,
    loading,
    refresh: () => setData(undefined),
  };
};
