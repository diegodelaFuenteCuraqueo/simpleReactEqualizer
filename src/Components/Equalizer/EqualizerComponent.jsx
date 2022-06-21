import Equalizer from "./lib/Equalizer.js"
import Slider from "../Slider/SliderComponent.jsx"
import { useEffect, useState } from "react"

const DEFAULT_GAINS = Array(12).fill(0)

function EqualizerComponent() {
  const [gains, setGains] = useState(Array(12).fill(0))
  const [equalizer, setEqualizer] = useState(null)

  const handleGainChange = index => gain => {
    setGains(gains.map((g, i) => (i === index) ? gain : g))
  } 
  
  useEffect( () => {
    const AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
    const eq = new Equalizer(AUDIO_CONTEXT)
    const audioElement = document.querySelector('audio');
    const sourceNode = AUDIO_CONTEXT.createMediaElementSource(audioElement)
    eq.connectSource(sourceNode)
    eq.connectOutput(AUDIO_CONTEXT.destination)
    setEqualizer(eq)
  }, []) 

  const bands = equalizer?.bands.map( (band, index) => ( 
    {key:index, hz:band.biquad.frequency.value, connectedBand:band, gain:0} 
  ))

  const resetEq = () => {
    setGains( DEFAULT_GAINS )
    equalizer?.resetGains()
  }

  return (
    <div className="container">
      <div className="row">
        <button onClick={resetEq}>Reset Gains</button>
      </div>
      <div className="row" >
        {bands?.map( (slider) => 
          <Slider 
            key={slider.key} 
            hz={slider.hz} 
            connectedBand={slider.connectedBand} 
            gain={gains[slider.key]}
            onGainChange={handleGainChange(slider.key)}
          />
         )}
      </div>
    </div>
  )
}

export default EqualizerComponent
