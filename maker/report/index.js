var getExams = "/maker/report/exams";

var vm = new Vue({
    el: '#examTable',
    data: {
    exams: Array()
    },
    methods: {
        skip: function(e) {
            id = e.currentTarget.getAttribute("id");
            console.log(id);
            window.location.href = "./exam?id=" + id;
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
                exams = data["exams"];
                exams.sort(function(val1, val2) {
                    return val2.id - val1.id;
                });
                console.log(exams);
                vm.exams = exams;

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