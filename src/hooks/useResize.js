// import { useState, useEffect } from 'react';

// export default function useResize() {
//   const [size, setSize] = useState({ width: 0 });

//   useEffect(() => {
//     const handleGetWidth = () => {
//       setSize({ width: window.innerWidth });
//     };

//     handleGetWidth();
//     window.addEventListener('resize', handleGetWidth);

//     return () => {
//       window.removeEventListener('resize', handleGetWidth);
//     };
//   }, []);

//   return size;
// }
