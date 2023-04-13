import { Box, CameraControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const ThreeDViewer: React.FC = () => {
  const [blocks, setBlocks] = useState<any[]>([]);
  const cameraControlRef = useRef<CameraControls>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createRandomBlock = (x: number, y: number, z: number) => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const randomString = Math.random().toString(36).slice(-8);
    return (
      <Box key={randomString} args={[1, 1, 1]} position={[x, y, z]}>
        <meshStandardMaterial color={color} />
      </Box>
    );
  };

  const setCameraView = (view: string) => {
    if (!cameraControlRef.current) return;

    switch (view) {
      case 'diagonal':
        cameraControlRef.current.setPosition(3, 3, 3, true);
        break;
      case 'top':
        cameraControlRef.current.setPosition(0, 10, 0, true);
        break;
      case 'bottom':
        cameraControlRef.current.setPosition(0, -10, 0, true);
        break;
      case 'left':
        cameraControlRef.current.setPosition(-10, 0, 0, true);
        break;
      case 'right':
        cameraControlRef.current.setPosition(10, 0, 0, true);
        break;
      case 'front':
        cameraControlRef.current.setPosition(0, 0, 10, true);
        break;
      case 'back':
        cameraControlRef.current.setPosition(0, 0, -10, true);
        break;
    }
    // cameraControlRef.current.setLookAt(3, 3, 3, 0, 0, 0);
  };

  const generateRandomBlocks = () => {
    const newBlocks = [];
    const numBlocks = Math.floor(Math.random() * 10) + 1;
    let x = 0;
    let y = 0;
    let z = 0;

    for (let i = 0; i < numBlocks; i++) {
      newBlocks.push(createRandomBlock(x, y, z));

      const direction = Math.floor(Math.random() * 6);
      switch (direction) {
        case 0:
          x += 1;
          break;
        case 1:
          x -= 1;
          break;
        case 2:
          y += 1;
          break;
        case 3:
          y -= 1;
          break;
        case 4:
          z += 1;
          break;
        case 5:
          z -= 1;
          break;
      }
    }
    setBlocks(newBlocks);
  };

  useEffect(() => {
    generateRandomBlocks();
  }, []);

  return (
    <div>
      <Link href="/">back</Link>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={generateRandomBlocks}
      >
        切り替える
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCameraView('diagonal')}
      >
        リセット
      </button>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCameraView('top')}
      >
        うえ
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCameraView('bottom')}
      >
        した
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCameraView('left')}
      >
        ひだり
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCameraView('right')}
      >
        みぎ
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCameraView('front')}
      >
        まえ
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCameraView('back')}
      >
        うしろ
      </button>

      <Canvas
        ref={canvasRef}
        className="mx-auto border"
        style={{ width: 480, height: 480 }}
        orthographic
        camera={{ position: [3, 3, 3], zoom: 50 }}
      >
        <CameraControls ref={cameraControlRef} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {blocks}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeDViewer;
