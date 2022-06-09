import { Dashboard } from "view/dashboard";
import { RegistraModello4 } from "view/RegistraModello4";
import { RegistraNascita } from "view/RegistraNascita";
import { StatoGravidanze } from "view/StatoGravidanze";

export const routes = [
  {
    title: "Gestione stalla",
    key: "dashboard",
    route: "/dashboard",
    home: true,
    component: Dashboard,
  },
  {
    title: "Stato gravidanze",
    key: "stato-gravidanze",
    route: "/stato-gravidanze",
    component: StatoGravidanze,
  },
  {
    title: "Registra modello 4",
    key: "registra-modello-4",
    route: "/registra-modello-4",
    component: RegistraModello4,
  },
  {
    title: "Registra nascita",
    key: "registra-nascita",
    route: "/registra-nascita",
    component: RegistraNascita,
  },
];
