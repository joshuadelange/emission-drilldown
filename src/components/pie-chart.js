import Highcharts from 'highcharts'
import HighchartsDrilldown from 'highcharts/modules/drilldown'

import { getTransformedData } from '../data/get-transformed-data'
import { clearFilters, setFilters } from '../filters'

export function initPieChart (element) {
  HighchartsDrilldown(Highcharts)

  const data = getTransformedData()

  Highcharts.chart(element, {
    chart: {
      type: 'pie',

      events: {
        drilldown: (event) => {
          setFilters({ scope: event.seriesOptions.name })
        },
        drillup: () => {
          clearFilters()
        }
      }
    },
    title: {
      text: 'Emissions by Scope',
      align: 'left'
    },
    subtitle: {
      text: 'Click on a scope and categories to filter the emission activities',
      align: 'left'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      },
      point: {
        valueSuffix: 'tonnes CO2e'
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
        data: data.map(scope => ({
          name: scope.name,
          y: scope.sum,
          drilldown: scope.name
        }))
      }
    ],

    drilldown: {
      series: data.map(scope => ({
        name: scope.name,
        id: scope.name,
        data: scope.activitiesByCategory.map(category => ([
          category.name,
          category.sum
        ])),
        events: {
          click: (event) => {
            setFilters({ category: event.point.name })
          }
        }
      }))
    }
  })
}
