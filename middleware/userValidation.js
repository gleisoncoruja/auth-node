const { body } = require("express-validator");

// Validate the user create
const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("job")
      .isString()
      .withMessage("O job é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O job precisa ter no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("Forneça um e-mail válido."),
    body("username")
      .isString()
      .withMessage("O username é obrigatório.")
      .isLength({ min: 4 })
      .withMessage("O username precisa ter no mínimo 4 caracteres."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo seis caracteres."),
  ];
};

// Login validation
const loginValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("O usuário é obrigatório")
      .withMessage("Informe um e-mail válido"),
    body("password").isString().withMessage("A senha é obrigatória"),
  ];
};

// Update validation
const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("Informe o seu nome")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter pelo menos 3 caracterers."),
    body("password")
      .optional()
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo seis caracteres."),
    body("job")
      .optional()
      .isString()
      .withMessage("O job é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O job precisa ter no mínimo 3 caracteres."),
    body("email")
      .optional()
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("Forneça um e-mail válido."),
    body("username")
      .optional()
      .isString()
      .withMessage("O username é obrigatório.")
      .isLength({ min: 4 })
      .withMessage("O username precisa ter no mínimo 4 caracteres."),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
