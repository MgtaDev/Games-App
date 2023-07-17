export default function validate(formData) {
  let errors = {};

  if (!formData.name) {
    errors.name = "";
  } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
    errors.name = " ⚠️ El nombre solo debe contener caracteres alfanuméricos y espacios";
  } else if(formData.name.length > 40){
    errors.name = "El nombre supera los 40 caracteres"
  }

  if (!formData.image) {
    errors.image = "";
  } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(formData.image)) {
    errors.image = " ⚠️ Ingresa una URL de imagen válida";
  }

  if (!formData.release) {
    errors.release = "";
  }

  if (!formData.ratings) {
    errors.ratings = "";
  } else if (formData.ratings < 0 || formData.ratings > 5) {
    errors.ratings = " ⚠️ La calificación debe estar entre 0 y 5";
  }

  if (formData.description.length < 10 && formData.description.length > 1000) {
    errors.description = " ⚠️ La descripcion debe contener entre 10 y 1000 caracteres";
  }

  if (!formData.platforms) {
    errors.platforms = " ⚠️ Selecciona al menos una plataforma";
  }

  if (formData.genres.length < 1 || formData.genres.length > 2) {
    errors.genres = " ⚠️ Selecciona uno o dos géneros";
  }

  return errors;
}
