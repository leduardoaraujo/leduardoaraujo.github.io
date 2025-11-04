import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE: any;
  }
}

const AsciiGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;

    const loadThreeJS = () => {
      if (window.THREE) {
        initGlobe();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        initGlobe();
      };
      document.head.appendChild(script);
    };

    const initGlobe = () => {
      if (!containerRef.current || initializedRef.current) return;
      initializedRef.current = true;

      const WIDTH = 48;
      const HEIGHT = 48;
      const scene = new window.THREE.Scene();
      const camera = new window.THREE.PerspectiveCamera(1, WIDTH / HEIGHT, 0.1, 1000);
      const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(WIDTH, HEIGHT);

      const texture = new window.THREE.TextureLoader().load('data:image/jpeg;base64,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');

      const geometry = new window.THREE.SphereGeometry(3, 64, 48);
      const material = new window.THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        roughness: 1,
        metalness: 1,
        map: texture
      });

      const globe = new window.THREE.Mesh(geometry, material);
      globe.rotation.z = Math.PI;
      globe.rotation.y = 1.5;
      scene.add(globe);

      const light = new window.THREE.PointLight(0xffffff, 3.33, 0);
      light.position.set(150, -150, 1500);
      scene.add(light);

      const light2 = new window.THREE.PointLight(0xffffff, 2, 0);
      light2.position.set(-125, 100, -500);
      scene.add(light2);

      camera.position.z = 345;
      containerRef.current.appendChild(renderer.domElement);

      const gl = renderer.context;
      const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
      const ASCII = "   ·—+=##";

      const outputEl = document.createElement('div');
      outputEl.id = 'ascii-output';
      containerRef.current.appendChild(outputEl);

      const reverseString = (str: string) => str.split("").reverse().join("");

      const grayscale10 = (pixels: Uint8Array) => {
        const length = pixels.length;
        const gsPixels: number[] = [];
        for (let i = 0; i < length; i += 4) {
          gsPixels.push(
            Math.floor(
              (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 768 * ASCII.length
            )
          );
        }
        return gsPixels;
      };

      const asciify = (val: number, index: number) => {
        let br = "";
        if (index !== 0 && index % WIDTH === 0) {
          br = "\n";
        }
        return br + ASCII[val];
      };

      const render = () => {
        requestAnimationFrame(render);
        globe.rotation.y -= 0.003;
        renderer.render(scene, camera);
        gl.readPixels(0, 0, WIDTH, HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        const text = grayscale10(pixels).map(asciify).join("");
        outputEl.innerHTML = text.split("\n").map(reverseString).join("\n");
      };

      render();
    };

    loadThreeJS();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400&display=swap" rel="stylesheet" />
      <div className="relative">
        <div ref={containerRef} className="ascii-globe-container" />
        <style>{`
          .ascii-globe-container canvas {
            position: absolute;
            top: -9999px;
            left: -9999px;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }
          .ascii-globe-container #ascii-output {
            background-image: radial-gradient(
              circle farthest-corner at 75% 75%,
              rgba(0,0,16,1) 0%,
              rgba(0,16,32,1) 50%,
              rgb(20, 22, 22) 100%
            );
            border-radius: 100%;
            color: rgb(255, 255, 255);
            font-family: "Inconsolata", monospace;
            font-size: 3vmin;
            line-height: .55em;
            text-rendering: optimizeSpeed;
            will-change: contents;
            white-space: pre;
            cursor: grab;
            user-select: none;
            display: inline-block;
          }
          .ascii-globe-container #ascii-output:active {
            cursor: grabbing;
          }
        `}</style>
      </div>
    </>
  );
};

export default AsciiGlobe;

