const UserData = [
  {
    id: 1,
    name: "Administrador",
    job: "CTO",
    email: "admin@sfcbrazil.com",
    username: "admin",
    password: "$2a$10$P/F2FjxbTW9iV6ZuVZMviOksb/ewXNBhrENMCHmCaFgUpLwOpvZQy", //sfcBrazil
    role: ["user", "admin"],
    readings: 0,
  },
];

// Fake DB Function to create a new user
const create = ({ name, job, role, email, username, password }) => {
  // get the last id e add +1
  const id = UserData.reduce((lastId, user) => {
    return Math.max(lastId, user.id) + 1;
  }, 0);

  const newUser = {
    id,
    name,
    job,
    role: role || ["user"],
    email,
    username,
    password,
    readings: 0,
  };
  UserData.push(newUser);
  return newUser;
};

// Fake DB Function to find one user
const findOne = ({ name, email, username }) => {
  try {
    const user = UserData.find(
      (user) =>
        (name && user.name.toLowerCase() === name.toLowerCase()) ||
        (email && user.email === email) ||
        (username && user.username === username)
    );

    return user;
  } catch {
    return null;
  }
};

// Fake DB Function to find user by id
const findById = (userId) => {
  try {
    const user = UserData.find(({ id }) => id === userId);

    return user;
  } catch {
    return null;
  }
};

// Fake DB Function to find one user
const find = ({ ...params }) => {
  const hasParams = Object.keys(params).length !== 0;

  try {
    const users = hasParams
      ? UserData.filter(
          (user) =>
            (params.id && user.id === params.id) ||
            (params.name &&
              user.name.toLowerCase() === params.name.toLowerCase()) ||
            (params.email && user.email === params.email) ||
            (params.username && user.username === params.username)
        )
      : UserData;
    // Remove password from response data
    const responseData = users.map(({ password, ...user }) => user);
    return users;
  } catch {
    return null;
  }
};

const updatePartial = (userId, data) => {
  try {
    const userIndex = UserData.findIndex(({ id }) => id === userId);
    UserData[userIndex] = { ...UserData[userIndex], ...data };

    const user = UserData.find(({ id }) => id === userId);

    return user;
  } catch (error) {
    return null;
  }
};

const deleteById = (userId) => {
  try {
    const userIndex = UserData.findIndex(({ id }) => id === userId);

    UserData.splice(userIndex, 1);

    return UserData;
  } catch (error) {
    return null;
  }
};

const User = {
  create,
  findOne,
  findById,
  find,
  updatePartial,
  deleteById,
};

module.exports = User;
