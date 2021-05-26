import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ExperienceIcon,
  HomePageIcon,
  ProjectsIcon,
} from "../icons/material-icons";

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
          <ListItem button component={Link} to="/" onClick={toggleSidebar}>
            <ListItemIcon>
              <HomePageIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/experience"
            onClick={toggleSidebar}
          >
            <ListItemIcon>
              <ExperienceIcon />
            </ListItemIcon>
            <ListItemText primary="Experience" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/projects"
            onClick={toggleSidebar}
          >
            <ListItemIcon>
              <ProjectsIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
