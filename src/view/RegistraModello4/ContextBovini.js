import React, { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useContextModello4 } from "./ContextModello4";

const ContextBovini = React.createContext([]);

const ProviderBovini = ({ children, boviniInStalla }) => {
  const [{ tipologia }] = useContextModello4();

  const [boviniMovimentati, setBoviniMovimentati] = useState([]);

  useEffect(() => {
    setBoviniMovimentati([]);
  }, [tipologia]);

  const boviniInStallaFiltrati = useMemo(
    () =>
      tipologia === 0 &&
      boviniInStalla.filter(
        (c) =>
          boviniMovimentati.find((r) => r.codice === c.codice) === undefined
      ),
    [boviniMovimentati, tipologia, boviniInStalla]
  );

  const value = useMemo(
    () => ({
      boviniMovimentati: {
        get: boviniMovimentati,
        set: setBoviniMovimentati,
      },
      boviniInStalla,
      boviniInStallaFiltrati,
    }),
    [
      boviniMovimentati,
      setBoviniMovimentati,
      boviniInStalla,
      boviniInStallaFiltrati,
    ]
  );

  return (
    <ContextBovini.Provider value={value}>{children}</ContextBovini.Provider>
  );
};

ProviderBovini.propTypes = {
  children: PropTypes.node.isRequired,
  boviniInStalla: PropTypes.arrayOf(
    PropTypes.shape({
      codice: PropTypes.string.isRequired,
      madre: PropTypes.string.isRequired,
      sesso: PropTypes.string.isRequired,
      dataNascita: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const useContextBovini = () => {
  const context = useContext(ContextBovini);
  if (context === undefined) {
    throw new Error("useContextBovini must be used within a ProviderBovini");
  }
  return context;
};

export { ProviderBovini, useContextBovini };
