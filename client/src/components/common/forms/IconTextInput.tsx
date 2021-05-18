import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { TextInput } from './TextInput';

const IconTextInputContainer = styled.div`
  display: flex;
`;

type TextInputProps = {
  icon: JSX.Element;
  disabled: boolean;
  value: string;
  setValue: (newValue: string) => void;
  label: string;
  isExternal: boolean;
  id?: string;
};
export const IconTextInput = (props: TextInputProps) => {
  const { icon, disabled } = props;

  return (
    <IconTextInputContainer>
      <IconButton disabled={disabled}>{icon}</IconButton>
      <TextInput {...props} />
    </IconTextInputContainer>
  );
};
