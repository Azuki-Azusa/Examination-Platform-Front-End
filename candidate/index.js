var getExams = "/candidate/getexam";
var getInfo = "/candidate/getinfo";

var vmCandidate = new Vue({
    el: '#candidateInfo',
    data: {
        candidate: "",
        group: ""
    },
    created: function() {
        var url = host + getInfo;
        var _this = this;
        $.get(url, function(data,status){
            console.log(status);
            if (data["errcode"] == 200) {
                data = data["data"];
                    // 获取成功
                    if (data["errcode"] == 0) {
                        console.log(data);
                        _this.candidate = data["candidate"];
                        _this.group = data["group"];
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
    },
    methods: {
        
    }
})

var vmTable = new Vue({
    el: '#examTable',
    data: {
        exams: Array()
    },
    created: function() {
        var url = host + getExams;
        var _this = this;
        $.get(url, function(data,status){
            console.log(status);
            if (data["errcode"] == 200) {
                data = data["data"];
                    // 获取成功
                    if (data["errcode"] == 0) {
                        console.log(data);
                        _this.exams = data["exams"];
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
    },
    methods: {
        participate: function(e) {
            id = e.currentTarget.getAttribute("id");
            console.log(id);
            window.location.href = "./exam?id=" + id;
        }
    }
})