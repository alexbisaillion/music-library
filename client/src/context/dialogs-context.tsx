import { createContext, FunctionComponent, useContext, useState } from "react";

export enum DialogType {
  Login,
}

type DialogContextProps = {
  currentDialog: DialogType | undefined;
  showDialog: (dialogType: DialogType) => void;
  hideDialog: () => void;
};

export const DialogContext =
  createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: FunctionComponent = ({ children }) => {
  const [currentDialog, setCurrentDialog] = useState<DialogType>();

  const showDialog = (dialogType: DialogType) => {
    if (currentDialog) {
      console.warn(
        "Attempted to show a dialog without closing the existing dialog"
      );
      return;
    }
    setCurrentDialog(dialogType);
  };

  const hideDialog = () => {
    if (currentDialog === undefined) {
      console.warn("Attempted to hide a dialog without any existing dialogs");
      return;
    }
    setCurrentDialog(undefined);
  };

  return (
    <DialogContext.Provider value={{ currentDialog, showDialog, hideDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Unable to access useDialogs without provider wrapper");
  }
  return context;
};
