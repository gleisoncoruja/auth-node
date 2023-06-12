const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // check if headers exists and separates token from bearer
  const token = authHeader && authHeader.split(" ")[1];

  // check if header has a token
  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  // Check if token is valid
  try {
    const { method } = req;
    const verified = jwt.verify(token, jwtSecret);
    const user = await User.findById(verified.userId);
    if (!user) {
      return res.status(401).json({ msg: "Acesso negado!" });
    }

    if (method === "PATCH") {
      const { username } = req.params;
      const isAdmin = user.role.includes("admin");
      const isUserOwner = user.username === username;

      if (!isAdmin && !isUserOwner) {
        return res
          .status(401)
          .json({ msg: "Você não tem autorização para editar esse cadastro" });
      }

      if (!isAdmin && req.body.role) {
        return res
          .status(401)
          .json({ msg: "Você não tem autorização para editar as permissões" });
      }
    }

    if (method === "DELETE") {
      const isAdmin = user.role.includes("admin");

      if (!isAdmin) {
        return res
          .status(401)
          .json({ msg: "Você não tem autorização para excluir esse cadastro" });
      }
    }
    req.user = await User.findById(verified.userId);

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido." });
  }
};

module.exports = authGuard;
