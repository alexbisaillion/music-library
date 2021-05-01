import { InputAdornment, TextField, Tooltip } from '@material-ui/core';

type TextInputProps = {
  icon?: JSX.Element;
  value: string;
  setValue: (newValue: string) => void;
  label: string;
  isExternal: boolean;
  id?: string;
};
export const TextInput = (props: TextInputProps) => {
  const { icon, value, setValue, label, isExternal, id } = props;

  const startIcon = icon ? { startAdornment: <InputAdornment position="start">{icon}</InputAdornment> } : undefined;

  const input = (
    <TextField
      value={value}
      label={label}
      onChange={(e) => setValue(e.target.value)}
      color={isExternal ? 'secondary' : 'primary'}
      variant="filled"
      InputProps={startIcon}
    />
  );

  if (id) {
    return <Tooltip title={id}>{input}</Tooltip>;
  }

  return input;
};
