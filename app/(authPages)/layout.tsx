"use client";
import { Provider } from "react-redux";
import { store } from "../Store"; // Adjust the import path as necessary
export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
     <Provider store={store}>
       {children}
      </Provider>
    </div>
  );
}
