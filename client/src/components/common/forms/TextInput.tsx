import { IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';

type TextInputProps = {
  icon?: JSX.Element;
  action?: () => void;
  value: string;
  setValue: (newValue: string) => void;
  label: string;
  isExternal: boolean;
  id?: string;
  disabled?: boolean;
};
export const TextInput = (props: TextInputProps) => {
  const { icon, action, value, setValue, label, isExternal, id, disabled } = props;

  const renderAdornment = () => {
    if (!icon) {
      return undefined;
    }
    if (!action) {
      return { startAdornment: <InputAdornment position="start">{icon}</InputAdornment> };
    }
    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton disabled={disabled} onClick={action}>
            {icon}
          </IconButton>
        </InputAdornment>
      )
    };
  };

  const input = (
    <TextField
      value={value}
      label={label}
      onChange={(e) => setValue(e.target.value)}
      color={isExternal ? 'secondary' : 'primary'}
      variant="filled"
      InputProps={renderAdornment()}
      disabled={disabled}
    />
  );

  if (id) {
    return <Tooltip title={id}>{input}</Tooltip>;
  }

  return input;
};
