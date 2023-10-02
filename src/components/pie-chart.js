import Highcharts from 'highcharts'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import HighchartsAccessibility from 'highcharts/modules/accessibility'

import { getTransformedData } from '../data/get-transformed-data'

export function initPieChart (element) {
  HighchartsDrilldown(Highcharts)
  HighchartsAccessibility(Highcharts)

  const data = getTransformedData()

  Highcharts.chart(element, {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Emissions by Scope and Category'
    },
    subtitle: {
      text: 'Click on scope and category to drill down to activities.'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      },
      point: {
        valueSuffix: ' tonnes CO2e'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <strong>{point.y:.2f} tonnes CO2e</strong> of total<br/>'
    },

    series: [
      {
        name: 'Scopes',
        colorByPoint: true,
        data: getScopeSeries(data)
      }
    ],

    drilldown: {
      series: [
        ...getCategorySeries(data),
        ...getActivitySeries(data)
      ]
    }
  })
}

function getScopeSeries (data) {
  return data.map(scope => ({
    name: scope.name,
    drilldown: scope.name,
    y: scope.sum
  }))
}

function getCategorySeries (data) {
  return data.map(scope => ({
    id: scope.name,
    data: scope.activitiesByCategory.map(category => ({
      name: category.name,
      drilldown: category.name,
      y: category.sum
    }))
  }))
}

function getActivitySeries (data) {
  return data.map(scope => {
    return scope.activitiesByCategory.map(category => {
      return {
        id: category.name,
        data: category.activities.map(activity => ([
          activity.name,
          activity.amount
        ]))
      }
    })
  }).flat()
}
