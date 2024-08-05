const prisma = require("../config/config");

const createCard = async (title, description, rating, comentar, user_id) => {
  try {
    const card = await prisma.card.create({
      data: {
        title,
        description,
        rating,
        comentar,
        user_id,
      },
    });
    return card;
  } catch (error) {
    throw error;
  }
};

const getCardById = async (id) => {
  try {
    const card = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
    });
    return card;
  } catch (error) {
    throw error;
  }
};

const getallCard = async () => {
  try {
    const card = await prisma.card.findMany();
    return card;
  } catch (error) {
    throw error;
  }
};

const allcardbyuser = async (user_id) => {
  try {
    const card = await prisma.card.findMany({
      where: {
        user_id,
      },
    });
    return card;
  } catch (error) {
    throw error;
  }
};

const updateCard = async (id, title, description, rating, comentar) => {
  try {
    const card = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        rating,
        comentar,
      },
    });
    return card;
  } catch (error) {
    throw error;
  }
};

const deleteCard = async (id) => {
  try {
    const card = await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });
    return card;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCard,
  getCardById,
  updateCard,
  deleteCard,
  getallCard,
  allcardbyuser,
};
