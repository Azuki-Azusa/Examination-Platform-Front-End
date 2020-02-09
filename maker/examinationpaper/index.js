var getExams = "/maker/papers";

var vm = new Vue({
    el: '#examTable',
    data: {
    exams: Array()
    },
    methods: {
        skip: function(e) {
            id = e.currentTarget.getAttribute("id");
            console.log(id);
            window.location.href = "./paper?id=" + id;
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
                papers = data["papers"];
                papers.sort(function(val1, val2) {
                    return val2.id - val1.id;
                });
                vm.exams = papers;

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
    window.location.href = "./createpaper";
}