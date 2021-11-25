import React, { createContext, useEffect, useState } from "react";

const GLOBAL_CONTEXT_STORAGE = "SALMAN_GLOBAL_STORAGE";

// Create Context Object
export const GlobalContext = createContext({});

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({ username: "PLAYER" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _data = window.localStorage.getItem(GLOBAL_CONTEXT_STORAGE);
      const parsed = _data ? JSON.parse(_data) : {};
      setState((old) => ({ ...old, ...parsed }));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      const parsed = JSON.stringify(state);
      window.localStorage.setItem(GLOBAL_CONTEXT_STORAGE, parsed);
    }
  }, [state, isLoading]);

  const setGlobalState = (data = {}) => {
    setState((old) => ({
      ...old,
      ...data,
    }));
  };

  return (
    <GlobalContext.Provider value={{ globalState: state, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
