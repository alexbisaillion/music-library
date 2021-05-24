import { useAuthentication } from "../../../context/authentication";
import { TextButton } from "../../common/forms/TextButton";

export const LogoutButton = () => {
  const { attemptLogout } = useAuthentication();
  return <TextButton label="Log out" onClick={attemptLogout} />;
};
