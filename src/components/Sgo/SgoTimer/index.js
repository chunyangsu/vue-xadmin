import sgoTimerComponent from './SgoTimer'

const SgoTimer = {
  install: function (Vue) {
    Vue.component('SgoTimer', sgoTimerComponent)
  }
}

export default SgoTimer
