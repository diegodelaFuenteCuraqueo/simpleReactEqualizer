import PeakingFilter from './PeakingFilter';

class Equalizer{
  
  static TWELVE_BANDS = [ 20, 40,  80, 160, 320, 640, 1280, 2560, 5120, 10240, 15360, 20480 ]

  constructor(audioContext){
    this.audioContext = audioContext
    this.bands = []

    Equalizer.TWELVE_BANDS.forEach( (hz, index) => {
      let filter = new PeakingFilter(this.audioContext, { freq: hz , q:2 })
      if(index > 0){
        filter.connectInput(this.bands[index-1])
      }
      this.bands.push(filter)
    })
  }

  // source se conecta al primer elmeento de la cadena de filtros
  connectSource(mediaElementSource){
    this.bands[0].connectSource(mediaElementSource)
  }

  // el ultimo filtro de la cadena se conecta al destino del context
  connectOutput(destination){
    this.bands[this.bands.length-1].connectOutput(destination)
  }

  getBand(index){
    return this.bands[index]
  }

  resetGains(){
    this.bands.forEach( (band) => {
      band.resetGain()
    })
  }
}

export default Equalizer
