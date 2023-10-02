import './style.css'

import { initPieChart } from './src/components/pie-chart.js'

init()

function init () {
  const pieChartElement = document.getElementById('pie-chart')
  initPieChart(pieChartElement)
}
