import React, { Suspense, useRef } from "react";
import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Boguslawski from "./boguslawski-low.glb";
import "./App.css";

extend({ OrbitControls });

function Loading() {
  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color="green"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      minDistance={1}
      maxDistance={2}
    />
  );
};

function BoguslawskiObj() {
  const gltf = useLoader(GLTFLoader, Boguslawski);
  return (
    <primitive
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={[20, 20, 20]}
      rotation={[0, 3, 0]}
    />
  );
}

function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 2] }} >
        <CameraControls />
        <ambientLight intensity={2} />
        <spotLight intensity={0.6} position={[20, 20, -50]} />
        <Suspense fallback={<Loading />}>
          <BoguslawskiObj />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
