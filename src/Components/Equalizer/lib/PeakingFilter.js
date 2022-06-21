
class PeakingFilter{

  constructor(audioContext, { gain=0, freq=1000, q=10 } = {}){
    this.biquad = audioContext.createBiquadFilter()
    this.biquad.type = "peaking"
    this.gain = gain
    this.freq = freq
    this.q = q
  }

  connectSource(mediaElementSource){
    if (mediaElementSource.constructor.name === "MediaElementAudioSourceNode"){
      mediaElementSource.connect(this.biquad) 
    } else {
      console.error("Cannot connect source: is not a MediaElementAudioSourceNode")
    }
  }

  connectInput(source){
    if (source.constructor.name === "PeakingFilter" || source.constructor.name === "BiquadFilterNode"){
      source.biquad.connect(this.biquad)
    } else {
      console.error("Cannot connect input: is not a PeakingFilter or BiquadFilterNode")
    }
  }

  connectOutput(destination){
      this.biquad.connect(destination)
  }

  set gain(gain){
    this.biquad.gain.value = gain
  }

  set freq(freq){
    this.biquad.frequency.value = freq
  }

  setGain(gain){
    this.biquad.gain.value = gain
  } 

  resetGain(){
    this.setGain(0)
  }

  set q(q){
    this.biquad.Q.value = q
  }
}

export default PeakingFilter
