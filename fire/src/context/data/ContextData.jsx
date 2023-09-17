import { createContext, useState } from "react";

const ContextData = createContext();

const ContextDataProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#333";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const contextValue = {
    mode,
    toggleMode,
  };

  return (
    <ContextData.Provider value={contextValue}>{children}</ContextData.Provider>
  );
};

export { ContextData , ContextDataProvider };
