import { forwardRef } from "react";
import { IconButton as MaterialIconButton } from "@material-ui/core";

type IconButtonProps = {
  className?: string;
  icon: JSX.Element;
  onClick: () => void;
};
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, onClick }, ref) => {
    return (
      <MaterialIconButton ref={ref} className={className} onClick={onClick}>
        {icon}
      </MaterialIconButton>
    );
  }
);
