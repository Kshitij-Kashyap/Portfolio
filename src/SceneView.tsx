import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RotatingCube({ color = 'royalblue', position = [0, 0, 0] }) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={mesh} position={position} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>

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

const SceneView: React.FC<SceneViewProps> = ({ cameraPosition = [3, 2, 5] }) => {
  return (
    <Canvas shadows camera={{ position: cameraPosition, fov: 60 }} style={{ width: '100vw', height: '100vh', display: 'block', background: '#222' }}>
      <CameraController cameraPosition={cameraPosition} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <RotatingCube position={[0, 0.5, 0]} color="#00bfff" />
      <RotatingCube position={[-2, 0.5, -2]} color="#ff3c3c" />
      <RotatingCube position={[2, 0.5, 2]} color="#ffd700" />
      <OrbitControls enablePan={false} />
      <gridHelper args={[10, 10]} />
    </Canvas>
  );
};

export default SceneView;
