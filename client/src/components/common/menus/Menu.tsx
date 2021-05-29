import { Menu as MaterialMenu } from "@material-ui/core";
import { FunctionComponent } from "react";
import { MenuContext } from "../../../context/menu-context";

type MenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  anchorEl: HTMLButtonElement | null;
};
export const Menu: FunctionComponent<MenuProps> = ({
  isOpen,
  toggleMenu,
  anchorEl,
  children,
}) => {
  return (
    <MenuContext.Provider value={{ toggleMenu: toggleMenu }}>
      <MaterialMenu
        anchorEl={anchorEl}
        // Apply the following props to place the menu below the AppBar:
        // getContentAnchorEl={null}
        // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        // transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpen}
        onClose={toggleMenu}
      >
        {children}
      </MaterialMenu>
    </MenuContext.Provider>
  );
};
