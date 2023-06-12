const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (userId, username) => {
  return jwt.sign({ userId, username }, jwtSecret, {
    expiresIn: "3d",
  });
};

const getUserByUserName = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `Usuário não encontrado para ${username}` });
    }

    // Remove password from response
    const { password: userPassword, ...responseData } =
      await User.updatePartial(user.id, {
        readings: user.readings + 1,
      });

    return res.status(200).json(responseData);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Erro no servidor ao buscar usuário ${username}` });
  }
};

const getUsers = async (req, res) => {
  const { ...pramas } = req.query;
  // Filter by query params
  // { id, name, email, username }
  const users = await User.find(pramas);

  // Remove passwords from response
  const responseData = users.map(({ password, ...user }) => user);
  return res.status(200).json(responseData);
};

const createUser = async (req, res) => {
  const { name, job, email, username, password } = req.body;

  // Checks if the user already exists
  const users = await User.find({ username, email });

  if (users.length) {
    return res.status(409).json({
      msg: "Usuário ou email já cadastrado",
    });
  }

  // If don't exists, generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    job,
    email,
    username,
    password: passwordHash,
  });

  if (!newUser) {
    return res.status(400).json({
      msg: "Erro ao criar usuário, tente novamente mais tarde",
    });
  }

  return res.status(201).json({
    userId: newUser.id,
    token: generateToken(newUser.id, newUser.username),
  });
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  const { name, job, email, username: newUsername, password } = req.body;
  const reqUser = req.user;

  // Checks if the user exists
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      msg: "Usuário não encontrado",
    });
  }

  // check if change password
  if (req.body.password) {
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // check if change username and if already exists

  if (req.body.username) {
    const user = await User.findOne({ username: req.body.username });

    if (user && user.username !== reqUser.username) {
      return res.status(409).json({
        msg: "Usuário já está em uso",
      });
    }
  }

  // check if change email and if already exists
  if (req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.email !== reqUser.email) {
      return res.status(409).json({
        msg: "O email já está em uso",
      });
    }
  }

  const updatedUser = await User.updatePartial(user.id, { ...req.body });

  if (!updatedUser) {
    return res.status(400).json({
      msg: "Erro ao atualizar usuário, tente novamente mais tarde",
    });
  }

  // Remove password from response
  const { password: userPassword, ...responseData } = updatedUser;
  return res.status(201).json(responseData);
};

const getUserReadings = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `Usuário não encontrado para ${username}` });
    }
    const { name, readings } = user;
    return res.status(200).json({
      msg: `Usuário ${name} foi lido ${readings} ${
        readings !== 1 ? "vezes" : "vez"
      }`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Erro no servidor ao buscar usuário ${username}` });
  }
};

const userAuth = async (req, res) => {
  const { username, password } = req.body;

  // try found the user
  const user = await User.findOne({ username });

  // check if user exists
  if (!user) {
    res.status(404).json({ msg: "O usuário não existe" });
    return;
  }

  // check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ msg: "Senha inválida" });
    return;
  }

  // Return user with token
  res.status(200).json({
    userId: user.id,
    token: generateToken(user.id, user.username),
  });
};

const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `Usuário não encontrado para ${username}` });
    }
    await User.deleteById(user.id);
    return res.status(201).json({
      msg: `Usuário ${username} deletado com sucesso!`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Erro no servidor ao deletar usuário ${username}` });
  }
};

const getLoggedUserInfo = async (req, res) => {
  const reqUser = req.user;

  try {
    const user = await User.findOne({ username: reqUser.username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `Usuário não encontrado para ${username}` });
    }

    // Remove password from response
    const { password: userPassword, ...responseData } = user;

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({
      msg: `Erro no servidor ao buscar informações do usuário logado`,
    });
  }
};
module.exports = {
  getUsers,
  getUserByUserName,
  createUser,
  getUserReadings,
  updateUser,
  userAuth,
  deleteUser,
  getLoggedUserInfo,
};
