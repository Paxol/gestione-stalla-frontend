import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const OnlineStatusContext = React.createContext(true);

export const OnlineStatusProvider = ({ children }) => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false);
      });
      window.removeEventListener("online", () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  useEffect(() => {
    fetch("https://paxolproxy.ddns.net/ping")
      .then(() => setOnlineStatus(true))
      .catch(() => setOnlineStatus(false));
  });

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

OnlineStatusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext);
  return store;
};
