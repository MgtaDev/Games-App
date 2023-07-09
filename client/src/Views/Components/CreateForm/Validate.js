export default function validate(formData) {
  let errors = {};

  if (!formData.name) {
    errors.name = " ⚠️ Ingresa un nombre";
  } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
    errors.name = " ⚠️ El nombre solo debe contener caracteres alfanuméricos y espacios";
  }

  if (!formData.image) {
    errors.image = " ⚠️ Ingresa una imagen";
  } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(formData.image)) {
    errors.image = " ⚠️ Ingresa una URL de imagen válida";
  }

  if (!formData.release) {
    errors.release = " ⚠️ Selecciona una fecha de lanzamiento";
  }

  if (!formData.ratings) {
    errors.ratings = " ⚠️ Ingresa una calificación";
  } else if (isNaN(parseFloat(formData.ratings)) || parseFloat(formData.ratings) < 0 || parseFloat(formData.ratings) > 5) {
    errors.ratings = " ⚠️ La calificación debe estar entre 0 y 5";
  }

  if (!formData.description) {
    errors.description = " ⚠️ Ingresa una descripción";
  }

  if (!formData.platforms) {
    errors.platforms = " ⚠️ Selecciona al menos una plataforma";
  }

  if (formData.genres.length < 1 || formData.genres.length > 2) {
    errors.genres = " ⚠️ Selecciona uno o dos géneros";
  }

  return errors;
}