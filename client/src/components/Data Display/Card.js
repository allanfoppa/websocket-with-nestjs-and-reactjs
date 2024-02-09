import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export const CardComponent = ({
  status,
  editPerson,
  removePerson,
  label,
}) => {

  const [ editing, setEditing ] = useState(false)
  const [ inputValue, setInputValue ] = useState(label);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return(
    <ScaleFade initialScale={0.9} in>
      <Card w="full" bg={status ? "blackAlpha.300" : ""}>
        <CardBody
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {editing
              ? (
                <InputGroup>
                  <Input
                    placeholder={label}
                    value={inputValue}
                    onChange={handleInputChange}
                    variant='flushed'
                  />
                  <InputRightElement>
                    <AddIcon
                      color='blue.500'
                      cursor="pointer"
                      onClick={() => {
                        editPerson(inputValue)
                        setEditing(false)
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
              )
              : <Text>{label}</Text>
            }
          </Box>
          <Box>
            <IconButton
              aria-label="edit task"
              variant="ghost"
              colorScheme="gray"
              icon={<EditIcon />}
              onClick={() => {
                setEditing(true);
                setInputValue(label);
              }}
            />
            <IconButton
              aria-label="delete task"
              variant="ghost"
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={removePerson}
            />
          </Box>
        </CardBody>
      </Card>
    </ScaleFade>
  )
}
