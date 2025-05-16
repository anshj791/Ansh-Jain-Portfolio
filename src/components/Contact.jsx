import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { slideIn } from "../utils/motion";
import { socialIcons } from "../constants";

const SocialIconsCanvas = ({ name, icon, socialLink }) => {
  return (
    <motion.div
      variants={slideIn("right", "tween", 0.5, 0.75)}
      onClick={() => window.open(socialLink, "_blank")}
      className="backdrop-blur-sm"
    >
      <Tilt
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        glareEnable={true}
        glareMaxOpacity={0.2}
        className="bg-gradient-to-br flex items-center space-x-2 px-4 justify-center hover:shadow-card shadow-gray-900 from-[#f9f9f921] to-[#0000008c] border-2 border-gray-500 p-3 rounded-xl"
      >
        <div className="relative w-10 h-10">
          <img
            src={icon}
            alt="social-icon"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm py-4 gap-3">{name}</span>
      </Tilt>
    </motion.div>
  );
};

const SocialLinks = () => {
  return (
    <div className="mt-12 backdrop-blur-sm">
      <div className="py-2 md:py-2">
        <h3 className="text-lg text-center font-bold">
          I'm Social! Let's Connect and Collaborate
        </h3>
        <div className="flex flex-row flex-wrap justify-center gap-4 py-4 cursor-pointer">
          {socialIcons.map((social, index) => (
            <SocialIconsCanvas key={`social-${index}`} index={index} {...social} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;