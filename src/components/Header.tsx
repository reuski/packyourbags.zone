import { Container, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Container mb={[6, 10]} centerContent>
      <Heading
        as="h1"
        size={["2xl", "2xl"]}
        color="yellow.50"
        mb={[2, 5]}
        fontFamily="heading"
        textShadow="2px 2px 0 #eb452b,
                    4px 4px 0 #efa032,
                    6px 6px 0 #46b59b;"
      >
        Bag Packing List
      </Heading>
      <Text color="white" fontSize={["lg", "2xl"]} fontWeight="semibold" bg="whiteAlpha.300" py={1} px={2}>
        Pack your bags and let's go 🚀
      </Text>
    </Container>
  );
};

export default Header;
