const express = require("express");
const router = express.Router();
const axios = require("axios");
const Response = require("../utils/response");

router.get("/movies", async (req, res) => {
  try {
    const response = await axios.get("https://dummyapi.online/api/movies");
    return Response(200, response.data, "success", res);
  } catch (error) {
    console.log(error);
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/movies/${req.params.id}`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/blogposts", async (req, res) => {
  try {
    const response = await axios.get(`https://dummyapi.online/api/blogposts`);
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/blogposts/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/blogposts/${req.params.id}`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`https://dummyapi.online/api/users`);
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/users/${req.params.id}`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/pokemon", async (req, res) => {
  try {
    const response = await axios.get(`https://dummyapi.online/api/pokemon`);
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/pokemon/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/pokemon/${req.params.id}`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`https://dummyapi.online/api/products`);
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/products/${req.params.id}`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/todos", async (req, res) => {
  try {
    const response = await axios.get(`https://dummyapi.online/api/todos`);
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/todos/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/todos/${req.params.id}`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/social-profiles", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/social-profiles`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

router.get("/social-profiles/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dummyapi.online/api/social-profiles/${req.params.id}`
    );
    return Response(200, response.data, "success", res);
  } catch (error) {
    return Response(500, error, "Internal Server Error", res);
  }
});

module.exports = router;
