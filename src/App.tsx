import { Container } from "@chakra-ui/react";
import Header from "./components/Header";
import PackingList from "./components/PackingList";
import Footer from "./components/Footer";

function App() {
  return (
    <Container maxW="lg" py={12}>
      <Header />
      <PackingList />
      <Footer />
    </Container>
  );
}

export default App;
