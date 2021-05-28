import { IconButton as MaterialIconButton } from "@material-ui/core";

type IconButtonProps = {
  className?: string;
  icon: JSX.Element;
  onClick: () => void;
};
export const IconButton = ({ className, icon, onClick }: IconButtonProps) => {
  return (
    <MaterialIconButton className={className} onClick={onClick}>
      {icon}
    </MaterialIconButton>
  );
};
