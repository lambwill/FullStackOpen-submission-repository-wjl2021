import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = removeObject => {
  const request = axios.delete(`${baseUrl}/${removeObject.id}`)
  return request
}

const update = updateObject => {
  console.log('personsService.update:',updateObject);
  const request = axios.post(baseUrl, updateObject)
  return request.then(response => {
    console.log('update POST response:',response.data); 
    return response.data
  })
}

export default { getAll, create, remove, update }