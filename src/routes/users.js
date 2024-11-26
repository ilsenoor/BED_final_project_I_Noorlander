import express from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUsersByID.js";
import updateUserById from "../services/users/updateUserByID.js";
import deleteUser from "../services/users/deleteUser.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { username, email } = req.query;
  const users = await getUsers(username, email);
  res.status(200).json(users);
});

router.post("/", authMiddleware, async (req, res) => {
  const { username, password, name, email, phoneNumber, profilePicture } =
    req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  const newUser = await createUser(
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
  );
  res.status(201).json(newUser);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const updatedUser = await updateUserById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUserId = await deleteUser(id);

      res.status(200).json({
        message: `User with id ${deletedUserId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
