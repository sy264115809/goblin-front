import {http} from '../../main'
export default {
  create ({name, description}) {
    return http.post('airports', {name, description}).then(response => response.data.id, () => false)
  },
  list () {
    return http.get('airports').then(response => response.data.items, () => false)
  },
  remove (id) {
    return http.delete(`airports/${id}`).then(() => true, () => false)
  },
  restore (id) {
    return http.post(`airports/${id}/restore`).then(() => true, () => false)
  },
  update (id, name, description) {
    return http.put(`airports/${id}`, {name, description}).then(() => true, () => false)
  }
}
