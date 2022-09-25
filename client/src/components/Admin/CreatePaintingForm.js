import React from 'react'

const CreatePaintingForm = () => {
  return (
    <form>
        <label>Painting Name</label>
        <input />
        <label>Painting Image</label>
        <input type="file"/>
        <input type="submit"/>
    </form>
  )
}

export default CreatePaintingForm