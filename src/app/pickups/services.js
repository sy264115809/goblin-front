import {http} from '../../main'
export default {
  create ({name, description}) {
    return http.post('pickups', {name, description}).then(response => response.data.id, () => false)
  },
  list () {
    return http.get('pickups').then(response => response.data.items, () => false)
  },
  remove (id) {
    return http.delete(`pickups/${id}`).then(() => true, () => false)
  },
  restore (id) {
    return http.post(`pickups/${id}/restore`).then(() => true, () => false)
  },
  update (id, name, description) {
    return http.put(`pickups/${id}`, {name, description}).then(() => true, () => false)
  }
}
