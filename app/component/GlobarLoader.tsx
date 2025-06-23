"use client";
import { useAppSelector } from "../hooks/useTypedHooks";
import Loader from "./Loader";

const GlobalLoader = () => {
  // 👇 YES! This is where it's used
  const { isLoading, message } = useAppSelector((state) => state.loader);

  return isLoading ? <Loader fullscreen message={message} /> : null;
};

export default GlobalLoader;
