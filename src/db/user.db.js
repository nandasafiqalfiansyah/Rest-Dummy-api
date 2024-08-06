const prisma = require("../config/config");

const createUser = async (name, email, password, url_profile, bio, rating) => {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        url_profile,
        bio,
        rating,
      },
    });
  } catch (error) {
    if (error.code === "P2002" && error.meta && error.meta.target === "email") {
      return { status: "error", message: "Email already exists" };
    }
    return {
      status: "error",
      message: "An error occurred while creating the user",
      error,
    };
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

const GetuserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUser,
  getUsersbyId,
  deleteUser,
  GetuserByEmail,
};
