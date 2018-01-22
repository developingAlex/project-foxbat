import api from './init'

export function loadPanels() {
  return api.get('/panels')
  .then((res) => res.data)
}

export function createPanel(data) {
  return api.post('/panels', data)
  .then((res) => res.data)
}

export function updatePanel(id, data) {
  return api.put(`/panels/${id}`, data)
  .then((res) => res.data)
}
