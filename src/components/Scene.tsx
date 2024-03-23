'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Decal, useTexture } from '@react-three/drei';

export default function Box() {
    const boxRef = useRef();
const texture =useTexture("/sonelgaz.png")
    useFrame(() => {
      boxRef.current.rotation.y -= 0.001;
    });
  
    return (
      <mesh ref={boxRef} position={[0,0,0]}  rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
         <boxGeometry   args={[4,4,4.07]} />
      <meshMatcapMaterial  color={"#FFFFFF"}  />
      <Decal
     // Makes "bounding box" of the decal visible
    position={[0, 0, -4]} // Position of the decal
    rotation={[0, 3.143, 0]} // Rotation of the decal (can be a vector or a degree in radians)
    scale={[4,4,4.05]} // Scale of the decal
  >
    <meshBasicMaterial
      map={texture}
      polygonOffset
      polygonOffsetFactor={-1} // The material should take precedence over the original
    />
  </Decal>
  <Decal
     // Makes "bounding box" of the decal visible
    position={[0, 0, 4]} // Position of the decal
    rotation={[0, 0, 0]} // Rotation of the decal (can be a vector or a degree in radians)
    scale={[4,4,4.05]} // Scale of the decal
  >
    <meshBasicMaterial
      map={texture}
      polygonOffset
      polygonOffsetFactor={-1} // The material should take precedence over the original
    />
  </Decal>
  
      </mesh>
    );
}