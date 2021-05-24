import { Typography } from "@material-ui/core";
import { TypewriterText } from "./TypewriterText";

type SecondaryHeadingProps = {
  text: string | string[];
  useTypewriterEffect?: boolean;
};
export const SecondaryHeading = ({
  text,
  useTypewriterEffect,
}: SecondaryHeadingProps) => {
  return (
    <Typography variant="h4">
      {useTypewriterEffect ? <TypewriterText text={text} /> : text}
    </Typography>
  );
};
