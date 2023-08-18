import config from "../config/appConfig"

const request = (path, options) =>
  fetch(`${config.BaseURL}${path}`, options
    ? {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: config.KEY
      }
    } : {
      headers: {
        Authorization: config.KEY
      }
    })
    .then(res => res.json())
    .catch(err => alert("حدث خطأ برجاء المحاولة مره اخرى"))

export default request