import { Typography } from "@material-ui/core";

type ParagraphProps = { text: string };
export const Paragraph = ({ text }: ParagraphProps) => {
  return <Typography variant="body2">{text}</Typography>;
};
