import axios from "axios";

const entries = axios.create({
  baseURL: '/api'
})

export default entries
