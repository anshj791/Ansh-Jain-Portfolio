import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
// Make sure logo is correctly imported if used
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { Gallery } from "../constants";
import { fadeIn } from "../utils/motion";

const GalleryCard = ({ index, image }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className="backdrop-blur-sm bg-gradient-to-br hover:shadow-card shadow-gray-900 from-[#f9f9f946] to-[#0000008c] border-2 border-gray-800 p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          {logo && (
            <img
              src={logo}
              alt="logo"
              className="h-12 w-12 absolute bottom-1 right-1"
            />
          )}
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </Tilt>
    </motion.div>
  );
};

const GalleryScreen = () => {
  return (
    <div className="m-2 lg:m-20 justify-center flex flex-wrap gap-7">
      {Gallery.map((gallery, index) => (
        <GalleryCard key={`gallery-${index}`} index={index} {...gallery} />
      ))}
    </div>
  );
};

export default SectionWrapper(GalleryScreen, "");
