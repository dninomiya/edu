import React from 'react';
import { Box } from '@react-three/drei';

const MultipleBlocks: React.FC = () => {
  return (
    <>
      <Box args={[1, 1, 1]} position={[-1.5, 0.5, 0]}>
        <meshStandardMaterial color={'blue'} />
      </Box>
      <Box args={[1, 1, 1]} position={[-0.5, 0.5, 0]}>
        <meshStandardMaterial color={'red'} />
      </Box>
      <Box args={[1, 1, 1]} position={[0.5, 0.5, 0]}>
        <meshStandardMaterial color={'green'} />
      </Box>
      <Box args={[1, 1, 1]} position={[1.5, 0.5, 0]}>
        <meshStandardMaterial color={'yellow'} />
      </Box>
      <Box args={[1, 1, 1]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color={'purple'} />
      </Box>
    </>
  );
};

export default MultipleBlocks;
