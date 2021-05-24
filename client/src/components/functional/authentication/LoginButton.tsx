import { useState } from "react";
import { TextButton } from "../../common/forms/TextButton";
import { LoginDialog } from "./LoginDialog";

export const LoginButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TextButton label="Log in" onClick={() => setIsDialogOpen(true)} />
      <LoginDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};
