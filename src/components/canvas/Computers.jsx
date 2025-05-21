import { OrbitControls, Preload, useGLTF, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import CanvasLoader from '../Loader';

function Computers({ isMobile, onModelError }) {
  const { scene } = useGLTF('/desktop_pc/scene.gltf');

  useEffect(() => {
    if (!scene) {
      onModelError?.('Scene not loaded');
      return;
    }

    let hasError = false;

    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const posAttr = child.geometry.attributes.position;

        if (!posAttr || !posAttr.array || !posAttr.count) {
          child.visible = false;
          hasError = true;
          return;
        }

        for (let i = 0; i < posAttr.count; i++) {
          let x = posAttr.getX(i);
          let y = posAttr.getY(i);
          let z = posAttr.getZ(i);

          if ([x, y, z].some(v => isNaN(v))) {
            posAttr.setXYZ(i, isNaN(x) ? 0 : x, isNaN(y) ? 0 : y, isNaN(z) ? 0 : z);
          }
        }

        posAttr.needsUpdate = true;

        try {
          child.geometry.computeBoundingBox();
          child.geometry.computeBoundingSphere();
        } catch (error) {
          child.visible = false;
          hasError = true;
        }
      }
    });

    if (hasError) onModelError?.('Mesh error in GLTF');
  }, [scene]);

  if (!scene) return null;

  return (
    <>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={scene}
        scale={isMobile ? 0.38 : 0.55}
        position={isMobile ? [2.5, -3.74, 0] : [2.5, -4, 0]}
        rotation={[0, -0.2, -0.2]}
      />
    </>
  );
}

export const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  // ✅ On mobile: render a fallback image
  if (isMobile) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img
          src="/fallback-image.png"
          alt="3D Model Placeholder"
          className="w-[300px] h-auto object-contain"
        />
      </div>
    );
  }

  // ✅ On desktop: render 3D Canvas
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!modelError ? (
          <Computers isMobile={false} onModelError={() => setModelError(true)} />
        ) : (
          <Html center>
            <p style={{ color: 'white' }}>Model failed to load.</p>
          </Html>
        )}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.05}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;