import React, { createContext, useState } from "react";
import { Record, RecordContextType, RecordProviderProps } from "../types/types";

export const RecordContext = createContext<RecordContextType>({
  records: [],
  setRecords: () => {},
});

export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
  const [records, setRecords] = useState<Record[]>([]);

  return (
    <RecordContext.Provider value={{ records, setRecords }}>
      {children}
    </RecordContext.Provider>
  );
};
