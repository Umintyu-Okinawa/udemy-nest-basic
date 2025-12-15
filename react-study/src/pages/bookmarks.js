import React from "react";
import { useState } from "react";
import { Booktype1 } from "../types";

const PageContent = () => {
  const [state, setState] = useState(Booktype1);

  return (
    <div>
      <h1>一覧</h1>
      <ul>
        {state.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PageContent;
