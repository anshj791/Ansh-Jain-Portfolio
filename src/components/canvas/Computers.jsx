import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import CanvasLoader from '../Loader'

function Computers({ isMobile }) {
  const { scene } = useGLTF('/desktop_pc/scene.gltf')

  useEffect(() => {
    if (!scene) {
      console.error("GLTF scene not loaded!")
      return
    }

    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const posAttr = child.geometry.attributes.position

        if (!posAttr) {
          console.warn(`Mesh ${child.name || 'unknown'} has no position attribute.`)
          return
        }

        let hasNaN = false

        for (let i = 0; i < posAttr.count; i++) {
          let x = posAttr.getX(i)
          let y = posAttr.getY(i)
          let z = posAttr.getZ(i)

          if (isNaN(x) || isNaN(y) || isNaN(z)) {
            hasNaN = true
            console.warn(
              `NaN detected in geometry position at vertex ${i} of mesh ${child.name || 'unknown'}. Replacing NaN with 0.`
            )
            if (isNaN(x)) x = 0
            if (isNaN(y)) y = 0
            if (isNaN(z)) z = 0
            posAttr.setXYZ(i, x, y, z)
          }
        }

        if (hasNaN) {
          posAttr.needsUpdate = true
          try {
            child.geometry.computeBoundingBox()
            child.geometry.computeBoundingSphere()
            console.log(`Bounding volumes recomputed for mesh ${child.name || 'unknown'}.`)
          } catch (error) {
            console.error(`Failed to recompute bounding volumes for mesh ${child.name || 'unknown'}`, error)
          }
        }
      }
    })
  }, [scene])

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
      {scene && scene.children.length > 0 && (
        <primitive
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 450px)')
    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange)
  }, [])

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
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas
