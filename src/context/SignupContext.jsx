import { createContext, useState } from 'react';

export const SignupContext = createContext(null);

export const SignupContextProvider = ({ children }) => {
  const [checkboxState, setCheckboxState] = useState(false);

  return <SignupContext.Provider value={{ checkboxState, setCheckboxState }}>{children}</SignupContext.Provider>;
};
