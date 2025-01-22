// backend.js
import express from "express";

const app = express();
const port = 8000;

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
/*
  app.get("/users", (req, res) => {
    res.send(users);
  });

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  
app.get("/users", (req, res) => {
const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});


const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});
*/
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const index = users["users_list"].findIndex((user) => user.id === id);

    if (index === -1) {
        res.send("id not found");
    } else {
        users["users_list"].splice(index, 1); 
        res.send("user deleted");
    }
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

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});