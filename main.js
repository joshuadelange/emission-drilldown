import './style.css'

import { initPieChart } from './src/components/pie-chart.js'
import { initDataGrid, updateDataGridWithFilters } from './src/components/data-grid'
import { getFilters } from './src/filters'

init()

function init () {
  const dataGridElement = document.getElementById('data-grid')
  const pieChartElement = document.getElementById('pie-chart')

  initPieChart(pieChartElement)
  initDataGrid(dataGridElement)

  window.addEventListener('hashchange', () => {
    updateDataGridWithFilters(dataGridElement, getFilters())
  })
}
