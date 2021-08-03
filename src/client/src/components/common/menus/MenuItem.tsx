import { forwardRef } from "react";
import {
  ListItemIcon,
  ListItemText,
  MenuItem as MaterialMenuItem,
} from "@material-ui/core";
import { useMenu } from "../../../context/menu-context";

type MenuItemProps = {
  onClick: () => void;
  text: string;
  icon?: JSX.Element;
};
export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ onClick, text, icon }, ref) => {
    const { toggleMenu } = useMenu();
    return (
      <MaterialMenuItem
        onClick={() => {
          onClick();
          toggleMenu();
        }}
        ref={ref}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </MaterialMenuItem>
    );
  }
);
