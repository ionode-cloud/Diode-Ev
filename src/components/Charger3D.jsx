import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  ContactShadows,
  Float,
  useTexture,
  RoundedBox,
} from '@react-three/drei'
import * as THREE from 'three'
import './Charger3D.css'

/* ─── PROCEDURAL CANVAS TEXTURE FOR DIODE LIVERY ─── */
function createDiodeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 2048
  const ctx = canvas.getContext('2d')

  // Background gradient (Pale mint to darker green at bottom)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 2048)
  bgGrad.addColorStop(0, '#e8f5ec')
  bgGrad.addColorStop(0.35, '#d6eedd')
  bgGrad.addColorStop(0.65, '#2b6b47')
  bgGrad.addColorStop(1, '#0e2b19')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 1024, 2048)

  // Top header area (clean mint)
  ctx.fillStyle = '#ebf7ee'
  ctx.fillRect(0, 0, 1024, 450)

  // Logo: diode EV
  ctx.fillStyle = '#111827'
  ctx.font = 'bold 88px Outfit, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('diode', 470, 210)

  ctx.fillStyle = '#2db86a'
  ctx.font = 'bold 50px Outfit, sans-serif'
  ctx.fillText('EV', 615, 175)

  // Subtitle: Greening Bharat
  ctx.fillStyle = '#1f2937'
  ctx.font = '400 46px Outfit, sans-serif'
  ctx.fillText('Greening Bharat', 512, 290)

  // Green accent divider
  ctx.fillStyle = '#3de89e'
  ctx.beginPath()
  ctx.roundRect(412, 320, 200, 8, 4)
  ctx.fill()

  // Screen housing boundary
  ctx.fillStyle = '#0a1018'
  ctx.beginPath()
  ctx.roundRect(240, 480, 544, 380, 16)
  ctx.fill()
  ctx.strokeStyle = '#3de89e'
  ctx.lineWidth = 4
  ctx.stroke()

  // 120 KW vertical text on left
  ctx.save()
  ctx.translate(180, 920)
  ctx.rotate(-Math.PI / 2)
  ctx.fillStyle = '#111827'
  ctx.font = 'bold 64px Outfit, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('120 KW', 0, 0)
  ctx.restore()

  // CCS2 vertical text on right
  ctx.save()
  ctx.translate(844, 920)
  ctx.rotate(Math.PI / 2)
  ctx.fillStyle = '#111827'
  ctx.font = 'bold 64px Outfit, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('CCS2', 0, 0)
  ctx.restore()

  // RFID Contactless symbol box
  ctx.fillStyle = '#0a1018'
  ctx.beginPath()
  ctx.roundRect(452, 950, 120, 120, 12)
  ctx.fill()
  ctx.strokeStyle = '#3de89e'
  ctx.lineWidth = 3
  ctx.stroke()

  // RFID wave arcs
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.arc(512, 1010, 25, -Math.PI / 3, Math.PI / 3)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(512, 1010, 40, -Math.PI / 3, Math.PI / 3)
  ctx.stroke()

  // Wavy Road Graphic across middle
  ctx.fillStyle = '#2db86a'
  ctx.beginPath()
  ctx.moveTo(0, 1080)
  ctx.bezierCurveTo(300, 1050, 400, 1140, 512, 1140)
  ctx.bezierCurveTo(650, 1140, 800, 1070, 1024, 1080)
  ctx.lineTo(1024, 1160)
  ctx.bezierCurveTo(800, 1150, 650, 1220, 512, 1220)
  ctx.bezierCurveTo(400, 1220, 300, 1130, 0, 1160)
  ctx.closePath()
  ctx.fill()

  // Dashed white center road line
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 8
  ctx.setLineDash([24, 20])
  ctx.beginPath()
  ctx.moveTo(0, 1120)
  ctx.bezierCurveTo(300, 1090, 400, 1180, 512, 1180)
  ctx.bezierCurveTo(650, 1180, 800, 1110, 1024, 1120)
  ctx.stroke()
  ctx.setLineDash([])

  // Lower Dark Foliage / Tree Silhouette Backdrop
  ctx.fillStyle = '#1b4a2e'
  ctx.fillRect(0, 1200, 1024, 848)

  // Green EV Car Graphic (Top-down view)
  const cx = 512
  const cy = 1620

  // Car Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
  ctx.beginPath()
  ctx.ellipse(cx + 8, cy + 20, 190, 320, 0, 0, Math.PI * 2)
  ctx.fill()

  // Car Body
  ctx.fillStyle = '#73d13d'
  ctx.beginPath()
  ctx.roundRect(cx - 160, cy - 300, 320, 600, 80)
  ctx.fill()

  // Car Windshield & Roof (dark tint)
  ctx.fillStyle = '#0f2416'
  ctx.beginPath()
  ctx.roundRect(cx - 120, cy - 180, 240, 360, 40)
  ctx.fill()

  // Lightning bolt on roof
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(cx + 15, cy - 60)
  ctx.lineTo(cx - 25, cy + 10)
  ctx.lineTo(cx + 5, cy + 10)
  ctx.lineTo(cx - 15, cy + 70)
  ctx.lineTo(cx + 35, cy - 10)
  ctx.lineTo(cx + 5, cy - 10)
  ctx.closePath()
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 16
  return texture
}

/* ─── 3D CHARGER MODEL WITH DETAILED MESH GEOMETRIES ─── */
function Diode3DStation({ batteryPct = 78, mouse }) {
  const groupRef = useRef()
  const stationTexture = useTexture('/images/diode_station.png')
  stationTexture.colorSpace = THREE.SRGBColorSpace
  stationTexture.anisotropy = 16

  const proceduralTexture = useMemo(() => createDiodeTexture(), [])

  // Floating & Mouse motion tracking
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Gentle floating bob
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.05

    // Smooth mouse parallax rotation with spring lerp
    const targetRotY = mouse.x * 0.45
    const targetRotX = -mouse.y * 0.25

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08
  })

  // Materials with PBR textures and reflections
  const mats = useMemo(() => {
    return {
      bodyBlack: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0c0e14'),
        roughness: 0.25,
        metalness: 0.85,
        envMapIntensity: 1.5,
      }),
      chamferMint: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d2edd9'),
        roughness: 0.3,
        metalness: 0.15,
        envMapIntensity: 1.0,
      }),
      screenGlass: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#06141f'),
        roughness: 0.08,
        metalness: 0.3,
        emissive: new THREE.Color('#0a3a4f'),
        emissiveIntensity: 0.6,
      }),
      gunChrome: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e4e7ed'),
        roughness: 0.18,
        metalness: 0.95,
        envMapIntensity: 2.5,
      }),
      gunGrip: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#15171f'),
        roughness: 0.7,
        metalness: 0.2,
      }),
      cableRubber: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#181a20'),
        roughness: 0.8,
        metalness: 0.1,
      }),
      ledRed: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff4757'),
        emissive: new THREE.Color('#ff3838'),
        emissiveIntensity: 4.0,
        toneMapped: false,
      }),
      ledGreen: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2ed573'),
        emissive: new THREE.Color('#2ed573'),
        emissiveIntensity: 3.5,
        toneMapped: false,
      }),
      basePlinth: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#08090c'),
        roughness: 0.5,
        metalness: 0.7,
      }),
    }
  }, [])

  // Left & Right 3D Hanging and Looping Cables
  const leftCableGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.24, -0.35, 0.28),
      new THREE.Vector3(-0.48, -0.7, 0.22),
      new THREE.Vector3(-0.72, -1.15, 0.15),
      new THREE.Vector3(-0.8, -1.65, 0.05),
      new THREE.Vector3(-0.68, -1.98, -0.08),
      new THREE.Vector3(-0.42, -2.12, -0.02),
      new THREE.Vector3(-0.16, -2.15, 0.2),
      new THREE.Vector3(-0.38, -2.18, 0.38),
      new THREE.Vector3(-0.65, -2.14, 0.26),
      new THREE.Vector3(-0.76, -1.82, 0.1),
    ])
    return new THREE.TubeGeometry(curve, 64, 0.042, 12, false)
  }, [])

  const rightCableGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.24, -0.35, 0.28),
      new THREE.Vector3(0.48, -0.7, 0.22),
      new THREE.Vector3(0.72, -1.15, 0.15),
      new THREE.Vector3(0.8, -1.65, 0.05),
      new THREE.Vector3(0.68, -1.98, -0.08),
      new THREE.Vector3(0.42, -2.12, -0.02),
      new THREE.Vector3(0.16, -2.15, 0.2),
      new THREE.Vector3(0.38, -2.18, 0.38),
      new THREE.Vector3(0.65, -2.14, 0.26),
      new THREE.Vector3(0.76, -1.82, 0.1),
    ])
    return new THREE.TubeGeometry(curve, 64, 0.042, 12, false)
  }, [])

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* ─── BASE PLINTH (Octagonal Base with Bolts) ─── */}
      <mesh position={[0, -2.15, 0]} material={mats.basePlinth} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.84, 0.22, 8]} />
      </mesh>
      {/* Base Trim Ring */}
      <mesh position={[0, -2.03, 0]} material={mats.bodyBlack}>
        <cylinderGeometry args={[0.74, 0.78, 0.04, 8]} />
      </mesh>

      {/* ─── MAIN 3D CABINET CORE (Sculpted Rounded Box) ─── */}
      <RoundedBox
        args={[0.88, 3.8, 0.65]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.08, 0]}
        material={mats.bodyBlack}
        castShadow
        receiveShadow
      />

      {/* ─── FRONT LIQUID RETINA DISPLAY / LIVERY FACE ─── */}
      <mesh position={[0, -0.08, 0.33]}>
        <planeGeometry args={[0.86, 3.75]} />
        <meshStandardMaterial
          map={stationTexture}
          roughness={0.2}
          metalness={0.15}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* ─── 3D CHAMFERED ANGLED SIDE PANELS ─── */}
      <mesh position={[-0.45, -0.08, 0.16]} rotation={[0, Math.PI / 4, 0]} material={mats.chamferMint}>
        <planeGeometry args={[0.3, 3.7]} />
      </mesh>
      <mesh position={[0.45, -0.08, 0.16]} rotation={[0, -Math.PI / 4, 0]} material={mats.chamferMint}>
        <planeGeometry args={[0.3, 3.7]} />
      </mesh>

      {/* ─── 3D TOP ROOF CAP (Overhanging Chamfered Hood) ─── */}
      <mesh position={[0, 1.86, 0]} material={mats.bodyBlack} castShadow>
        <cylinderGeometry args={[0.58, 0.52, 0.14, 8]} />
      </mesh>
      <mesh position={[0, 1.95, 0]} material={mats.bodyBlack}>
        <cylinderGeometry args={[0.52, 0.58, 0.06, 8]} />
      </mesh>

      {/* ─── 3D RECESSED CHARGING GUNS (CCS2 Dual Fast Plugs) ─── */}
      {/* Left Gun */}
      <group position={[-0.14, -0.28, 0.36]}>
        <mesh material={mats.bodyBlack}>
          <boxGeometry args={[0.15, 0.28, 0.08]} />
        </mesh>
        <mesh position={[0, 0.02, 0.06]} material={mats.gunChrome} castShadow>
          <cylinderGeometry args={[0.045, 0.05, 0.26, 16]} />
        </mesh>
        <mesh position={[0, 0.12, 0.04]} material={mats.gunGrip}>
          <boxGeometry args={[0.08, 0.1, 0.07]} />
        </mesh>
        <mesh position={[0, -0.09, 0.06]} material={mats.ledGreen}>
          <torusGeometry args={[0.048, 0.009, 12, 24]} />
        </mesh>
      </group>

      {/* Right Gun */}
      <group position={[0.14, -0.28, 0.36]}>
        <mesh material={mats.bodyBlack}>
          <boxGeometry args={[0.15, 0.28, 0.08]} />
        </mesh>
        <mesh position={[0, 0.02, 0.06]} material={mats.gunChrome} castShadow>
          <cylinderGeometry args={[0.045, 0.05, 0.26, 16]} />
        </mesh>
        <mesh position={[0, 0.12, 0.04]} material={mats.gunGrip}>
          <boxGeometry args={[0.08, 0.1, 0.07]} />
        </mesh>
        <mesh position={[0, -0.09, 0.06]} material={mats.ledGreen}>
          <torusGeometry args={[0.048, 0.009, 12, 24]} />
        </mesh>
      </group>

      {/* ─── 3D HEAVY CABLES (Realistic Physics Looping Geometry) ─── */}
      <mesh geometry={leftCableGeo} material={mats.cableRubber} castShadow />
      <mesh geometry={rightCableGeo} material={mats.cableRubber} castShadow />

      {/* ─── GLOWING 3D LED LIGHT BARS ON CORNER CHAMFERS ─── */}
      <mesh position={[-0.37, 0.65, 0.28]} rotation={[0, Math.PI / 4, 0]} material={mats.ledRed}>
        <boxGeometry args={[0.018, 0.44, 0.012]} />
      </mesh>
      <mesh position={[0.37, 0.65, 0.28]} rotation={[0, -Math.PI / 4, 0]} material={mats.ledRed}>
        <boxGeometry args={[0.018, 0.44, 0.012]} />
      </mesh>

      {/* Active Light Sources casting real-time specular highlights */}
      <pointLight position={[-0.45, 0.65, 0.4]} color="#ff4757" intensity={1.8} distance={1.4} />
      <pointLight position={[0.45, 0.65, 0.4]} color="#ff4757" intensity={1.8} distance={1.4} />
      <pointLight position={[0, 0.45, 0.6]} color="#3de89e" intensity={1.2} distance={1.8} />
      <pointLight position={[0, -2.1, 0.5]} color="#3de89e" intensity={0.9} distance={1.6} />
    </group>
  )
}

/* ─── CAMERA CONTROLLER WITH SMOOTH BUTTON ZOOM & RESET ─── */
function CameraController({ zoomTarget, resetTrigger }) {
  const { camera } = useThree()
  const targetZ = useRef(5.8)

  useEffect(() => {
    targetZ.current = zoomTarget
  }, [zoomTarget])

  useEffect(() => {
    if (resetTrigger > 0) {
      camera.position.set(0, 0.1, 5.8)
    }
  }, [resetTrigger, camera])

  useFrame(() => {
    camera.position.z += (targetZ.current - camera.position.z) * 0.08
  })

  return null
}

/* ─── MAIN CHARGER 3D WEBGL COMPONENT ─── */
export default function Charger3D({
  height = '620px',
  batteryPct = 78,
  showDisplay = true,
  className = '',
}) {
  const [zoomDistance, setZoomDistance] = useState(5.8)
  const [resetCount, setResetCount] = useState(0)
  const [autoRotate, setAutoRotate] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Track mouse coordinates for 3D parallax motion
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMouse({ x, y })
  }

  // Zoom controls (starts at 50%, zooms in up to 200%+, zooms out to 30%)
  const handleZoomIn = () => {
    setZoomDistance((prev) => Math.max(2.0, prev - 0.6))
  }

  const handleZoomOut = () => {
    setZoomDistance((prev) => Math.min(7.5, prev + 0.6))
  }

  const handleReset = () => {
    setZoomDistance(5.8)
    setAutoRotate(false)
    setMouse({ x: 0, y: 0 })
    setResetCount((c) => c + 1)
  }

  const toggleAutoRotate = () => {
    setAutoRotate((r) => !r)
  }

  // Calculate zoom %: 50% at starting distance (5.8), scaling up on zoom in
  const zoomPercent = Math.round(50 * (5.8 / zoomDistance))

  return (
    <div
      ref={containerRef}
      className={`charger3d-webgl ${className}`}
      style={{ height }}
      onMouseMove={handleMouseMove}
      id="charger-3d-webgl-wrapper"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{ position: [0, 0.1, 5.8], fov: 44 }}
      >
        {/* Cinematic Studio Lights (Zero external network dependencies / No CORS errors) */}
        <hemisphereLight skyColor="#d8ecfa" groundColor="#06080d" intensity={0.65} />
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="#ffffff"
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.9} color="#00e5ff" />
        <directionalLight position={[0, -2, 3]} intensity={0.5} color="#3de89e" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#ffffff" />

        {/* Motionable 3D Diode Station with Floating physics */}
        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <Diode3DStation batteryPct={batteryPct} mouse={mouse} />
          </Float>
        </Suspense>

        {/* Realistic Floor Contact Shadows */}
        <ContactShadows
          position={[0, -2.0, 0]}
          opacity={0.8}
          scale={5.5}
          blur={2.4}
          far={3.5}
          color="#000000"
        />

        {/* 360° OrbitControls for Drag to Rotate & Mouse Wheel Zoom */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.06}
          enablePan={false}
          enableZoom={true}
          minDistance={2.0}
          maxDistance={7.5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 + 0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={1.8}
        />

        {/* Smooth Camera Zoom Controller */}
        <CameraController zoomTarget={zoomDistance} resetTrigger={resetCount} />
      </Canvas>

      {/* ─── LIVE CHARGING STATS HUD ─── */}
      {showDisplay && (
        <div className="charger3d-hud" id="charger-live-hud">
          <div className="charger3d-hud__top">
            <div className="charger3d-hud__status">
              <span className="charger3d-hud__dot" />
              <span>DIODE 120 kW FAST CHARGE</span>
            </div>
            <span className="charger3d-hud__badge">LIVE ⚡</span>
          </div>

          <div className="charger3d-hud__content">
            <div className="charger3d-hud__main">
              <span className="charger3d-hud__pct">{batteryPct}%</span>
              <span className="charger3d-hud__pct-sub">Current Battery</span>
            </div>
            <div className="charger3d-hud__sep" />
            <div className="charger3d-hud__grid">
              <div className="charger3d-hud__item">
                <span className="charger3d-hud__k">Power</span>
                <span className="charger3d-hud__v text-accent">120 kW</span>
              </div>
              <div className="charger3d-hud__item">
                <span className="charger3d-hud__k">Standard</span>
                <span className="charger3d-hud__v">Dual CCS2</span>
              </div>
              <div className="charger3d-hud__item">
                <span className="charger3d-hud__k">Range</span>
                <span className="charger3d-hud__v">284 km</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 3D INTERACTIVE CONTROLS (Zoom In, Out, 360 Spin, Reset) ─── */}
      <div className="charger3d-controls" id="charger-3d-controls">
        <div className="charger3d-controls__badge" title="Zoom Magnification">
          {zoomPercent}%
        </div>
        <button
          className="charger3d-controls__btn"
          onClick={handleZoomIn}
          title="Zoom In (or scroll wheel up)"
          aria-label="Zoom in"
          id="btn-3d-zoom-in"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          className="charger3d-controls__btn"
          onClick={handleZoomOut}
          title="Zoom Out (or scroll wheel down)"
          aria-label="Zoom out"
          id="btn-3d-zoom-out"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          className={`charger3d-controls__btn ${autoRotate ? 'active' : ''}`}
          onClick={toggleAutoRotate}
          title="Toggle 360° Auto Rotation"
          aria-label="Auto rotate"
          id="btn-3d-auto-rotate"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
          </svg>
        </button>
        <button
          className="charger3d-controls__btn"
          onClick={handleReset}
          title="Reset Camera & Angle"
          aria-label="Reset view"
          id="btn-3d-reset"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* ─── 3D MOTION HINT ─── */}
      <div className="charger3d-hint">
        <span>🎮 Move cursor for 3D motion · Drag to rotate · Scroll to Zoom</span>
      </div>
    </div>
  )
}
