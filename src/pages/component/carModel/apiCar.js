import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

const token = localStorage.getItem('access')

class apiMaker {
  async getDepartment() {
    return await axios.get(`${API_URL}/cars`, { headers: {  Authorization : `Bearer ${token}` }})
  }
 async createDepartment(department) {
    return await axios.post(`${API_URL}/cars/`, department, { headers: {  Authorization : `Bearer ${token}` }},)

  }
  async DeleteDepartment(id) {
    return await axios.delete(`${API_URL}/cars/` + id,  { headers: {  Authorization : `Bearer ${token}` }})

  }
  async MultipleDelete(Ids) {
    return await axios.delete(`${API_URL}/cars/${Ids}`,  { headers: {  Authorization : `Bearer ${token}` }})

  }
  async UpdateDepartment(id,department) {
    return await axios.put(`${API_URL}/cars/${id}` + department,  { headers: {  Authorization : `Bearer ${token}` }})

  }
}


export default new apiMaker()
