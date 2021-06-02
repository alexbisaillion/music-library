import { Typography } from "@material-ui/core";

type SubtitleProps = { text: string };
export const Subtitle = ({ text }: SubtitleProps) => {
  return <Typography variant="subtitle1">{text}</Typography>;
};
