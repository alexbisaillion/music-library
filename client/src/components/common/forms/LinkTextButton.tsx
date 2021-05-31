import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledAnchor = styled.a`
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

type LinkTextButtonProps = {
  label: string;
  link: string;
  isInternal: boolean;
};
export const LinkTextButton = ({
  label,
  link,
  isInternal,
}: LinkTextButtonProps) => {
  const button = <Button>{label}</Button>;

  if (isInternal) {
    return <StyledLink to={link}>{button}</StyledLink>;
  }
  return (
    <StyledAnchor href={link} target="_blank" rel="noopener noreferrer">
      {button}
    </StyledAnchor>
  );
};
