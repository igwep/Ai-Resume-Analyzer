"use client";
import { useAppSelector } from "../hooks/useTypedHooks";
//import Loader from "./Loader";
import LoadingOverlay from "./LoadingOverlay";

const GlobalLoader = () => {
  const { isLoading, message } = useAppSelector((state) => state.loader);

  return isLoading ? <LoadingOverlay isVisible={isLoading} message={message} /> : null;
};

export default GlobalLoader;
