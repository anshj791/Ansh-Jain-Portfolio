import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState, useRef } from 'react'
import CanvasLoader from '../Loader'

function Computers({ isMobile }) {
  const computerRef = useRef();
  const { scene } = useGLTF('/desktop_pc/scene.gltf', true); // Added true for draco compression support

  useEffect(() => {
    if (!scene) {
      console.error("GLTF scene not loaded!")
      return
    }

    // Fix NaN values in the scene
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const posAttr = child.geometry.attributes.position;

        if (!posAttr) {
          console.warn(`Mesh ${child.name || 'unknown'} has no position attribute.`)
          return
        }

        let hasNaN = false;
        const array = posAttr.array;
        
        // More efficient way to check and fix NaN values
        for (let i = 0; i < array.length; i++) {
          if (isNaN(array[i])) {
            hasNaN = true;
            array[i] = 0;
          }
        }

        if (hasNaN) {
          posAttr.needsUpdate = true;
          
          try {
            // Force geometry update
            child.geometry.computeBoundingBox();
            child.geometry.computeBoundingSphere();
            console.log(`Fixed NaN values and recomputed bounds for mesh ${child.name || 'unknown'}`);
          } catch (error) {
            console.error(`Failed to recompute bounding volumes for mesh ${child.name || 'unknown'}`, error);
            
            // Last resort: create a new geometry if fixing failed
            try {
              console.log("Attempting to create new geometry as last resort");
              const newGeometry = child.geometry.clone();
              child.geometry.dispose();
              child.geometry = newGeometry;
              child.geometry.computeBoundingBox();
              child.geometry.computeBoundingSphere();
            } catch (secondError) {
              console.error("Failed to recreate geometry", secondError);
            }
          }
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
      {scene && (
        <primitive
          ref={computerRef}
          object={scene}
          scale={isMobile ? 0.38 : 0.55}
          position={isMobile ? [2.5, -3.74, 0] : [2.5, -4, 0]}
          rotation={[0, -0.2, -0.2]}
        />
      )}
    </>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 450px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  // Add error handling and performance optimization
  const handleSceneLoaded = () => {
    setSceneLoaded(true);
  };

  const handleError = () => {
    setErrorLoading(true);
    console.error("Failed to load 3D scene");
  };

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: true // Don't render if performance would be poor
      }}
      onCreated={({ gl }) => {
        // Reduce pixel ratio on mobile for better performance
        if (isMobile) {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }
      }}
    >
      <Suspense fallback={<CanvasLoader onError={handleError} />}>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.05}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all onLoad={handleSceneLoaded} />
    </Canvas>
  )
}

// Add a fallback component that will display if 3D rendering fails
const ComputersCanvasWithFallback = () => {
  const [renderFailed, setRenderFailed] = useState(false);
  
  useEffect(() => {
    // Check if WebGL is available
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.error('WebGL not supported');
      setRenderFailed(true);
      return;
    }
    
    // Listen for the specific error we're concerned about
    const errorHandler = (event) => {
      if (event.message && event.message.includes('Computed radius is NaN')) {
        console.error('NaN radius error detected');
        setRenderFailed(true);
      }
    };
    
    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  if (renderFailed) {
    return (
      <div className="fallback-container" style={{ 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2>3D Model Unavailable</h2>
        <p>The 3D model couldn't be rendered on your device. Please try on a desktop browser.</p>
        <img 
          src="/desktop_pc/fallback.jpg" 
          alt="Computer Model" 
          style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }}
        />
      </div>
    );
  }
  
  return <ComputersCanvas />;
};

export default ComputersCanvasWithFallback;