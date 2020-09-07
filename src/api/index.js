import axios from "axios";
import storage from "good-storage";
import "vant/lib/index.css";
import "vant/lib/vant.js";
import Vue from "vue";
import {
  Dialog
} from "vant";
import {
  Toast
} from "vant";
Vue.use(Dialog);
Vue.use(Toast);
var root = "http://www.lixiangkeji.net/api";
// var root = "http://bgl.whatsfav.com/api/";
// axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8'

// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
/** 参数过滤函数 */
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
// eslint-disable-next-line spaced-comment
/**添加headers,可以动态添加header参数 */
// eslint-disable-next-line space-before-blocks
function setHeaders(headers) {
  axios.defaults.headers.token = headers.token;
  axios.defaults.headers.uid = headers.uid;
}
// 其实success与failure这两个参数，传过来的是两个放方法
function apiAxios(method, url, headers, params, success) {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0
  });
  if (headers) {
    headers = filterNull(headers);
    setHeaders(headers);
  }

  if (params) {
    params = filterNull(params);
  }
  axios({
      method: method,
      url: url,
      data: method === "POST" || method === "PUT" ? params : null,
      params: method === "GET" || method === "DELETE" ? params : null,
      baseURL: root,
      withCredentials: false
    })
    .then(function (res) {
      Toast.clear();
      // console.log(res)
      if (res.data.code == 1) {
        success(res.data);
      } else if (res.data.code == 2) {
        storage.set("token", "");
        storage.set("uid", "");
        Dialog.alert({
          title: "提示",
          message: res.data.msg
        }).then(() => {
          // on close
          window.location.href = "http://www.lixiangkeji.net/api/login/index";
        });
      } else if (res.data.code == 0) {
        success(res.data);
      }
    })
    .catch(function () {
      // console.log(JSON.stringify(response))
    });
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, headers, params, success) {
    return apiAxios("GET", url, headers, params, success);
  },
  post: function (url, headers, params, success) {
    return apiAxios("POST", url, headers, params, success);
  },
  put: function (url, headers, params, success) {
    return apiAxios("PUT", url, headers, params, success);
  },
  delete: function (url, headers, params, success) {
    return apiAxios("DELETE", url, headers, params, success);
  }
};

// 页面调用

// this.$api.get(
//     '/devices',                           //url
//     {"school_id":schoolId,"token":null},  //headers
//     null,                                 //params
//    successRes => {                        //success(data)方法
//     console.log(successRes)
//    },
//    failureRes =>{                        //failure(data)方法
//       console.log(failureRes)
//    }
//  )
//  //post请求
//  this.$api.post(
//     '/device',
//     {"school_id":schoolId,"token":null},
//     {"name": "test","operator_name": "xichuan"},
//     successRes =>{
//     console.log(successRes)
//    },
//    failureRes =>{
//       console.log(failureRes)
//    }
//  })
