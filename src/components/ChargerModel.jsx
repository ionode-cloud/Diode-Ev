import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, ContactShadows, Text3D } from '@react-three/drei'
import * as THREE from 'three'

/* ─── MATERIALS ────────────────────────────────────────── */
function useMaterials() {
  return useMemo(() => {
    // Main dark housing
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0e1016'),
      roughness: 0.25,
      metalness: 0.7,
      envMapIntensity: 1.5,
    })

    // White/light livery panel
    const liveryMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8f5e9'),
      roughness: 0.45,
      metalness: 0.1,
    })

    // Green accent strip
    const greenMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2d9b55'),
      roughness: 0.3,
      metalness: 0.4,
      emissive: new THREE.Color('#0f3d1e'),
      emissiveIntensity: 0.3,
    })

    // Screen glass
    const screenMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#061520'),
      roughness: 0.05,
      metalness: 0.1,
      emissive: new THREE.Color('#0c3d5a'),
      emissiveIntensity: 0.8,
    })

    // Connector housing
    const connectorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1c26'),
      roughness: 0.3,
      metalness: 0.8,
    })

    // Cable rubber
    const cableMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c1c1c'),
      roughness: 0.9,
      metalness: 0.05,
    })

    // Base
    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0b10'),
      roughness: 0.6,
      metalness: 0.5,
    })

    // Gold trim
    const trimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c8a84b'),
      roughness: 0.2,
      metalness: 0.9,
    })

    return { bodyMat, liveryMat, greenMat, screenMat, connectorMat, cableMat, baseMat, trimMat }
  }, [])
}

/* ─── CABLE ────────────────────────────────────────────── */
function ChargingCable({ startX, color = '#1c1c1c' }) {
  const curve = useMemo(() => {
    const s = startX > 0 ? 1 : -1
    const points = [
      new THREE.Vector3(startX, -0.6, 0.28),
      new THREE.Vector3(startX + s * 0.15, -0.85, 0.2),
      new THREE.Vector3(startX + s * 0.4, -1.1, 0.05),
      new THREE.Vector3(startX + s * 0.65, -1.5, -0.1),
      new THREE.Vector3(startX + s * 0.55, -2.0, -0.05),
      new THREE.Vector3(startX + s * 0.35, -2.4, 0.1),
    ]
    return new THREE.CatmullRomCurve3(points)
  }, [startX])

  const tubeGeo = useMemo(() =>
    new THREE.TubeGeometry(curve, 40, 0.045, 10, false),
    [curve]
  )

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.88,
    metalness: 0.05,
  }), [color])

  return <mesh geometry={tubeGeo} material={mat} />
}

/* ─── CHARGING GUN ─────────────────────────────────────── */
function ChargingGun({ position, mat }) {
  return (
    <group position={position}>
      {/* housing */}
      <mesh material={mat}>
        <cylinderGeometry args={[0.075, 0.095, 0.22, 16]} />
      </mesh>
      {/* connector ring */}
      <mesh position={[0, -0.13, 0]} material={mat}>
        <torusGeometry args={[0.09, 0.018, 12, 24]} />
      </mesh>
      {/* grip */}
      <mesh position={[0, 0.08, 0]} material={mat}>
        <boxGeometry args={[0.13, 0.16, 0.1]} />
      </mesh>
      {/* status LED ring */}
      <mesh position={[0, -0.04, 0.09]}>
        <ringGeometry args={[0.03, 0.05, 20]} />
        <meshStandardMaterial
          color="#3de89e"
          emissive="#3de89e"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

/* ─── SCREEN DISPLAY ───────────────────────────────────── */
function ChargerScreen({ batteryPct }) {
  return (
    <group position={[0, 0.52, 0.301]}>
      {/* screen glass */}
      <mesh>
        <planeGeometry args={[0.52, 0.36]} />
        <meshStandardMaterial
          color="#061520"
          roughness={0.05}
          metalness={0.1}
          emissive="#0c3d5a"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* screen glow plane */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.52, 0.36]} />
        <meshStandardMaterial
          color="#00c8ff"
          transparent
          opacity={0.04}
          emissive="#00c8ff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

/* ─── LOWER EV GRAPHIC PANEL ───────────────────────────── */
function LowerGraphicPanel() {
  return (
    <group position={[0, -0.55, 0.3]}>
      {/* dark graphic area */}
      <mesh>
        <planeGeometry args={[0.52, 0.45]} />
        <meshStandardMaterial color="#0d1a0e" roughness={0.6} />
      </mesh>
      {/* lightning bolt - simplified */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[0.08, 0.16]} />
        <meshStandardMaterial
          color="#3de89e"
          emissive="#3de89e"
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

/* ─── MAIN CHARGER MODEL ───────────────────────────────── */
export function ChargerModel({ batteryPct = 78, scale = 1 }) {
  const mats = useMaterials()
  const groupRef = useRef()

  return (
    <group ref={groupRef} scale={scale}>
      {/* === BASE PLINTH === */}
      <mesh position={[0, -2.0, 0]} material={mats.baseMat} receiveShadow>
        <boxGeometry args={[0.85, 0.14, 0.72]} />
      </mesh>
      <mesh position={[0, -1.97, 0]} material={mats.trimMat}>
        <boxGeometry args={[0.87, 0.025, 0.74]} />
      </mesh>

      {/* === MAIN CABINET BODY === */}
      <RoundedBox
        args={[0.65, 2.7, 0.58]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.25, 0]}
        material={mats.bodyMat}
        castShadow
      />

      {/* === LEFT SIDE LABEL STRIPS === */}
      {/* 120KW green strip */}
      <mesh position={[-0.31, 0.35, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.42, 0.1]} />
        <meshStandardMaterial
          color="#2d9b55"
          emissive="#1a5c33"
          emissiveIntensity={0.4}
          roughness={0.3}
        />
      </mesh>
      {/* CCS2 purple strip */}
      <mesh position={[0.31, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.42, 0.1]} />
        <meshStandardMaterial
          color="#5b4de8"
          emissive="#2a1fa0"
          emissiveIntensity={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* === FRONT LIVERY PANEL (upper white area) === */}
      <mesh position={[0, 0.78, 0.291]}>
        <planeGeometry args={[0.6, 0.52]} />
        <meshStandardMaterial
          color="#dff0e3"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Diode EV brand strip */}
      <mesh position={[0, 1.0, 0.292]}>
        <planeGeometry args={[0.6, 0.1]} />
        <meshStandardMaterial color="#2d9b55" roughness={0.3} />
      </mesh>

      {/* === SCREEN === */}
      <ChargerScreen batteryPct={batteryPct} />

      {/* Screen frame */}
      <mesh position={[0, 0.52, 0.298]}>
        <planeGeometry args={[0.56, 0.4]} />
        <meshStandardMaterial color="#0e1016" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* === LOWER GRAPHIC PANEL === */}
      <LowerGraphicPanel />

      {/* Green bottom trim strip */}
      <mesh position={[0, -0.82, 0.291]}>
        <planeGeometry args={[0.6, 0.04]} />
        <meshStandardMaterial
          color="#3de89e"
          emissive="#3de89e"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* === CHARGING CONNECTORS === */}
      {/* Left connector */}
      <ChargingGun position={[-0.12, -0.62, 0.3]} mat={mats.connectorMat} />
      {/* Right connector */}
      <ChargingGun position={[0.12, -0.62, 0.3]} mat={mats.connectorMat} />

      {/* Connector housing bar */}
      <mesh position={[0, -0.62, 0.31]}>
        <boxGeometry args={[0.35, 0.11, 0.06]} />
        <meshStandardMaterial color="#0a0b10" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* === CHARGING CABLES === */}
      <ChargingCable startX={-0.12} />
      <ChargingCable startX={0.12} />

      {/* === TOP CAP === */}
      <mesh position={[0, 1.62, 0]} material={mats.bodyMat}>
        <boxGeometry args={[0.66, 0.06, 0.59]} />
      </mesh>
      <mesh position={[0, 1.65, 0]} material={mats.trimMat}>
        <boxGeometry args={[0.66, 0.015, 0.59]} />
      </mesh>

      {/* Ventilation grilles top */}
      {[-0.18, 0, 0.18].map((x, i) => (
        <mesh key={i} position={[x, 1.55, 0.29]} material={mats.bodyMat}>
          <boxGeometry args={[0.04, 0.025, 0.01]} />
        </mesh>
      ))}

      {/* === SCREEN EDGE GLOW ===  */}
      <pointLight
        position={[0, 0.52, 0.6]}
        color="#00c8ff"
        intensity={0.8}
        distance={1.2}
      />
      <pointLight
        position={[-0.12, -0.62, 0.5]}
        color="#3de89e"
        intensity={0.5}
        distance={0.8}
      />
      <pointLight
        position={[0.12, -0.62, 0.5]}
        color="#3de89e"
        intensity={0.5}
        distance={0.8}
      />
    </group>
  )
}
