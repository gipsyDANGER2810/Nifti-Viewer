import React, { useState} from 'react';
import * as nifti from 'nifti-reader-js';

const NiftiViewer = ({onFileUpload}) => {

    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        const uploadedFile = e.target.files[0];
        let niftiHeader, niftiImage;
        if (uploadedFile) {
            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onload = async (e) => {
                const buffer = e.target.result;
                try {
                    if (nifti.isCompressed(buffer)) {
                        const decompressed = nifti.decompress(buffer);
                        if (nifti.isNIFTI(decompressed)) {
                            niftiHeader = nifti.readHeader(decompressed);
                            niftiImage = nifti.readImage(niftiHeader, decompressed);
                          }
                    }else if (nifti.isNIFTI(buffer)){
                        niftiHeader = nifti.readHeader(buffer);
                        niftiImage = nifti.readImage(niftiHeader, buffer);
                    }
                    if (niftiHeader && niftiImage) {
                        console.log("NIfTIiii Header:", niftiHeader);
                        console.log(
                          "NIfTIii Image Length:",
                          niftiImage ? niftiImage.length : "undefined"
                        );
                        onFileUpload({
                          header: niftiHeader,
                          image: new Uint8Array(niftiImage),
                        });
                      } else {
                        console.error("The file is not a valid NIfTI file.");
                      }
                } catch (error) {
                    console.error("An error occurred while processing the NIfTI file:", error);
                }
            };
            reader.readAsArrayBuffer(uploadedFile);
        } else {
            console.error("No file was selected.");
        }
    };


    return (
        <div>
            <input type='file' name='file' onChange={handleFile} />
            {/* {imageData && (
                <canvas id="nifti-canvas" width={imageData.width} height={imageData.height}></canvas>
            )} */}
            {/* <button>Upload File</button> */}
        </div>
    );
}

export default NiftiViewer;





