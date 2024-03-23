'use client'

import { Canvas, useFrame } from "@react-three/fiber"
import Scene from "./Scene"
import { CameraShake, ContactShadows, SpotLight } from "@react-three/drei"


export default function Canvaspage(){
    const config = {
        maxYaw: 0.1, // Max amount camera can yaw in either direction
        maxPitch: 0.1, // Max amount camera can pitch in either direction
        maxRoll: 0.1, // Max amount camera can roll in either direction
        yawFrequency: 0.1, // Frequency of the the yaw rotation
        pitchFrequency: 0.1, // Frequency of the pitch rotation
        rollFrequency: 0.1, // Frequency of the roll rotation
        intensity: 1, // initial intensity of the shake
        decay: false, // should the intensity decay over time
        decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
        controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
      }
    return(

       
   <Canvas shadows dpr={[1, 2]} camera={{ position: [0, -3, 10], fov: 50, near: 2, far: 20 }}>
      <ambientLight intensity={0.515} />
    
      <Scene />
    </Canvas>

        
    )
}
function MovingSpot({ vec = new Vector3(), ...props }) {
    const light = useRef()
    const viewport = useThree((state) => state.viewport)
    useFrame((state) => {
      light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
      light.current.target.updateMatrixWorld()
    })
    return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
  }