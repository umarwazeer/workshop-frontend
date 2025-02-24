import axios from 'axios'

const API_URL = 'http://localhost:2024'

const token = localStorage.getItem('access_token')

class employeeAPI {
  async getEmployee() {
    return await axios.get(`${API_URL}/employees`,{ headers: {  Authorization : `Bearer ${token}`}})
  }
 async createEmployee(department) {
    return await axios.post(`${API_URL}/employees`, department, { headers: {  Authorization : `Bearer ${token}` }},)

  }
  async deleteEmployee(id) {
    return await axios.delete(`${API_URL}/employees/` + id,  { headers: {  Authorization : `Bearer ${token}` }})

  }
  async MultipleDelete(Ids) {employees
    return await axios.delete(`${API_URL}/employees/${Ids}`,  { headers: {  Authorization : `Bearer ${token}` }})

  }
  async updateEmployee(id,department) {
    return await axios.put(`${API_URL}/employees/${id}` + department,  { headers: {  Authorization : `Bearer ${token}` }})

  }
}


export default new employeeAPI()
