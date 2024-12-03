import React, { useState } from 'react';
import Container from '../styles/Container';
import Message from '../components/Message';
import Button from '../components/Button';
import Heart from '../components/Heart';


const messages = [
    "🎂🐡💖",
    "Happy Birthday My Pufferfish!",
    "I just want to let you know, I love you",
    "You're the best thing that ever happened to me",
    "Forever and always, my love💖",
];

const LoveMessagePage: React.FC = () => {
    
  const [hearts, setHearts] = useState<{ x: number; y: number; id: number }[]>([]);
  const [message, setMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    setHearts((prevHearts) => [
      ...prevHearts.slice(-20),
      { x: e.clientX, y: e.clientY, id: Date.now() },
    ]);
  };

  const handleButtonClick = () => {

    setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    setMessage(messages[(messageIndex + 1) % messages.length]);
  };

  return (
    <Container onMouseMove={handleMouseMove}>
      <Message text={message} />
      <Button onClick={handleButtonClick}>Change Message</Button>
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1 }}
          style={{ left: heart.x, top: heart.y }}
        />
      ))}
    </Container>
  );
};

export default LoveMessagePage;
