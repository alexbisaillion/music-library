import MaterialUIChip from "@material-ui/core/Chip";

type ChipProps = {
  label: string;
  icon?: JSX.Element;
};
export const Chip = ({ label, icon }: ChipProps) => {
  return <MaterialUIChip color="primary" icon={icon} label={label} />;
};
