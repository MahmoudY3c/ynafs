class Archieve {
  constructor() {
    this._cache = {}
    this.errs = {
      NaN: "index parameter should to be a number",
      all:  "one of this parameeters {key, index, data} is missing please check your inputs",
      missingData:  "one of this parameeters {key, index} is missing please check your inputs"
    }
  }
  getAll() {
    return this._cache
  }
  getOne(key, index) {
    if (typeof index !== "number")return this.errs.NaN
    if (!key || !index) return this.errs.missingData
    this._cache[key] = [];
    return this._cache[key][index]
  }
  get() {
    return this._cache
  }
  set(value) {
    this._cache = value
  }
  save(key, index, data) {
    if (typeof index !== "number")return this.errs.NaN
    if (key == undefined || index == undefined || data == undefined) return this.errs.all
    //console.log(index)
    if(this._cache[key] == undefined) {
      this._cache[key] = [];
    }
    this._cache[key][index] = data
    return this._cache
  }
  UseDefaultKey(key) {
    const self = this
    return function(index, data) {
      //optional to save or get
      if(data) self.save(key, index, data);
      return self._cache[key]?.[index]
    }
  }
}
export default Archieve