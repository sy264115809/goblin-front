import store from 'store'
import {http} from '../main'
import {Base64} from 'js-base64'
import moment from 'moment'

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

const FORGET_PASSWORD_URL = 'password/forget'
const LOGIN_URL = 'login'
const RELOGIN_URL = 'relogin'
const LOGOUT_URL = 'logout'

const setToken = token => store.set(ACCESS_TOKEN_KEY, token)
const getToken = () => store.get(ACCESS_TOKEN_KEY)

function parseToken (token) {
  let parts = token.split('.')
  if (parts.length === 3) {
    return JSON.parse(Base64.decode(parts[1]))
  }
}

let expiredAt

export default {
  authentication () {
    let token = getToken()
    if (token && !expiredAt) {
      expiredAt = moment.unix(parseToken(token).exp)
      console.log(`token will be expired after ${expiredAt.format()}`)
    }
    return token
  },

  forgetPassword ({email}) {
    return http.post(FORGET_PASSWORD_URL, {email}).then(() => true, () => false)
  },

  login ({email, password}) {
    return http.post(LOGIN_URL, {email, password}).then(response => setToken(response.data.access_token), () => false)
  },

  relogin () {
    if (expiredAt) {
      if (moment().add(10, 'm').isAfter(expiredAt)) {
        console.log('try to relogin sincec token will be expired after 10 minutes')
        return http.post(RELOGIN_URL).then(response => setToken(response.data.access_token), () => false)
      } else {
        console.log('no need relogin')
      }
    }
  },

  logout () {
    this.expired()
    http.post(LOGOUT_URL)
  },

  expired () {
    store.remove(ACCESS_TOKEN_KEY)
    expiredAt = undefined
  },

  getAuthHeader () {
    return `Bearer ${this.authentication()}`
  }
}
