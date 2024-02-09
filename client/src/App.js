import React, { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './contexts/WebsocketContext';
import { CardComponent } from './components/Data Display/Card';
import { Flex, HStack } from "@chakra-ui/react";
import { FormComponent } from './components/Forms/Form';
import { useToastHook } from './hooks/useToats';
import { NoPeopleRegistered } from './components/Feedback/NoPeopleRegistered';
import { Logo } from './components/Media and Icons/Logo';
import { ToggleTheme } from './components/Media and Icons/ToggleTheme';

function App() {

  const socket = useContext(WebsocketContext);

  const [ state, newToast ] = useToastHook();

  const [ people, setPeople ] = useState([]);
  const [ nameInput, setNameInput ] = useState("");

  useEffect(() => {

    socket.emit('fetchPeople', {});

    // TODO: SEE HOW JOIN RESPONSES
    // PROBABLY SWITCH CASE
    socket.on('fetchPeopleResponse', (data) => {
      setPeople(data);
    });

    socket.on('addPersonResponse', (data) => {
      newToast({ message: `${data.person.name} added with success!`, status: "success" });
      setPeople(data.people);
    });

    socket.on('editPersonResponse', (data) => {
      newToast({ message: `Updated with success!`, status: "success" });
      setPeople(data.people);
    });

    socket.on('deletePersonResponse', (data) => {
      newToast({ message: `Deleted with success!`, status: "success" });
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
      socket.off("editPersonResponse");
      socket.off("deletePersonResponse");
      socket.off("responseError");
    };

  }, [socket]);

  // CHANGE NAME INPUT
  const handleChangeInput = (e) => {
    setNameInput(e.currentTarget.value);
  };

  // CREATE PERSON
  const handleCreatePerson = () => {
    socket.emit('addPerson', nameInput);
    setNameInput('')
  };

  // DELETE PERSON
  const handleRemovePerson = (id) => {
    socket.emit('deletePerson', id);
  };

  // EDIT PERSON
  const handleEditPerson = (id, name) => {
    socket.emit('editPerson', { id, name });
  };

  return (
    <HStack
      w="full"
      h="100vh"
      alignItems="center"
      flexDirection="column"
      p={10}
    >
      <ToggleTheme />
      <Flex w="full" maxWidth={400} flexDirection="column" gap={4}>
        <Logo />

        <FormComponent
          changeInput={handleChangeInput}
          value={nameInput}
          createPerson={handleCreatePerson}
        />

        {people.length !== 0 ? (
          people.map(person => (
            <CardComponent
              key={person.id}
              id={person.id}
              label={person.name}
              status={person.status}
              editPerson={(inputValue) => {
                console.log("[e]", inputValue);
                handleEditPerson(person.id, inputValue)
              }}
              removePerson={() => handleRemovePerson(person.id)}
            />
          ))
        ) : (
          <NoPeopleRegistered />
        )}

      </Flex>
    </HStack>
  );
}

export default App;
