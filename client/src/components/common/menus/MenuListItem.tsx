import { forwardRef } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";

type MenuListItemProps = {
  onClick: () => void;
  text: string;
  icon?: JSX.Element;
};
export const MenuListItem = forwardRef<HTMLLIElement, MenuListItemProps>(
  ({ onClick, text, icon }, ref) => {
    return (
      <MenuItem onClick={onClick} ref={ref}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </MenuItem>
    );
  }
);
