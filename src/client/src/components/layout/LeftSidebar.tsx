import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AlbumIcon } from "../icons/material-icons";

type LeftSidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};
export const LeftSidebar = (props: LeftSidebarProps) => {
  const { isOpen, toggleSidebar } = props;

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
      <div role="presentation">
        <List>
          <ListItem
            button
            component={Link}
            to="/register-album"
            onClick={toggleSidebar}
          >
            <ListItemIcon>
              <AlbumIcon />
            </ListItemIcon>
            <ListItemText primary="Register Album" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
