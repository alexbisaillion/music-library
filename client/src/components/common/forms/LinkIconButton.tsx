import { forwardRef } from "react";
import { IconButton as MaterialIconButton } from "@material-ui/core";

type LinkIconButtonProps = {
  className?: string;
  icon: JSX.Element;
  link: string;
};
export const LinkIconButton = forwardRef<
  HTMLButtonElement,
  LinkIconButtonProps
>(({ className, icon, link }, ref) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <MaterialIconButton ref={ref} className={className}>
        {icon}
      </MaterialIconButton>
    </a>
  );
});
