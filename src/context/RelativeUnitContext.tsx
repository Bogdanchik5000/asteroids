"use client";

import { RelativeUnitType } from "@/types/asteroid.type";
import { createContext, ReactNode, useState } from "react";

interface RelativeUnitContext {
  relativeUnit: RelativeUnitType;
  setRelativeUnit: (relativeUnit: RelativeUnitType) => void;
}

export const RelativeUnitContext = createContext<RelativeUnitContext>({
  relativeUnit: "kilometers",
  setRelativeUnit: () => {},
});

export function RelativeUnitProvider({ children }: { children: ReactNode }) {
  const [relativeUnit, setRelativeUnit] =
    useState<RelativeUnitType>("kilometers");

  return (
    <RelativeUnitContext.Provider
      value={{
        relativeUnit,
        setRelativeUnit: (relativeUnit) => setRelativeUnit(relativeUnit),
      }}
    >
      {children}
    </RelativeUnitContext.Provider>
  );
}
