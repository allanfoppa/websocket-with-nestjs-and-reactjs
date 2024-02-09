import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from "@chakra-ui/react"

export const NoPeopleRegistered = () => {
  return(
    <Alert status="info" borderRadius={6}>
      <AlertIcon />
      <Box>
        <AlertTitle>No person registered!</AlertTitle>
        <AlertDescription>Start registering and have fun. ;)</AlertDescription>
      </Box>
    </Alert>
  )
}
