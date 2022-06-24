import Equalizer from "./Components/Equalizer/EqualizerComponent.jsx"
import { useState, useEffect } from "react"
import './App.css'

function App() {
  const [canPlay, setCanPlay] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [selectedFile, setSelectedFile] = useState("https://upload.wikimedia.org/wikipedia/commons/1/17/Ruido_blanco.ogg");
  const [srcFile, setSrcFile] = useState(null)
  
  const handleSubmit = (e) => setSelectedFile(e.target.files[0])
  const addFile      = () => setSrcFile(URL.createObjectURL(selectedFile))

  useEffect(() => { setSrcFile(selectedFile) }, [])
  
  return (
    <div className="App">
      <div className="container">
        <div className="row"> 
          <audio onPlay={() => setInteracted(true)} onCanPlayThrough={() => setCanPlay(true)} crossOrigin="anonymous" controls src={srcFile} loop style={{width:"50%"}}></audio><br/>
        </div>
        <div className="row">
          <input type="file" onChange={ handleSubmit } />
          <button onClick={addFile}>Load file</button>
        </div>
      </div>

      { (canPlay && interacted) 
        ? <Equalizer audioElement={document.querySelector('audio')} /> 
        : <div><br/><strong>watinig for interaction...</strong></div> }
    </div>
  )
}

export default App;
