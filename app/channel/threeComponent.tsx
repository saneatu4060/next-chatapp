import * as THREE from 'three'
import { useRef} from 'react'
import { Canvas, } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";

export const App = ({ images }) => (
    <>
    <Canvas style={{ width: "100vw", height: "100vh" }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
        <color attach="background" args={['#191920']} />
        <group position={[0, -0.5, 1]}>
        <Frames images={images} />
        </group>
        <OrbitControls ></OrbitControls>
    </Canvas>
    </>

)

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  return <group ref={ref}>{images.map((props) => <Frame  {...props} /> )}</group>
}

function Frame({ c = new THREE.Color(), ...props }) {
  const frame = useRef()

  return (
    <group {...props}>
      <mesh scale={[2.75, 4, 0.1]} position={[0, 1, 0]}>
        <mesh ref={frame}  scale={[2.75, 2, 1]} position={[0 , 0 , 0]}>
          <boxGeometry />
        </mesh>
      </mesh>
    </group>
  )
}

