// // context/MyContext.tsx
// "use client"
// import React, { createContext, useState } from 'react';

// interface MyContextType {
//   list: string[];
//   setList: React.Dispatch<React.SetStateAction<string[]>>;
//   addItem: (item: string) => void;
//   removeItem: (index: string) => void;
// }


// const [list, setList] = useState<string[]>([]);

// const addItem = (item: string) => {
//   setList([...list, item]);
// };

// const removeItem = (str: string) => {
//   // myArray.filter(item => item !== "banana");
//   setList(list.filter(item=> item !== str));
// };

// export const MyContext = createContext<MyContextType>({
//   list: [],
//   setList: () => {},
//   addItem: () => {},
//   removeItem: () => {},
// });