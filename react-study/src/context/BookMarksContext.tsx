import { Booktype } from "../types/BookMarks";
import { useContext, createContext, useState, ReactNode } from "react";

//型定義
type BookContextType = {
  bookmarks: Booktype[];
};

const BookMarksContext = createContext<BookContextType | undefined>(undefined);

export const BookMarksProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Booktype[]>([]);

  return (
    <BookMarksContext.Provider value={{ bookmarks }}>
      {children}
    </BookMarksContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookMarksContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookMarksProvider");
  }
  return context;
};

// export const Greeting = () => {
//   const theme = useContext(ThemeContext);
//   return <p>Hello {theme}</p>;
// };

// const Page = () => {
//   return (
//     <>
//       <Greeting /> {/* <p>Hello light</p> */}
//       <ThemeContext.Provider value="dark">
//         <Greeting /> {/* <p>Hello dark</p> */}
//       </ThemeContext.Provider>
//     </>
//   );
// };

// export default Page;

// import { createContext, useState, useContext, ReactNode } from "react";

// import { createContext, useState, useContext, ReactNode } from "react";
// // ↓ typesの場所が違う場合は修正してください
// import { Booktype } from "../types/BookMarks";

// type BookContextType = {
//   bookmarks: Booktype[];
// };

// const BookMarksContext = createContext<BookContextType | undefined>(undefined);

// export const BookMarksProvider = ({ children }: { children: ReactNode }) => {
//   // ここで初期値を [] にしています
//   const [bookmarks, setBookmarks] = useState<Booktype[]>([]);

//   return (
//     <BookMarksContext.Provider value={{ bookmarks }}>
//       {children}
//     </BookMarksContext.Provider>
//   );
// };

// export const useBookmark = () => {
//   const context = useContext(BookMarksContext);
//   if (!context) {
//     throw new Error("useBookmark must be used within a BookMarksProvider");
//   }
//   return context;
// };
