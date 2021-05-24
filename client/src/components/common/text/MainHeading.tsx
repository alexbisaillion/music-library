import { Typography } from "@material-ui/core";
import { TypewriterText } from "./TypewriterText";

type MainHeadingProps = {
  text: string;
  useTypewriterEffect?: boolean;
};
export const MainHeading = ({
  text,
  useTypewriterEffect,
}: MainHeadingProps) => {
  return (
    <Typography variant="h1">
      {useTypewriterEffect ? <TypewriterText text={[text]} /> : text}
    </Typography>
  );
};
