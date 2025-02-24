import axios from 'axios'

const API_URL = 'http://localhost:2024'

const token = localStorage.getItem('access_token')

class attendanceAPI {
  async getAttandence() {
    return await axios.get(`${API_URL}/attendance`,
      //  { headers: {  Authorization : `Bearer ${token}`}}
    )
  }
 async createAttandence(department) {
    return await axios.post(`${API_URL}/attendance`, department, { headers: {  Authorization : `Bearer ${token}` }},)

  }
  async DeleteDepartment(id) {
    return await axios.delete(`${API_URL}/attendance/` + id,  { headers: {  Authorization : `Bearer ${token}` }})

  }
  async MultipleDelete(Ids) {
    return await axios.delete(`${API_URL}/attendance/${Ids}`,  { headers: {  Authorization : `Bearer ${token}` }})

  }
  async UpdateDepartment(id,department) {
    return await axios.put(`${API_URL}/department/${id}` + department,  { headers: {  Authorization : `Bearer ${token}` }})

  }
}


export default new attendanceAPI()
