import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import CanvasLoader from '../Loader';

function Computers({ isMobile }) {
  const { scene } = useGLTF('/desktop_pc/scene.gltf');

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh && child.geometry?.attributes?.position) {
        const posAttr = child.geometry.attributes.position;

        for (let i = 0; i < posAttr.count; i++) {
          let x = posAttr.getX(i), y = posAttr.getY(i), z = posAttr.getZ(i);
          if ([x, y, z].some(v => isNaN(v))) {
            posAttr.setXYZ(i, isNaN(x) ? 0 : x, isNaN(y) ? 0 : y, isNaN(z) ? 0 : z);
          }
        }

        posAttr.needsUpdate = true;

        try {
          child.geometry.computeBoundingBox();
          child.geometry.computeBoundingSphere();
        } catch {
          child.visible = false;
        }
      }
    });
  }, [scene]);

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

export const ComputersCanvas = ({ isMobile }) => {
  // ✅ If on mobile, return a fallback image or frame
  if (isMobile) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <img
          src="/fallback-image.png"
          alt="3D model fallback"
          className="w-[200px] object-contain"
        />
      </div>
    );
  }

  // ✅ On desktop, render Canvas
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers isMobile={false} />
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