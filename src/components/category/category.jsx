import React from "react";
import "./category.css";

function Category({ category }) {
  return (
    <>
      <div className="category-container1">
        <h1 className="category-title1">{category?.title?.split(" ")[0]}</h1>
        <h1 className="category-title">{category?.title?.split(" ")[1]}</h1>
      </div>
    </>
  );
}

export default Category;
