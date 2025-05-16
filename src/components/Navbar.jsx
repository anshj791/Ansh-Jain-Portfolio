import React, { useState } from 'react';
import { styles } from "../styles";
import { Link } from 'react-router-dom';
import { navLinks } from '../constants';

import Aj from '../assets/Aj.png';

// Using icons from react-icons
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`
      ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 backdrop-blur-lg bg-[#07070799]`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <img src={Aj} alt="logo" className='w-14 h-1 object-contain' />
          <p className='text-white text-[18px] font-semibold flex cursor-pointer'>ansh.</p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.title
                ? "text-white"
                : "text-secondary"} hover:text-white text-[15px] font-medium transition-all ease-in-out`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <div
            className='text-white text-[28px] cursor-pointer'
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FiX /> : <FiMenu />}
          </div>

          <div className={`${!toggle ? 'hidden' : 'flex'} backdrop-blur-[12px] p-6 bg-gradient-to-b from-[#000000d0] shadow-card to-[#00000051] border-[1px] border-gray-500 absolute top-20 right-0 mx-4 my-2 min-w[140px] z-10 rounded-xl`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${active === link.title
                    ? "text-white"
                    : "text-secondary"} font-poppins font-medium transition-all ease-in-out`}
                  onClick={() => {
                    setActive(link.title)
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
