import { createContext, FunctionComponent, useContext, useState } from "react";

export enum DialogType {
  Login,
}

type DialogsContextProps = {
  currentDialog: DialogType | undefined;
  showDialog: (dialogType: DialogType) => void;
  hideDialog: (dialogType: DialogType) => void;
};

export const DialogsContext =
  createContext<DialogsContextProps | undefined>(undefined);

export const DialogsProvider: FunctionComponent = ({ children }) => {
  const [currentDialog, setCurrentDialog] = useState<DialogType>();

  const showDialog = (dialogType: DialogType) => {
    if (currentDialog) {
      return;
    }
    setCurrentDialog(dialogType);
  };

  const hideDialog = (dialogType: DialogType) => {
    if (currentDialog !== dialogType) {
      return;
    }
    setCurrentDialog(undefined);
  };

  return (
    <DialogsContext.Provider value={{ currentDialog, showDialog, hideDialog }}>
      {children}
    </DialogsContext.Provider>
  );
};

export const useDialogs = () => {
  const context = useContext(DialogsContext);
  if (!context) {
    throw new Error("Unable to access useDialogs without provider wrapper");
  }
  return context;
};
