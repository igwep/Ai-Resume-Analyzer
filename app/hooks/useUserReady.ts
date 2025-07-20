import { useAppSelector } from "./useTypedHooks";
import { useFirebaseAuthGuard } from "./useFirebaseAuth";
import { useSession } from "next-auth/react";

export const useUserReady = () => {
  const { loading: authLoading } = useFirebaseAuthGuard();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  const user = useAppSelector((state) => state.user.data);
  const userLoading = useAppSelector((state) => state.user.userLoading);
  const error = useAppSelector((state) => state.user.error);

  const sessionLoading = status === "loading";

  const ready = !sessionLoading && !authLoading && !userLoading && !!user;

  return {
    user,
    userLoading: sessionLoading || authLoading || userLoading,
    error,
    ready,
  };
};
