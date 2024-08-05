const prisma = require("../config/config");

const createUser = async (name, email, password) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getUsersbyId = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getuserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exsports = {
  createUser,
  getUsersbyId,
  deleteUser,
  getuserByEmail,
};
