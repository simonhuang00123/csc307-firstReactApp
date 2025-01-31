// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

  function MyApp() {
    const [characters, setCharacters] = useState([]);

    function updateList(person) {
      postUser(person)
        .then((res) => {
          if (res.status === 201) { 
            return res.json();
          }
        })
        .then((data) => {
          setCharacters([...characters, data]); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    function removeOneCharacter(index) {
      const userId = characters[index].id;
      fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
      })
        .then(() => {
          setCharacters(characters.filter((_, i) => i !== index));
        });
    }
    
    

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
          console.log(error);
        });
    }, []);

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });
    
      return promise;
    }

      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );
  }

export default MyApp;