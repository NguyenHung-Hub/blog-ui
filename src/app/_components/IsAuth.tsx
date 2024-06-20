"use client";
import { useEffect, useState } from "react";
import store, { useAppSelector } from "~/store";
import { logout } from "~/store/reducer/user";
import Cookies from "js-cookie";
import { httpRequest2 } from "~/util/httpRequest";
import { useRouter } from "next/navigation";
import Loading from "~/components/Loading/Loading";

export default function IsAuthRoute(Component: any) {
  return function IsAuth(props: any) {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const [allow, setAllow] = useState(false);
    const router = useRouter();

    function handleLogout() {
      store.dispatch(logout());
      localStorage.removeItem("user");
      Cookies.remove("access_token");
      Cookies.remove("session_id");
    }

    useEffect(() => {
      const fetchSession = async () => {
        const sessionId = Cookies.get("session_id");

        if (sessionId) {
          try {
            const res = await httpRequest2.get(`/session/check/${sessionId}`);
            if (res.data?.code == 200 && isAuth) {
              setAllow(true);
              return;
            } else {
              handleLogout();
            }
          } catch (error) {
            console.log(`file: IsAuth.tsx:29 > error:`, error);
            handleLogout();
            return router.push("/");
          }
        } else {
          handleLogout();
          return router.push("/");
        }
      };

      fetchSession();
    }, []);

    return allow ? (
      <Component {...props} />
    ) : (
      <main className="f-center h-screen w-full pt-14">
        <Loading />
      </main>
    );
  };
}
