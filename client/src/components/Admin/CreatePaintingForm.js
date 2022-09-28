
const CreatePaintingForm = ({ addPainting }) => {
  const createPainting = async (e) => {
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
  return (
    <form onSubmit={createPainting}>
      <label>Painting Name</label>
      <input required name="name" />
      <label>Painting Image</label>
      <input required name="image" type="file" accept="image/*" />
      <input type="submit" />
    </form>
  );
};

export default CreatePaintingForm