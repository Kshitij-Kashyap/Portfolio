function Walls() {
  // Three walls: back, left, right
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 1, -2.6]} receiveShadow>
        <boxGeometry args={[7, 3, 0.2]} />
        <meshStandardMaterial color="#23272e" />
      </mesh>
      {/* Left wall */}
      <mesh position={[-2.6, 1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[7, 3, 0.2]} />
        <meshStandardMaterial color="#23272e" />
      </mesh>
      {/* Right wall */}
      <mesh position={[2.6, 1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[7, 3, 0.2]} />
        <meshStandardMaterial color="#23272e" />
      </mesh>
    </group>
  );
}

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Desk() {
  // Desk surface
  return (
    <mesh position={[0, 0, 0]} receiveShadow castShadow>
      <boxGeometry args={[5, 0.2, 2]} />
      <meshStandardMaterial color="#222b3a" />
    </mesh>
  );
}

function Monitor() {
  // Monitor base
  return (
    <group>
      <mesh position={[0, 0.7, -0.6]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.08]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.7, -0.54]} castShadow>
        <boxGeometry args={[1.1, 0.6, 0.01]} />
        <meshStandardMaterial color="#00bfff" emissive="#00bfff" emissiveIntensity={2.2} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, 0.35, -0.6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.2, -0.6]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <mesh position={[0, 0.12, 0.3]} castShadow>
      <boxGeometry args={[0.9, 0.06, 0.32]} />
      <meshStandardMaterial color="#0a84ff" />
    </mesh>
  );
}

function Mug() {
  return (
    <group>
      {/* Mug body */}
      <mesh position={[-0.7, 0.18, 0.3]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.18, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Handle */}
      <mesh position={[-0.7, 0.18, 0.42]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.07, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00bfff" />
      </mesh>
    </group>
  );
}

function Chair() {
  // Simple chair behind desk
  return (
    <group>
      {/* Seat */}
      <mesh position={[0, 0.18, 1.1]} castShadow>
        <boxGeometry args={[0.7, 0.08, 0.7]} />
        <meshStandardMaterial color="#222b3a" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.38, 1.38]} castShadow>
        <boxGeometry args={[0.7, 0.4, 0.08]} />
        <meshStandardMaterial color="#0a84ff" />
      </mesh>
    </group>
  );
}

type SceneViewProps = {
  cameraPosition?: [number, number, number];
};

function CameraController({ cameraPosition }: { cameraPosition: [number, number, number] }) {
  const { camera } = useThree();
  const target = useRef(cameraPosition);
  useEffect(() => {
    target.current = cameraPosition;
  }, [cameraPosition]);
  useFrame(() => {
    camera.position.lerp(
      new THREE.Vector3(...target.current),
      0.08 // smoothness
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}


const SceneView: React.FC<SceneViewProps> = ({ cameraPosition = [8, 4, 8] }) => {

  return (
    <Canvas shadows camera={{ position: cameraPosition, fov: 60 }} style={{ width: '100vw', height: '100vh', display: 'block', background: '#141414' }}>
      <CameraController cameraPosition={cameraPosition} />
      <color attach="background" args={['#141414']} />

      {/* Natural Lighting */}
      <ambientLight intensity={0.7} />
      {/* Sunlight from window */}
      <directionalLight
        position={[4, 8, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
        color="#fffbe6"
      />
      {/* Fill light from front */}
      <pointLight position={[0, 3, 4]} color="#fff" intensity={1.5} distance={10} decay={2} />
      {/* Cool blue accent light */}
      <pointLight position={[-10, 5, 10]} color="#00bfff" intensity={0.7} />


      {/* Office Desk Scene */}
      <Walls />
      <Desk />
      <Monitor />
      <Keyboard />
      <Mug />
      <Chair />

      {/* Floor grid */}
      <gridHelper args={[10, 20]} position={[0, -0.09, 0]} />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom 
          intensity={0.7}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          height={300}
        />
      </EffectComposer>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />
    </Canvas>
  );
};

export default SceneView;
