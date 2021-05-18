import { Button } from '@material-ui/core';

type TextButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};
export const TextButton = (props: TextButtonProps) => {
  return (
    <Button onClick={props.onClick} disabled={props.disabled} variant="contained" color="primary">
      {props.label}
    </Button>
  );
};
