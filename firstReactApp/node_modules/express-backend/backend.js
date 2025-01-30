// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        id: "abc789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Bob",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const index = users.users_list.findIndex((user) => user.id === userId);
  
    if (index === -1) {
      return res.status(404).send("resource not found");
    }
      users.users_list.splice(index, 1);
      res.status(204).send();
  });

const findUsersByNameAndJob = (name, job) => {
    return users.users_list.filter(
      (user) => user.name === name && user.job === job
    );
};
  
app.get("/users", (req, res) => {
    const { name, job } = req.query; 
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
});

const generateRandomId = () => {
  return Math.random();
}
app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.job) {
      return res.status(400).send("All fields must be filled");
  }
  newUser.id = generateRandomId();
  users.users_list.push(newUser);
  res.status(201).json(newUser); 
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});