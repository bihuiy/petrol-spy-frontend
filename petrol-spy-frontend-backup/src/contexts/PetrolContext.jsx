import { createContext, useState } from "react";

const PetrolContext = createContext();

const PetrolProvider = ({ children }) => {
  const [selectedPetrolType, setSelectedPetrolType] = useState("U91");

  return (
    <PetrolContext.Provider
      value={{ selectedPetrolType, setSelectedPetrolType }}
    >
      {children}
    </PetrolContext.Provider>
  );
};

export { PetrolContext, PetrolProvider };
