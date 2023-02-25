import { Container, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Container mb={[6, 10]} centerContent>
      <Heading
        as="h1"
        size="xl"
        color="yellow.50"
        mb={[2, 5]}
        fontFamily="heading"
        textShadow="2px 2px 0 var(--chakra-colors-orange-500),
                    4px 4px 0 var(--chakra-colors-yellow-500),
                    6px 6px 0 var(--chakra-colors-cyan-500)"
      >
        The Bag Packing List
      </Heading>
      <Text color="white" fontSize={["lg", "xl"]} fontWeight="semibold" bg="whiteAlpha.300" py={1} px={2}>
        Pack your bags and let's go 🚀
      </Text>
    </Container>
  );
};

export default Header;
