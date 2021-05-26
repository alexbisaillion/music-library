import { Typography } from "@material-ui/core";

type HeadingProps = { text: string };
export const Heading = ({ text }: HeadingProps) => {
  return <Typography variant="h6">{text}</Typography>;
};
