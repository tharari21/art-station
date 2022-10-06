import { useState } from "react";
import "./painting-form.css";
const CreatePaintingForm = ({ addPainting }) => {
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const createPainting = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", e.target.name.value);
    data.append("image", e.target.image.files[0]);
    for (const tag of tags) {
      data.append("tags[]", tag);
    }

    try {
      const req = await fetch("http://localhost:3000/paintings", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        credentials: "include",
        body: data,
      });
      const newPainting = await req.json();
      console.log(newPainting);
      if (req.ok) {
        alert("Painting Created!");
        addPainting(newPainting);
      } else {
      }
    } catch (e) {}
  };

  const handleKeyDown = e => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      const value = tagValue.trim().toLowerCase();
      if (value) {
        setTags([...tags, value]);
        setTagValue("");
      }
    }
  };
  const handleTagInputChange = e => {
    setTagValue(e.target.value);
  };
  const handleDeleteTag = item => {
    setTags(tags.filter(tag => tag !== item));
  };

  return (
    <form onSubmit={createPainting}>
      <label>Painting Name</label>
      <input required name="name" />
      <label>Painting Tags</label>
      <div className="tag-items">
        {tags.map(item => (
          <div className="tag-item" key={item}>
            {item}
            <button
              type="button"
              className="button"
              onClick={() => handleDeleteTag(item)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        value={tagValue}
        placeholder="Type each tag and press `Enter`..."
        onKeyDown={handleKeyDown}
        onChange={handleTagInputChange}
      />

      <label>Painting Image</label>
      <input required name="image" type="file" accept="image/*" />
      <input type="submit" />
    </form>
  );
};

export default CreatePaintingForm;
