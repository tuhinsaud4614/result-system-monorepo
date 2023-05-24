import * as React from "react";

import { Outlet } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";

import { isDev } from "@result-system/shared/utility";

import { useLazyRefreshTokenQuery } from "../../app/services/auth.api";
import PagePulse from "../../components/common/PagePulse";
import { WEB_KEYS } from "../../utility/constants";
import { useAppSelector } from "../../utility/hooks";
import { getAuthToken } from "./auth.slice";

export default function PersistLogin() {
  const effectRan = React.useRef<boolean>(false);
  const token = useAppSelector(getAuthToken);
  const isPersist = useReadLocalStorage(WEB_KEYS.persist);

  const [refresh, { isLoading, isError }] = useLazyRefreshTokenQuery();

  React.useEffect(() => {
    if (effectRan.current || !isDev()) {
      const verifyRefreshToken = async () => {
        try {
          await refresh(undefined);
        } catch (error) {
          isDev() && console.log("PersistLogin@verifyRefreshToken", error);
        }
      };

      if (!token && isPersist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the token is not checked, the page will not navigate; instead, it will continue to display a loading state.
  if ((isPersist && !isError && !token) || isLoading) {
    return <PagePulse />;
  }

  return <Outlet />;
}
