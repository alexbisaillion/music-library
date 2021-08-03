import { Typography } from "@material-ui/core";

type HeadingProps = { className?: string; text: string; isSecondary?: boolean };
export const Heading = ({ className, text, isSecondary }: HeadingProps) => {
  return (
    <Typography
      className={className}
      variant="h6"
      color={isSecondary ? "textSecondary" : undefined}
    >
      {text}
    </Typography>
  );
};
