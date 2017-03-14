import Vue from 'vue'

Vue.prototype.ajax = function (option) {
  let request = new XMLHttpRequest(),
    type = option.type || 'GET',
    url = option.url || '';
  request.open(type, url);
  request.send(option.data);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        let data = JSON.parse(request.responseText);
        option.cbfn(data);
      } else {
        console.log("发生错误：" + request.status);
      }
    }
  }
};

/*
*  对象数组删除其中某个元素
*  [{a:1},{b:2},{c:3}].remove({b:2})
*  => [{a:1},{c:3}]
* */
Array.prototype.remove = function (obj) {
  let key = Object.keys(obj)[0],
    val = Object.values(obj)[0],
    index = this.findIndex((v) => {
      return (v[key] && v[key] == val);
    });
  if (index != -1) {
    let right = this.slice(0, index),
      left = this.slice(index + 1);
    return right.concat(left);
  }
};
