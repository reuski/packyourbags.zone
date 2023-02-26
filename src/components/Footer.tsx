import { Container, Icon, Link } from "@chakra-ui/react";
import { ReactElement } from "react";

const Footer = () => {
  const EmailIcon = (): ReactElement => (
    <Icon viewBox="0 0 24 24" ml="6px">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    </Icon>
  );

  return (
    <Container mt={2} textAlign="right">
      <Link color="blackAlpha.500" href="mailto:contact@packyourbags.zone">
        Contact me
        <EmailIcon />
      </Link>
    </Container>
  );
}
 
export default Footer;
