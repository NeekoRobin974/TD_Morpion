const baseURL = 'https://morpion-api.edu.netlor.fr'
const moveWsURL = 'https://morpion-api.edu.netlor.fr/websockets'

import axios from "axios";

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `key=${import.meta.env.VITE_API_KEY}`
  }
})

export { moveWsURL }
export default instance
