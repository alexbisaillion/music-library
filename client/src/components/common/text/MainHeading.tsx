import { Typography } from "@material-ui/core";

type MainHeadingProps = { text: string };
export const MainHeading = ({ text }: MainHeadingProps) => {
  return <Typography variant="h1">{text}</Typography>;
};
