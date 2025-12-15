import React from "react";

import { BookMarksProvider, useBookmark } from "../context/BookMarksContext";

const PageContent = () => {
  const { bookmarks } = useBookmark();

  return (
    <div>
      <h1>page2</h1>
      <ul>
        {bookmarks.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

const Page2 = () => {
  return (
    <BookMarksProvider>
      <PageContent />
    </BookMarksProvider>
  );
};

export default Page2;

// import { useState } from "react";
// import { useBookmark } from "../context/BookMarksContext";
// import { useContext, createContext } from "react";
// import { Booktype } from "../context/BookMarksContext";

// const Page1 = () => {
//   return (
//     <>
//       <h1>page1</h1>
//     </>
//   );
// };

// export default Page1;
