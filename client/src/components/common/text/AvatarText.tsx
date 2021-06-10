import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const StyledAvatar = styled(Avatar)`
  && {
    color: white;
    height: 50px;
    width: 50px;
    font-size: 28px;
    background-color: #d50000;
  }
`;

type AvatarTextProps = { text: string };
export const AvatarText = ({ text }: AvatarTextProps) => {
  return <StyledAvatar color="secondary">{text}</StyledAvatar>;
};
