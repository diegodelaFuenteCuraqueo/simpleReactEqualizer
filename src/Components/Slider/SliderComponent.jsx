import { useRef } from "react"

function SliderComponent(props) {

  const inputEl = useRef(null)

  const onInput = () => {
    props.onGainChange(inputEl.current.value)
    props.connectedBand.setGain(parseFloat(inputEl.current.value))
  }

  const style = {
    textAlign: "center",
    fontSize: "8px",
    marginBottom: "0px !important"
  }
  const sliderStyle = {
    WebkitAppearance: "slider-vertical",
    width: "8px"
  }

  return (
      <div className="col-2" 
        style={{paddingLeft:0, paddingRight:0, maxWidth: "6%"}}>
        <label style={style} 
          className="hzLabel">{props.hz}<br/>hz</label><br/>
        <input ref={inputEl} 
          onInput={onInput} 
          type={"range"} 
          min={-60} 
          max={24} 
          step={0.01} 
          className="input verticalRange" 
          value={props.gain} 
          style={sliderStyle}></input><br></br>
        <label style={{textAlign: "left", fontWeight: "bold"}}>{ Math.round(props.gain * 10) / 10 }<br/>dB</label>
      </div>
  )
}

export default SliderComponent
