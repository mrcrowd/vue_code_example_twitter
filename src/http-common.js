import axios from 'axios'

export default axios.create({
  baseURL:
    'https://vtwitter-e6505-default-rtdb.europe-west1.firebasedatabase.app',
  header: {
    'Content-type': 'application/json'
  }
})
