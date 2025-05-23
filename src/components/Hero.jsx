import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { slideIn } from "../utils/motion";
import { ComputersCanvas } from './canvas';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const messages = ['Freelance Frontend Web & App Developer', 'Full Stack Developer'];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
        setShowText(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentText = messages[index];
  const currentTextLetters = currentText.split('');

  return (
    <StyledHero>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row `}>
        <div className='bg-gradient-to-br lg:w-[1200px] w-full h-[450px] from-[#ffffff25] to-[#05050521] border-2 border-gray-500 lg:px-8 px-4 py-6 rounded-xl flex flex-row lg:space-x-6 space-x-4'>
          <div className="flex flex-col justify-start items-center mt-6">
            <div className="w-5 h-5 rounded-full bg-[#915eff]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div>
            <h1 className={`${styles.heroHeadText}`}>Hey, I'm <br /><span className="text-[#9153ff]">Ansh Jain</span></h1>
            <StyledHeroSubText className={`${styles.heroSubText} mt-2 text-white-100`}>
              {showText && (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {currentTextLetters.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </StyledHeroSubText>
          </div>
        </div>
      </div>

      <motion.div className="w-full h-full">
        <ComputersCanvas isMobile={isMobile} />
      </motion.div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[30px] h-[55px] rounded-3xl border-4 border-[#f1f1f1] flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className='w-3 h-1.5 rounded-full bg-[#f1f1f1] mb-1'
            />
          </div>
        </a>
      </div>
    </StyledHero>
  );
};

const StyledHero = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const StyledHeroSubText = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;

  > div {
    display: inline-block;
    position: relative;
    top: -2px;
    margin-left: 4px;
  }
`;

export default Hero;
