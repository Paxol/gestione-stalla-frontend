/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { DashboardLayout } from "layout/DashboardLayout";
import { ConfermaFecondazione } from "./ConfermaFecondazione";
import { RegistraAsciutta } from "./RegistraAsciutta";
import { RegistraFecondazione } from "./RegistraFecondazione";
import { RegistraParto } from "./RegistraParto";
import { BoviniInFecondazione } from "./BoviniInFecondazione";

export const StatoGravidanze = () => {
  const [openCollapses, setOpenCollapses] = useState({
    fecondazioni: false,
    asciutte: false,
    parto: false,
  });

  return (
    <DashboardLayout grow>
      <Box mb={2}>
        <BoviniInFecondazione />
      </Box>

      <Box mb={2}>
        <SectionTitle
          title="Fecondazioni"
          onOpenChanged={(open) => {
            setOpenCollapses((prev) => ({ ...prev, fecondazioni: open }));
          }}
        />
        {openCollapses.fecondazioni && (
          <>
            <Typography variant="h4">Registra fecondazione</Typography>
            <RegistraFecondazione />

            <Typography variant="h4">Conferma fecondazione</Typography>
            <ConfermaFecondazione />
          </>
        )}
      </Box>

      <Box mb={2}>
        <SectionTitle
          title="Asciutte"
          onOpenChanged={(open) => {
            setOpenCollapses((prev) => ({ ...prev, asciutte: open }));
          }}
        />
        {openCollapses.asciutte && (
          <>
            <Typography variant="h4">Registra asciutta</Typography>
            <RegistraAsciutta />
          </>
        )}
      </Box>

      <Box mb={2}>
        <SectionTitle
          title="Registra parto"
          onOpenChanged={(open) => {
            setOpenCollapses((prev) => ({ ...prev, parto: open }));
          }}
        />
        {openCollapses.parto && <RegistraParto />}
      </Box>
    </DashboardLayout>
  );
};

const SectionTitle = ({ title, onOpenChanged }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        role: "button",
      }}
      onClick={() => {
        setIsOpen(!isOpen);
        onOpenChanged(!isOpen);
      }}
    >
      <Typography variant="h3">{title}</Typography>
      {isOpen ? <ExpandLess /> : <ExpandMore />}
    </Box>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onOpenChanged: PropTypes.func.isRequired,
};
