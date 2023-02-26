import { Container, Icon, Link } from "@chakra-ui/react";
import { EmailIcon } from "./Icons";

const Footer = () => {
  return (
    <Container mt={2} textAlign="right">
      <Link color="blackAlpha.600" href="mailto:contact@packyourbags.zone">
        Contact me
        <EmailIcon ml="6px" />
      </Link>
    </Container>
  );
}
 
export default Footer;
