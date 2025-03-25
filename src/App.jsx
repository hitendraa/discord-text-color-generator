import { Button, Container, Paper, Stack, Text, Title } from "@mantine/core"
import Buttons from "./Buttons"
import TextEditor from "./TextEditor"


function App() {
  

  return (
    <Container size="lg">
        <Stack gap="xl">
          <Title>Discord <Text span c="discord" inherit>Colored</Text> Text Genrator</Title>
          <Paper shadow="sm" p="md" radius="md" withBorder>
          <Title order={3} mb="md">About</Title>
          <Text mb="sm">This is a simple app that creates colored Discord messages using the ANSI color codes available on the latest Discord desktop versions.</Text>
          <Text>To use this, write your text, select parts of it and assign colors to them, then copy it using the button below, and send in a Discord message.</Text>
          </Paper>
          <Paper shadow="md" p="xl" radius="md" withBorder>
          <Title order={2} mb="lg" >Create your text</Title>
          <Buttons />
          <TextEditor />
          
        </Paper>
        <Text size="sm" c="dimmed" ta="center">
          This is an unofficial tool, it is not made or endorsed by Discord.
        </Text>
        </Stack>

    </Container>
  )
}

export default App
