import { createContext, useContext } from "react";

type MenuContextProps = { toggleMenu: () => void };

export const MenuContext =
  createContext<MenuContextProps | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Unable to access useMenu without provider wrapper");
  }
  return context;
};
