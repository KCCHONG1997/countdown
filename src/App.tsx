import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

// Global Styles for a cute theme
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    background: linear-gradient(120deg, #ffd1dc, #ffe4e1);
    overflow: hidden;
  }
`;

// Styled container for the page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  color: #ff69b4;
`;

// Message text
const Message = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px #ffffff;
`;

// Interactive dot trail component
const Dot = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ff69b4;
  border-radius: 50%;
`;

const App: React.FC = () => {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const [message, setMessage] = useState("I just want to let you know, I love you");

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    setDots((prevDots) => [
      ...prevDots.slice(-20), // Limit to the last 20 dots
      { x: e.clientX, y: e.clientY, id: Date.now() },
    ]);
  };

  // Handle fade-out effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => prevDots.slice(1)); // Gradually remove dots
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle click to change the message
  const handleClick = () => {
    const messages = [
      "Happy Birthday My Pufferfish!",
      "I just want to let you know, I love you",
      "You're the best thing that ever happened to me",
      "Forever and always, my love💖",
    ];
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  return (
    <>
      <GlobalStyle />
      <Container onMouseMove={handleMouseMove} onClick={handleClick}>
        <Message>{message}</Message>
        {dots.map((dot) => (
          <Dot
            key={dot.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ left: dot.x, top: dot.y }}
          />
        ))}
      </Container>
    </>
  );
};

export default App;
