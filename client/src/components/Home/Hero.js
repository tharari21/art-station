import React from "react";

const Hero = () => {
  return (
    <section className="w-full h-[90vh]">
      <div className="max-w-[1440px] m-auto">
        <div className="absolute top-[30%] w-full md:[50%] max-w-[600px] h-full flex flex-col p-4">
          <h1 className="font-bold text-6xl">BROOKLYN'S NUMBER ONE</h1>
          <h2 className="text-6xl py-2 italic">ART SUPPLY STORE</h2>
          <p className="pl-2 text-2xl">
            Art Station is Brooklyn's #1 Local Art Supply Store! We offer every
            art related family activity you could want in one place.
          </p>
          <p className="pl-2 py-6 text-2xl">
            Not only do we have two floors of art supplies, we also have
            in-house custom framing, a private event space for children's
            parties and adult paint nights, and art classes every week! Visit us
            today!
            <span>
              Call now to learn more about our classes, art supplies, party
              packages, activities or custom framing! (718) 645-4545
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
