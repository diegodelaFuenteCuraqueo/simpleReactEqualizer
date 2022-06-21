import Equalizer from "./Components/Equalizer/EqualizerComponent.jsx"
import { useState, useRef } from "react"
import './App.css'

function App() {
  const [canPlay, setCanPlay] = useState(false)
  const [interacted, setInteracted] = useState(false)
  // const [selectedFile, setSelectedFile] = useState(null);
  const file = useRef(null);
  const handleSubmit = (e) => {
    console.log(file.current.files[0].name)
  }

  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit}>
        <input type="file" ref={file}> Load file...</input>
      </form> */}
      <audio onPlay={() => setInteracted(true)} onCanPlayThrough={() => setCanPlay(true)} crossOrigin="anonymous" controls src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ruido_blanco.ogg" loop></audio>
      { (canPlay && interacted) 
        ? <Equalizer audioElement={document.querySelector('audio')} /> 
        : <div><br/><strong>watinig for interaction...</strong></div> }
    </div>
  )
}

export default App;
