const api = 'http://ynafs.com:5000/api';
// const api = 'http://192.168.1.3:5000/api';
const token = ''
const request = (path, options) =>
fetch(`${api}${path}`, options ? options : {})
.then(res => res.json())
.catch(err => alert("حدث خطأ برجاء المحاولة مره اخرى"))

export default request