import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // Connect to the "users" database
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Get all users or filter by name and/or job
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    userService
      .getUsers(name, job) 
      .then((users) => res.json({ users_list: users }))
      .catch((err) => res.status(500).send(err.message));
  }
  else if (name) {
    userService
      .findUserByName(name)
      .then((users) => res.json({ users_list: users }))
      .catch((err) => res.status(500).send(err.message));
  }
  else if (job) {
    userService
      .findUserByJob(job)
      .then((users) => res.json({ users_list: users }))
      .catch((err) => res.status(500).send(err.message));
  }
  else {
    userService
      .getUsers()
      .then((users) => res.json({ users_list: users }))
      .catch((err) => res.status(500).send(err.message));
  }
});

// Create and insert a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.job) {
    return res.status(400).send("All fields must be filled");
  }

  userService
    .addUser(newUser)
    .then((savedUser) => res.status(201).json(savedUser))
    .catch((err) => res.status(500).send(err.message));
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  userService
    .findUserById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.json(user);
    })
    .catch((err) => res.status(500).send(err.message));
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);  

  userService
    .findUserByIdAndDelete(userId)
    .then((deletedUser) => {
      //console.log("deletedUser:", deletedUser);  // Log the result of the deletion
      if (!deletedUser) {
        return res.status(404).send("User not found");
      }
      return res.status(204).send(); 
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).send(err.message);
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
