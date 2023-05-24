import { MenuItem } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";

import { isDev } from "@result-system/shared/utility";

import { useLogoutMutation } from "../../app/services/auth.api";
import { WEB_KEYS } from "../../utility/constants";

interface Props {
  onClick?(): void;
}

export default function LogoutMenuItem({ onClick }: Props) {
  const [logout] = useLogoutMutation();
  const [, setPersist] = useLocalStorage(WEB_KEYS.persist, false);

  const handleLogout = async () => {
    try {
      if (onClick) {
        onClick();
      }
      await logout(undefined).unwrap();
      localStorage.removeItem(WEB_KEYS.persist);
      setPersist(false);
    } catch (error) {
      isDev() && console.log("LogoutMenuItem@handleLogout", error);
    }
  };
  return <MenuItem onClick={handleLogout}>Logout</MenuItem>;
}
