import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { socialIcons } from '../constants'
import Tilt from "react-tilt";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import LogoCanvas from "./canvas/logoCanvas";
import { close } from "../assets";

const Modal = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md z-55 flex justify-center items-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="m-6 backdrop-blur-[40px] bg-gradient-to-br from-[#ffffff27] to-[#0000008c] border-2 border-gray-700 rounded-md p-8">
        <button
          className="absolute text-white top-0 right-0 p-4"
          onClick={onClose}
        >
          <img
            src={close}
            alt="close"
            className="w-[20px] h-[20px] object-contain cursor-pointer"
          />
        </button>
        <p className="text-2xl p-6">{message}</p>
      </div>
    </div>
  );
};

const SocialIconsCanvas = ({ name, icon, socialLink, }) => {
  return (
    <motion.div variants={slideIn("right", "tween", 0.5, 0.75)}
      onClick={() => window.open(socialLink, "_blank")}
      className='backdrop-blur-sm '
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className=' bg-gradient-to-br flex items-center space-x-2 px-4 justify-center  hover:shadow-card shadow-gray-900 from-[#f9f9f921] to-[#0000008c] border-2 border-gray-500 p-3 rounded-xl '

      >
        <div className='relative w-10 h-10'

        >

          <img
            src={icon}
            alt='image'
            className=' w-full h-full object-cover'
          />
        </div>
        <span className=' text-sm py-4 gap-3'>{name}</span>


      </Tilt>
    </motion.div>
  )
}

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCloseModal = () => {
    setModalVisible(false);
    setForm({ name: "", email: "", message: "" });
  };
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      message: "",
    };

    if (!form.name) {
      errors.name = "Name is required";
    }
    if (!form.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!form.message) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        'service_qmoieob',
        'template_efhilqr',
        formRef.current,
        'Tr0rr1pMyoFjWThjM'
      )
      .then(
        () => {
          setLoading(false);
          setModalVisible(true);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
  class ShowCurrentYear extends React.Component {
    render() {
      return <div>{new Date().getFullYear()}</div>;
    }
  }
  return (
    <div className="-mb-10">
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75]  backdrop-blur-sm bg-gradient-to-br from-[#fcfcfc22] border-2 border-gray-700  p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Name</span>
              <input
                type='text'
                name='name'
                value={form.name}

                onChange={handleChange}
                placeholder="What's your good name?"
                className=' py-4 px-6 bg-[#ffffff18] border-2 border-gray-500 backdrop-blur-sm placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='  text-white font-medium mb-4'>Your email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='py-4 px-6 bg-[#ffffff18] border-2 backdrop-blur-sm border-gray-500 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Message</span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-[#ffffff18] border-2 backdrop-blur-sm border-gray-500 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>

            <button
              type='submit'
              className='backdrop-blur-sm bg-[#ffffff18] py-3 px-8 rounded-xl hover:bg-[#0707071d] outline-none w-fit text-white font-bold shadow-md shadow-primary'
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-auto md:h-[750px] h-[550px] cursor-grab'
        >
          {/* <EarthCanvas /> */}
          <LogoCanvas />
        </motion.div>



      </div>
      <div className='mt-12 backdrop-blur-sm' >
        <div className=' py-2 md:py-2'>
          <h3 className=' text-lg text-center font-bold'>

            I'm Social! Let's Connect and Collaborate
          </h3>
          <div className='flex flex-row flex-wrap justify-center gap-4 py-4 cursor-pointer'>
            {socialIcons.map((social, index) => (
              <SocialIconsCanvas key={`social-${index}`} index={index} {...social} />
            ))}
          </div>
          <div className='flex  lg:mx-[400px] mx-[10px]  my-3 justify-center py-4 bg-[#ffffff1e] rounded-full border-2 border-gray-600'>
            <div className="px-1 text-[12px]">
              ©
            </div>
            <div className="text-[12px]">

              <ShowCurrentYear />
            </div>
            <div className="px-2 text-[12px]" >
              <span className='font-bold'>Ansh Jain</span>  | All Rights Reserved
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalVisible}
        onClose={handleCloseModal}
        message="Thank you. I will get back to you as soon as possible."
      />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");