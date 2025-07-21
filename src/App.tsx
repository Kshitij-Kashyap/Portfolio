

import './App.css'

import SceneView from './SceneView';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const cameraPositions: { [key: string]: [number, number, number] } = {
    Home: [3, 2, 5],
    About: [0, 5, 0],
    Projects: [-5, 2, 3],
    Contact: [5, 2, -3],
    'Point A': [0, 2, 7],
    'Point B': [7, 2, 0],
    'Point C': [0, 7, 2],
    'Point D': [-7, 2, 0],
  };
  const [selected, setSelected] = useState('Home');

  // Animated text state
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    setShowText(false);
    const timeout = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(timeout);
  }, [selected]);

  // Text content and animation origins for each section
  const textData: { [key: string]: { text: string; origin: string } } = {
    Home: {
      text: 'Welcome Home! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      origin: 'top left',
    },
    About: {
      text: 'About: This is some information about me. Lorem ipsum dolor sit amet.',
      origin: 'top right',
    },
    Projects: {
      text: 'Projects: Here are some cool things I have built. Lorem ipsum dolor sit amet.',
      origin: 'bottom left',
    },
    Contact: {
      text: 'Contact: Get in touch! Lorem ipsum dolor sit amet.',
      origin: 'bottom right',
    },
    'Point A': {
      text: 'Point A: Random point in the scene.',
      origin: 'top left',
    },
    'Point B': {
      text: 'Point B: Random point in the scene.',
      origin: 'top right',
    },
    'Point C': {
      text: 'Point C: Random point in the scene.',
      origin: 'bottom left',
    },
    'Point D': {
      text: 'Point D: Random point in the scene.',
      origin: 'bottom right',
    },
  };

  // Animation styles
  const getTextStyle = (origin: string, show: boolean) => {
    let style: React.CSSProperties = {
      position: 'absolute',
      color: '#fff',
      fontSize: '2rem',
      fontWeight: 900,
      maxWidth: '40vw',
      padding: '2rem',
      borderRadius: '18px',
      background: 'rgba(0,0,0,0.6)',
      zIndex: 10,
      opacity: show ? 1 : 0,
      transition: 'opacity 0.5s, transform 0.5s',
      pointerEvents: 'none',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    };
    switch (origin) {
      case 'top left':
        style.top = '3vw';
        style.left = '18vw';
        style.transform = show ? 'translate(0,0)' : 'translate(-40px,-40px)';
        break;
      case 'top right':
        style.top = '3vw';
        style.right = '3vw';
        style.transform = show ? 'translate(0,0)' : 'translate(40px,-40px)';
        break;
      case 'bottom left':
        style.bottom = '3vw';
        style.left = '18vw';
        style.transform = show ? 'translate(0,0)' : 'translate(-40px,40px)';
        break;
      case 'bottom right':
        style.bottom = '3vw';
        style.right = '3vw';
        style.transform = show ? 'translate(0,0)' : 'translate(40px,40px)';
        break;
      default:
        break;
    }
    return style;
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', zIndex: 1 }}>
        <SceneView cameraPosition={cameraPositions[selected]} />
      </div>
      <nav
        className="vertical-navbar"
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        {Object.keys(cameraPositions).map((key) => (
          <a
            key={key}
            href="#"
            onClick={e => {
              e.preventDefault();
              setSelected(key);
            }}
            className={selected === key ? 'selected' : ''}
          >
            {key}
          </a>
        ))}
      </nav>
      {showText && (
        <div style={getTextStyle(textData[selected].origin, showText)}>
          {textData[selected].text}
        </div>
      )}
    </div>
  );
}

export default App
