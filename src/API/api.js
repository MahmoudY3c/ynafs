const api = 'http://ynafs.com:5000/api';
// const api = 'http://localhost:5000/api';
const token = ''
const request = (path, options) =>
fetch(`${api}${path}`, options ? options : {})
.then(res => res.json())

export default request