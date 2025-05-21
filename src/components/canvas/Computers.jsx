import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import Computers from './Computers';
import CanvasLoader from '../Loader';

const ComputersCanvas = ({ isMobile }) => {
  if (isMobile) {
    // ✅ Don’t even mount the <Canvas> or load model
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        {/* Replace this with image if you prefer */}
        <p className="text-white text-lg">3D model preview is disabled on mobile.</p>
      </div>
    );
  }

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.05}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;