import { Typography } from "@material-ui/core";

type BodyProps = { text: string };
export const Body = ({ text }: BodyProps) => {
  return <Typography variant="body1">{text}</Typography>;
};
