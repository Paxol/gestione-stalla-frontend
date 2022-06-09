import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const ContextModello4 = React.createContext([]);

const defaultContext = {
  tipologia: 0,
  data: new Date().toISOString().substring(0, 10),
  serie: new Date().toISOString().substring(0, 4),
  numero: "1",
  isCartaceo: false,

  destinazione: 0,
  nuovoLuogo: { codice: "", descrizione: "" },
};

const ProviderModello4 = ({ children }) => {
  const [modello4, setModello4] = useState(defaultContext);

  const value = useMemo(
    () => [modello4, setModello4, () => setModello4(defaultContext)],
    [modello4, setModello4]
  );

  return (
    <ContextModello4.Provider value={value}>
      {children}
    </ContextModello4.Provider>
  );
};

ProviderModello4.propTypes = {
  children: PropTypes.node.isRequired,
};

const useContextModello4 = () => {
  const context = useContext(ContextModello4);
  if (context === undefined) {
    throw new Error(
      "useModello4Context must be used within a Modello4Provider"
    );
  }
  return context;
};

export { ProviderModello4, useContextModello4 };
