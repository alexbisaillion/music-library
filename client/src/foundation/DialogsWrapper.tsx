import { useDialog, DialogType } from "../context/dialogs-context";
import { LoginDialog } from "../components/functional/authentication/LoginDialog";

const dialogComponentMap: Map<DialogType, JSX.Element> = new Map([
  [DialogType.Login, <LoginDialog />],
]);

export const DialogsWrapper = () => {
  const { currentDialog } = useDialog();

  if (currentDialog === undefined) {
    return <></>;
  }

  const dialogComponent = dialogComponentMap.get(currentDialog);
  if (!dialogComponent) {
    return <></>;
  }

  return dialogComponent;
};
