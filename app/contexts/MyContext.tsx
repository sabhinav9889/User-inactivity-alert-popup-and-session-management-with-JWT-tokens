// MyContext.tsx
import { createContext, FC, useContext, useState, ReactNode } from 'react';

interface MyContextProps {
  myData: string;
  updateData: (newData: string) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

const MyProvider: FC = ({ children }: { children?: ReactNode }) => {
  const [myData, setMyData] = useState<string>('Default Value');

  const updateData = (newData: string) => {
    setMyData(newData);
  };

  return (
    <MyContext.Provider value={{ myData, updateData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };