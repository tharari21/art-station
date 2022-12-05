import React from "react";

const Gallery = () => {
  return (
    <div className="max-w-[1440px] m-auto w-full px-4 py-16">
      <h2 className="text-center text-gray-700 p-4">Gallery</h2>
      <div className="grid sm:grid-cols-5 gap-4">
        <div className="sm:col-span-3 col-span-2 row-span-2">
          <img
            className="w-full h-full object-cover"
            src="https://via.placeholder.com/500/09f/fff"
            alt="/"
          />
        </div>
        <div>
          <img src="https://via.placeholder.com/500/09f/fff" alt="/" />
        </div>
        <div>
          <img src="https://via.placeholder.com/500/09f/fff" alt="/" />
        </div>
        <div>
          <img src="https://via.placeholder.com/500/09f/fff" alt="/" />
        </div>
        <div>
          <img src="https://via.placeholder.com/500/09f/fff" alt="/" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
