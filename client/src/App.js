import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { WebsocketContext } from './contexts/WebsocketContext';
import { CardComponent } from './components/Data Display/Card';
import {
  Alert, AlertDescription, AlertIcon, AlertTitle,
  Box, Flex, HStack, Img
} from "@chakra-ui/react";
import { FormComponent } from './components/Forms/Form';
import { useToastHook } from './hooks/useToats';

import logo from './assets/images/logo.png';

function App() {

  const socket = useContext(WebsocketContext);
  const [ state, newToast ] = useToastHook();

  const [ people, setPeople ] = useState([]);
  const [ tasks, setTasks ] = useState([]);
  const [ taskInput, setTaskInput ] = useState("");

  useEffect(() => {

    socket.emit('fetchPeople', {});

    // SEE HOW JOIN RESPONSES
    // PROBABLY SWITCH CASE
    socket.on('fetchPeopleResponse', (data) => {
      setPeople(data);
    });

    socket.on('addPersonResponse', (data) => {
      newToast({ message: `Person ${data.person.name} added with success!`, status: "success" });
      setPeople(data.people);
    });

    socket.on('deletePersonResponse', (data) => {
      newToast({ message: `Person deleted with success!`, status: "success" });
      setPeople(data.people);
    });

    socket.on('responseError', (error) => {
      newToast({ message: error.message, status: "error" });
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.off("fetchPeople");
      socket.off("fetchPeopleResponse");
      socket.off("addPersonResponse");
      socket.off("deletePersonResponse");
      socket.off("responseError");
    };

  }, [socket]);

  const handleChangeInput = (e) => {
    setTaskInput(e.currentTarget.value);
  };

  // CREATE PERSON
  const handleCreatePerson = () => {
    socket.emit('addPerson', taskInput);
  };

  // DELETE PERSON
  const handleRemovePerson = (id) => {
    console.log("[iddddd]", id);
    socket.emit('deletePerson', id);
  };

  // EDIT PERSON
  const handleEditPerson = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: false } : task))
    );
  };

  return (
    <HStack
      w="full"
      h="100vh"
      alignItems="center"
      flexDirection="column"
      p={10}
    >
      <Flex w="full" maxWidth={400} flexDirection="column" gap={4}>
        <Img src={logo} alt="Logo" />

        <FormComponent
          changeInput={handleChangeInput}
          value={taskInput}
          createPerson={handleCreatePerson}
        />

        {people.length !== 0 ? (
          people.map(person => (
            <CardComponent
              key={person.id}
              id={person.id}
              label={person.name}
              status={person.status}
              removePerson={() => handleRemovePerson(person.id)}
            />
          ))
        ) : (
          <Alert status="info" borderRadius={6}>
            <AlertIcon />
            <Box>
              <AlertTitle>No person registered!</AlertTitle>
              <AlertDescription>Start registering and have fun. ;)</AlertDescription>
            </Box>
          </Alert>
        )}

      </Flex>
    </HStack>
  );
}

export default App;
