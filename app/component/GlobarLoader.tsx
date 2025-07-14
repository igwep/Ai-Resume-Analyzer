"use client";
import { useAppSelector } from "../hooks/useTypedHooks";
//import Loader from "./Loader";
import LoadingOverlay from "./LoadingOverlay";

const GlobalLoader = () => {
  // 👇 YES! This is where it's used
  const { isLoading, message } = useAppSelector((state) => state.loader);

  return isLoading ? <LoadingOverlay isVisible={isLoading} message={message} /> : null;
};

export default GlobalLoader;
