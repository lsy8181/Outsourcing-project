import { createContext, useContext, useState } from 'react';

const initialValue = {
  openModal: () => {},
  closeModal: () => {}
};
const ModalContext = createContext(initialValue);

export const useModal = () => useContext(ModalContext);

export default function ModalContextProvider({ children }) {
  const [modalEl, setModalEl] = useState(null);

  const value = {
    openModal: (el) => {
      setModalEl(el);
    },
    closeModal: () => {
      setModalEl(null);
    }
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalEl}
    </ModalContext.Provider>
  );
}
