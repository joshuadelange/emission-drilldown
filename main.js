import './style.css'

import { initPieChart } from './src/components/pie-chart.js'

init()

function init(){
  initPieChart(document.getElementById('pie-chart'))
}