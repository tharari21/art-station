import React from "react";
import { capitalize } from "../utils/util";

const Tags = ({ tags, setTagFilters }) => {
  const handleChange = (e, tag) => {
    if (e.target.checked) {
      setTagFilters(prev => [...prev, tag]);
    } else {
      setTagFilters(prev => prev.filter(item => item !== tag));
    }
  };

  return (
    <div className="tags">
      <h3>Tag Filters: </h3>
      {tags?.map(tag => (
        <div className="tag" key={tag}>
          <label>{capitalize(tag)}</label>
          <input onChange={e => handleChange(e, tag)} type="checkbox" />
        </div>
      ))}
    </div>
  );
};

export default Tags;
