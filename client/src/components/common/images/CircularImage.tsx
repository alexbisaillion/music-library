import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const StyledAvatar = styled(Avatar)`
  && {
    height: 50px;
    width: 50px;
  }
`;

type CircularImageProps = { image: string; alt: string };
export const CircularImage = ({ image, alt }: CircularImageProps) => {
  return <StyledAvatar src={image} alt={alt} />;
};
