import { useState } from "react";

const CreatePaintingForm = ({ addPainting }) => {
  const [tagInputs, setTagInputs] = useState(1);
  const createPainting = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", e.target.name.value);
    data.append("image", e.target.image.files[0]);
    try {
      const req = await fetch("http://localhost:3000/paintings", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: data,
      });
      const newPainting = await req.json();
      if (req.ok) {
        addPainting(newPainting);
      } else {
      }
    } catch (e) {}
  };
  const addTagInput = e => {
    e.preventDefault();
    if (e.keyCode === 13 && e.target.value.length > 0) {
      setTagInputs(prev => prev + 1);
    }
  };
  return (
    <form onSubmit={createPainting}>
      <label>Painting Name</label>
      <input required name="name" />
      {/* <label>Painting Tags</label>
      {Array.from(Array(tagInputs).keys()).map((n) => (
          <input key={n} required name="tags" onKeyDown={addTagInput}/>
      ))} */}
      <label>Painting Image</label>
      <input required name="image" type="file" accept="image/*" />
      <input type="submit" />
    </form>
  );
};

export default CreatePaintingForm;
