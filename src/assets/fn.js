import Vue from 'vue'
import Mock from 'mockjs'

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

/*
 * mock模拟后台数据
 * */

Mock.setup({
    timeout: '200-600'
});

//登录
let login = {
    // 'result|1': ['SUCCESS', 'FAILED', 'CHANGE_PASSWORD'],
    'result|1': ['SUCCESS'],
    'message': 'login success'
};

//节点
let nodes = {
    //用户权限，初级用户，中级用户，高级用户
    'userType|1': [0],
    'list': [
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '中国',
            'province': '江苏',
            'city': '南京',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 2,
            'country': '中国',
            'province': '江苏',
            'city': '南京',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 3,
            'country': '中国',
            'province': '江苏',
            'city': '南京',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 4,
            'country': '中国',
            'province': '江苏',
            'city': '南京',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '中国',
            'province': '江苏',
            'city': '苏州',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '中国',
            'province': '上海',
            'city': '上海',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '美国',
            'province': 'xx州',
            'city': '纽约',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '韩国',
            'province': '韩xx市',
            'city': '首尔',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '日本',
            'province': '日本xx市',
            'city': '东京',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 2,
            'country': '日本',
            'province': '日本xx市',
            'city': '东京',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 0,
            'delay|1-1200': 1000,
            'line_index': 3,
            'country': '日本',
            'province': '日本xx市',
            'city': '东京',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 1,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '香港',
            'province': '香港',
            'city': '香港',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 1,
            'delay|1-1200': 1000,
            'line_index': 2,
            'country': '香港',
            'province': '香港',
            'city': '香港',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 2,
            'delay|1-1200': 1000,
            'line_index': 1,
            'country': '澳门',
            'province': '澳门',
            'city': '澳门',
            'ip': Mock.Random.ip()
        },
        {
            'limit': 2,
            'delay|1-1200': 1000,
            'line_index': 2,
            'country': '澳门',
            'province': '澳门',
            'city': '澳门',
            'ip': Mock.Random.ip()
        }
    ]
};

//建链
let linkRes = {
    'result|1': ['SUCCESS', 'FAILED'],
    'message': 'creat link success'
};

//退出
let logout = {
    'result|1': ['SUCCESS', 'FAILED'],
    'message': 'logout success'
};

Mock.mock('/login', login);
Mock.mock('/getServers', nodes);
Mock.mock('/createLink', linkRes);
Mock.mock('/logout', logout);
