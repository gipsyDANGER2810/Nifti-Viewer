import { useState } from 'react';
import './App.css';
import NiftiViewer from './components/niftiViewer/NiftiViewer';
import ImageViewer from './components/imageViewer/ImageViewer';


function App() {

  const [niftiData, setNiftiData] = useState(null);

  const handleFileUpload = (data) => {
    setNiftiData(data);
  };
  return (
    <div className="App container">
      <h1>NIFTI Viewer</h1>
      <NiftiViewer onFileUpload={handleFileUpload} />
      {niftiData && <ImageViewer niftiData={niftiData} />}
    </div>
  );
}

export default App;
