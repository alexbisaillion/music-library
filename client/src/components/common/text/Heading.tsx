import { Typography } from "@material-ui/core";

type HeadingProps = { text: string; isSecondary?: boolean };
export const Heading = ({ text, isSecondary }: HeadingProps) => {
  return (
    <Typography variant="h6" color={isSecondary ? "textSecondary" : undefined}>
      {text}
    </Typography>
  );
};
