import { Typography } from "@material-ui/core";

type SecondaryHeadingProps = { text: string };
export const SecondaryHeading = ({ text }: SecondaryHeadingProps) => {
  return <Typography variant="h4">{text}</Typography>;
};
