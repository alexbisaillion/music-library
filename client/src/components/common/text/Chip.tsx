import MaterialUIChip from "@material-ui/core/Chip";
import styled from "styled-components";

const IconContainer = styled.div`
  display: flex;
  padding-left: 2px;
`;

type ChipProps = {
  displayValue: string;
  icon?: JSX.Element;
};
export const Chip = ({ displayValue, icon }: ChipProps) => {
  return (
    <MaterialUIChip
      color="primary"
      icon={<IconContainer>{icon}</IconContainer>}
      label={displayValue}
    />
  );
};
