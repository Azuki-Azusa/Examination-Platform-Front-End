var getExams = "/maker/candidatesgroup";

var vm = new Vue({
    el: '#groupTable',
    data: {
        groups: Array()
    },
    methods: {
        skip: function(e) {
            id = e.currentTarget.getAttribute("id");
            console.log(id);
            window.location.href = "./group?id=" + id;
        }
    }
})

var url = host + getExams;
$.get(url, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                groups = data["groups"];
                groups.sort(function(val1, val2) {
                    return val2.id - val1.id;
                });
                vm.groups = groups;

            }

            // 获取失败
            else {
                console.log(data["errmsg"]);
            }
    }
    // 路由失败
    else {
        console.log(data["errmsg"]);
    }
});

function create() {
    window.location.href = "./creategroup";
}