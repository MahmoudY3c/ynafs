const api = 'https://ynafs.com:3000/api';
// const api = '/api';
// const token = ''
const request = (path, options) =>
fetch(`${api}${path}`, options ? options : {})
.then(res => res.json())
.catch(err => alert("حدث خطأ برجاء المحاولة مره اخرى"))

export default request