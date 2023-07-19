export default function validate(gameSearched) {
    let errors = [];
    const regex = /^[a-zA-Z0-9 ]+$/;
  
    // Verificar si el campo está vacío
    if (gameSearched !== '' && !regex.test(gameSearched)) {
      errors.push(' 🚫 No se permiten caracteres especiales');
    }
  
    return errors;
  }