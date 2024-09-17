import { useEffect, useState } from "react";
import { getCookie } from "../auth/services/getCookie";
import { thrVerifyUser } from "./services/thrVerifyUser";
import { Navigate } from "react-router-dom";
import { thrVerifyUserRefresh } from "./services/thrVerifuUserRefresh";

export default function ProtectedRoutes({ children }: any) {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const verifyUser = async () => {
    setLoading(true);
    const AuthToken = getCookie("AuthToken");

    if (AuthToken !== null) {
      const state = await thrVerifyUser(AuthToken, () => {}, () => {});

      if (state?.error) {
        console.log(state?.error);
        const AuthRefreshToken = getCookie("RefreshToken");

        if (AuthRefreshToken) {
          const rt = await thrVerifyUserRefresh(AuthRefreshToken, () => {}, () => {});

          if (rt?.error) {
            console.log(rt?.error);
            setIsAuth(false);
          } else {
            setIsAuth(true);
          }
        }
      } else {
        setIsAuth(true);
      }
    } else {
      const AuthRefreshToken = getCookie("RefreshToken");
      if (AuthRefreshToken !== null) {
        const rt = await thrVerifyUserRefresh(AuthRefreshToken, () => {}, () => {});

        if (rt?.error) {
          console.log(rt?.error);
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      } else {
        setIsAuth(false);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
      verifyUser();
  }, []);

  if (loading) {
    return (
      <div>
        Cargando...
      </div>
    );
  } else if (isAuth === null) {
    return null;
  } else if (isAuth === false) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}