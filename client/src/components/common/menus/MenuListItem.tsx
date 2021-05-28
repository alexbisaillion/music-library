import { ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";

type MenuListItemProps = {
  onClick: () => void;
  text: string;
  icon?: JSX.Element;
};
export const MenuListItem = ({ onClick, text, icon }: MenuListItemProps) => {
  return (
    <MenuItem onClick={onClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} />
    </MenuItem>
  );
};
