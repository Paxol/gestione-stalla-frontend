export const defaultBovino = {
  codice: "",
  madre: "",
  dataNascita: new Date(),
  sesso: "F",
};

export const validaBovino = (bovino) => {
  let valid = typeof bovino.codice === "string" && bovino.codice.length === 14;
  let message = "";

  if (!valid) {
    message = "Il codice bovino deve essere di 14 caratteri";
    return [valid, message];
  }

  valid =
    valid && typeof bovino.madre === "string" && bovino.madre.length === 14;

  if (!valid) {
    message = "Il codice della madre deve essere di 14 caratteri";
    return [valid, message];
  }

  valid =
    valid &&
    typeof bovino.sesso === "string" &&
    (bovino.sesso === "M" || bovino.sesso === "F");

  if (!valid) {
    message = "Il sesso deve essere 'M' o 'F'";
    return [valid, message];
  }

  try {
    valid =
      valid &&
      typeof bovino.dataNascita === "object" &&
      bovino.dataNascita.toISOString !== undefined &&
      bovino.dataNascita.toISOString() <= new Date().toISOString();
  } catch {
    valid = false;
  }

  if (!valid) message = "La data di nascita deve essere valida";

  return [valid, message];
};

export const validaLuogo = (luogo) => {
  let valid =
    typeof luogo.codice === "string" &&
    luogo.codice.length > 0 &&
    luogo.codice.length <= 10;
  let message = "";

  if (!valid) {
    message =
      "Il codice del luogo non può essere vuoto e deve essere di massimo 10 caratteri";
    return [valid, message];
  }

  valid =
    valid &&
    typeof luogo.descrizione === "string" &&
    luogo.descrizione.length <= 256;

  if (!valid)
    message = "La descrizione del luogo non può essere di più di 256 caratteri";

  return [valid, message];
};
