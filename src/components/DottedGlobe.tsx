import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

// Converter lat/lon para posicao 3D na esfera
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

// Contornos dos continentes simplificados (linhas conectadas)
const continentOutlines: { name: string; coords: [number, number][]; isBrazil?: boolean }[] = [
  // America do Sul - contorno
  {
    name: 'south-america',
    coords: [
      [12, -72], [10, -75], [5, -77], [0, -80], [-5, -81], [-10, -78],
      [-15, -75], [-18, -70], [-23, -70], [-27, -71], [-33, -72], [-40, -73],
      [-46, -75], [-52, -70], [-55, -68], [-56, -67], [-54, -65], [-52, -58],
      [-46, -60], [-42, -62], [-38, -57], [-35, -53], [-33, -52], [-28, -49],
      [-25, -48], [-23, -44], [-22, -40], [-18, -39], [-13, -38], [-8, -35],
      [-5, -35], [-2, -44], [2, -50], [5, -60], [8, -62], [10, -67], [12, -72]
    ]
  },
  // Brasil - contorno destacado
  {
    name: 'brazil',
    isBrazil: true,
    coords: [
      [5, -60], [4, -52], [2, -50], [0, -50], [-2, -44], [-5, -35], [-8, -35],
      [-10, -37], [-13, -38], [-18, -39], [-22, -40], [-23, -44], [-25, -48],
      [-28, -49], [-30, -51], [-33, -53], [-30, -55], [-27, -56], [-24, -55],
      [-20, -58], [-16, -58], [-12, -61], [-8, -63], [-5, -70], [-2, -67],
      [0, -67], [2, -60], [5, -60]
    ]
  },
  // America do Norte - contorno
  {
    name: 'north-america',
    coords: [
      [10, -85], [15, -88], [20, -90], [22, -98], [25, -100], [28, -97],
      [30, -95], [29, -88], [30, -85], [25, -80], [30, -82], [35, -76],
      [40, -74], [42, -70], [45, -67], [47, -60], [52, -56], [55, -60],
      [60, -65], [65, -68], [70, -75], [72, -85], [70, -100], [68, -110],
      [65, -120], [60, -140], [58, -152], [62, -165], [65, -168], [70, -162],
      [72, -155], [71, -140], [70, -130], [65, -125], [60, -125], [55, -130],
      [50, -128], [48, -125], [45, -124], [40, -124], [35, -120], [32, -117],
      [28, -115], [23, -110], [20, -105], [18, -98], [15, -92], [10, -85]
    ]
  },
  // Europa - contorno
  {
    name: 'europe',
    coords: [
      [36, -10], [38, -5], [43, -8], [44, 0], [48, -5], [50, 2], [52, 5],
      [55, 8], [58, 10], [60, 5], [62, 10], [65, 15], [70, 20], [72, 28],
      [70, 32], [68, 45], [65, 55], [60, 60], [55, 55], [50, 40], [48, 35],
      [46, 30], [44, 28], [42, 25], [40, 22], [38, 24], [36, 22], [35, 15],
      [36, 10], [38, 5], [36, -2], [36, -10]
    ]
  },
  // Africa - contorno
  {
    name: 'africa',
    coords: [
      [35, -5], [37, 10], [35, 12], [32, 30], [30, 33], [25, 35], [20, 38],
      [15, 42], [10, 45], [5, 42], [0, 42], [-5, 40], [-10, 40], [-15, 35],
      [-20, 30], [-25, 28], [-30, 25], [-35, 20], [-34, 18], [-30, 17],
      [-25, 15], [-20, 12], [-15, 12], [-10, 15], [-5, 10], [0, 8], [5, 0],
      [10, -5], [15, -17], [20, -17], [25, -15], [28, -10], [32, -5], [35, -5]
    ]
  },
  // Asia - contorno simplificado
  {
    name: 'asia',
    coords: [
      [70, 60], [75, 80], [77, 100], [75, 120], [70, 140], [68, 160],
      [65, 170], [60, 165], [55, 160], [50, 145], [45, 140], [40, 130],
      [35, 135], [32, 130], [28, 122], [22, 115], [15, 120], [10, 105],
      [5, 100], [0, 105], [-5, 105], [-8, 115], [-10, 120], [-8, 130],
      [-5, 135], [0, 140], [5, 145], [8, 140], [15, 145], [20, 145],
      [25, 130], [30, 122], [35, 110], [40, 100], [35, 80], [40, 70],
      [45, 60], [50, 50], [55, 45], [60, 50], [65, 55], [70, 60]
    ]
  },
  // Australia - contorno
  {
    name: 'australia',
    coords: [
      [-12, 130], [-15, 125], [-20, 118], [-25, 114], [-30, 115], [-35, 118],
      [-38, 145], [-35, 150], [-30, 153], [-25, 152], [-20, 148], [-15, 145],
      [-12, 142], [-10, 145], [-12, 140], [-12, 130]
    ]
  }
];

// Linhas de grade (meridianos e paralelos)
function createGridLines(radius: number): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = [];

  // Meridianos (linhas verticais) - a cada 30 graus
  for (let lon = -180; lon < 180; lon += 30) {
    const line: THREE.Vector3[] = [];
    for (let lat = -80; lat <= 80; lat += 4) {
      line.push(latLonToVector3(lat, lon, radius));
    }
    lines.push(line);
  }

  // Paralelos (linhas horizontais) - equador e tropicos
  for (const lat of [-60, -30, 0, 30, 60]) {
    const line: THREE.Vector3[] = [];
    for (let lon = -180; lon <= 180; lon += 4) {
      line.push(latLonToVector3(lat, lon, radius));
    }
    lines.push(line);
  }

  return lines;
}

// Componente de linha tracejada estilo ASCII
function DashedContinent({
  coords,
  color,
  lineWidth = 1,
  dashSize = 0.05,
  gapSize = 0.03,
  radius = 2
}: {
  coords: [number, number][];
  color: string;
  lineWidth?: number;
  dashSize?: number;
  gapSize?: number;
  radius?: number;
}) {
  const points = useMemo(() => {
    return coords.map(([lat, lon]) => latLonToVector3(lat, lon, radius));
  }, [coords, radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={lineWidth}
      dashed
      dashSize={dashSize}
      gapSize={gapSize}
    />
  );
}

// Componente do Globo
function Globe({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2;

  // Linhas de grade
  const gridLines = useMemo(() => createGridLines(radius * 0.99), []);

  // Animacao baseada no scroll com ZOOM
  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Rotacao suave baseada no scroll
      const targetRotationY = -0.8 + scrollProgress * Math.PI * 0.8;
      const targetRotationX = 0.3 + scrollProgress * Math.PI * 0.3;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.02
      );

      // Rotacao automatica lenta
      groupRef.current.rotation.y += 0.0008;

      // ZOOM baseado no scroll - camera se aproxima
      const targetZ = 5.5 - scrollProgress * 2;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, -0.8, 0]}>
      {/* Esfera base wireframe estilo terminal */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 32, 32]} />
        <meshBasicMaterial
          color="#0a0a12"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Linhas de grade - estilo CLI */}
      {gridLines.map((line, i) => (
        <Line
          key={`grid-${i}`}
          points={line}
          color="#1a1a2e"
          lineWidth={0.5}
          dashed
          dashSize={0.08}
          gapSize={0.04}
        />
      ))}

      {/* Contornos dos continentes */}
      {continentOutlines.map((continent) => (
        <DashedContinent
          key={continent.name}
          coords={continent.coords}
          color={continent.isBrazil ? "#3b82f6" : "#4a5568"}
          lineWidth={continent.isBrazil ? 2.5 : 1.2}
          dashSize={continent.isBrazil ? 0.03 : 0.06}
          gapSize={continent.isBrazil ? 0.015 : 0.03}
          radius={continent.isBrazil ? radius * 1.002 : radius}
        />
      ))}

      {/* Brasil - glow externo */}
      {continentOutlines.filter(c => c.isBrazil).map((continent) => (
        <DashedContinent
          key={`${continent.name}-glow`}
          coords={continent.coords}
          color="#60a5fa"
          lineWidth={4}
          dashSize={0.03}
          gapSize={0.015}
          radius={radius * 1.003}
        />
      ))}

      {/* Anel equatorial decorativo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.05, radius * 1.08, 64]} />
        <meshBasicMaterial
          color="#1e3a5f"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Particulas flutuantes minimalistas
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions: number[] = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 5 + Math.random() * 5;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.015}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Componente principal
const DottedGlobe = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Globe scrollProgress={scrollProgress} />
        <FloatingParticles />
      </Canvas>

      {/* Vinheta para profundidade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, hsl(220, 20%, 4%) 80%)'
        }}
      />
    </div>
  );
};

export default DottedGlobe;
