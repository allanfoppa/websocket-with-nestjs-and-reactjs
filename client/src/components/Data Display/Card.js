import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  IconButton,
  ScaleFade,
  Text,
} from "@chakra-ui/react";

export const CardComponent = ({
  status,
  editPerson,
  removePerson,
  label,
}) => {
  return(
    <ScaleFade initialScale={0.9} in>
      <Card w="full" bg={status ? "blackAlpha.300" : ""}>
        <CardBody
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Text as={status ? "del" : "b"}>{label}</Text>
          </Box>
          <Box>
            <IconButton
              aria-label="edit task"
              variant="ghost"
              colorScheme="gray"
              icon={<EditIcon />}
              onClick={editPerson}
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
