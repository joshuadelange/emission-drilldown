import { getFlatTransformedData } from '../data/get-transformed-data'

export function initDataGrid (element) {
  updateDataGridWithFilters(element, {})
}

export function updateDataGridWithFilters (element, filters) {
  const data = getFlatTransformedData()

  const filteredData = data.filter(activity => {
    return Object.keys(filters).every(key => {
      return activity[key] === filters[key]
    })
  })

  renderWithData(element, filteredData)
}

function renderWithData (element, data) {
  element.innerHTML = `
    <thead>
      <tr>
        <th>Scope</th>
        <th>Category</th>
        <th>Activity</th>
        <th>Emissions</th>
      </tr>
    </thead>
    <tbody>
    ${data.map(activity => (
      `<tr>
        <td>${activity.scope}</td>
        <td>${activity.category}</td>
        <td>${activity.activity}</td>
        <td>${activity.amount}</td>
      </tr>`
    )).join('')}
    </tbody>
  `
}
