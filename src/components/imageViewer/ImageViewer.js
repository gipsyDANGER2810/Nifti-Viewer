// import React from 'react'
// import { useState, useEffect, useRef } from "react";
// import Slider from '../slider/Slider'


// function ImageViewer({ niftiData }) {
//     const { header, image } = niftiData;
//     const [currentSlice, setCurrentSlice] = useState(0);
//     const canvasRef = useRef(null);
  
//     const sliceCount = header.dims[3];
//     const cols = header.dims[1];
//     const rows = header.dims[2];
  
//     useEffect(() => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       const imageData = ctx.createImageData(cols, rows);
//       const sliceOffset = currentSlice * cols * rows;
  
//       for (let row = 0; row < rows; row++) {
//         for (let col = 0; col < cols; col++) {
//           const pixelIndex = sliceOffset + row * cols + col;
//           const pixelValue = image[pixelIndex];
//           const index = (row * cols + col) * 4;
  
//           imageData.data[index] = pixelValue;
//           imageData.data[index + 1] = pixelValue;
//           imageData.data[index + 2] = pixelValue;
//           imageData.data[index + 3] = 255;
//         }
//       }
  
//       ctx.putImageData(imageData, 0, 0);
//     }, [currentSlice, cols, rows, image]);
  
//     return (
//       <div className='image_viewer'>
//         <Slider
//           sliceCount={sliceCount}
//           currentSlice={currentSlice}
//           onChange={(value) => setCurrentSlice(value)}
//         />
//         <canvas
//           ref={canvasRef}
//           width={cols}
//           height={rows}
//           className="border"
//         ></canvas>
//       </div>
//     );
//   }
  
//   export default ImageViewer;


// import React, { useState, useEffect, useRef } from "react";
// import Slider from "../slider/Slider";

// function ImageViewer({ niftiData }) {
//   const { header, image } = niftiData;
//   const [currentSlice, setCurrentSlice] = useState(0);
//   const canvasRef = useRef(null);

//   const sliceCount = header.dims[3];
//   const cols = header.dims[1];
//   const rows = header.dims[2];

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // Ensure the canvas size is larger for better visibility
//     const scale = 1; // Scaling factor
//     canvas.width = cols * scale;
//     canvas.height = rows * scale;
    
//     const imageData = ctx.createImageData(cols, rows);
//     const sliceOffset = currentSlice * cols * rows;

//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         const pixelIndex = sliceOffset + row * cols + col;
//         const pixelValue = image[pixelIndex];
//         const index = (row * cols + col) * 4;

//         imageData.data[index] = pixelValue;
//         imageData.data[index + 1] = pixelValue;
//         imageData.data[index + 2] = pixelValue;
//         imageData.data[index + 3] = 255;
//       }
//     }

//     // Clear the canvas before drawing
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Scale the image data to fit the larger canvas
//     ctx.putImageData(imageData, 0, 0);
//     ctx.scale(scale, scale);
//     ctx.drawImage(canvas, 0, 0);

//   }, [currentSlice, cols, rows, image]);

//   return (
//     <div className='image_viewer'>
//       <Slider
//         sliceCount={sliceCount}
//         currentSlice={currentSlice}
//         onChange={(value) => setCurrentSlice(value)}
//       />
//       <canvas
//         ref={canvasRef}
//         width={cols}
//         height={rows}
//         className="border"
//         style={{ width: cols * 2, height: rows * 2 }} // Display size
//       ></canvas>
//     </div>
//   );
// }

// export default ImageViewer;



import React, { useState, useEffect, useRef } from "react";
import Slider from "../slider/Slider";
import './ImageViewer.css';

function ImageViewer({ niftiData }) {
  const { header, image } = niftiData;
  const [currentSlice, setCurrentSlice] = useState(0);
  const canvasRef = useRef(null);

  const cols = header.dims[1];
  const rows = header.dims[2];
  const slices = header.dims[3]; // Number of slices

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the image dimensions
    canvas.width = cols;
    canvas.height = rows;

    const imageData = ctx.createImageData(cols, rows);

    // To get the axial slice, you need to iterate through the correct dimension
    const sliceOffset = currentSlice * cols * rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pixelIndex = sliceOffset + row * cols + col;
        const pixelValue = image[pixelIndex];
        const index = (row * cols + col) * 4;

        imageData.data[index] = pixelValue;
        imageData.data[index + 1] = pixelValue;
        imageData.data[index + 2] = pixelValue;
        imageData.data[index + 3] = 255;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  }, [currentSlice, cols, rows, image]);

  return (
    <div className="image-viewer">
      <Slider
        sliceCount={slices}
        currentSlice={currentSlice}
        onChange={(value) => setCurrentSlice(value)}
      />
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="border"
        ></canvas>
      </div>
    </div>
  );
}

export default ImageViewer;

