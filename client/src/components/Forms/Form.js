import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input } from "@chakra-ui/react";

export const FormComponent = ({
  value,
  createPerson,
  changeInput
}) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" gap={2}>
      <Input placeholder="Create person" value={value} onChange={changeInput} />
      <IconButton
        aria-label="Create person"
        onClick={createPerson}
        colorScheme="blue"
        icon={<AddIcon />}
      />
    </Flex>
  );
};
