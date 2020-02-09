$(function () {
    var picker1 = $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: moment.locale('zh-cn'),
    });
    var picker2 = $('#datetimepicker2').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: moment.locale('zh-cn')
    });
});


var getExam = "/maker/getexam";
var getPaper = "/maker/getpaper";
var getrandomanswer = "/maker/randomanswer";
var id = getQueryVariable("id");
console.log(id);
var getExamUrl = host + getExam + "/" + id;
var getPaperUrl = host + getPaper + "/" + id;


var vm = new Vue({
    el: '#examInfo',
    data: {
        exam : {
            id: "",
            name: "",
            description: "",
            rule: "",
            state: "",
            objective_state: 0,
            startTime: "",
            endTime: "",
            group: "",
            paper: "",
        },
        groups: Array(),
        papers: Array(),
    },
    methods: {
        back: function() {
            history.back(-1);
        },
        correct: function() {
            var _this = this;
            $.post(editExamUrl,
                {
                    "exam": _this.exam
                },
                function(data,status){
                    console.log(status);
                    if (data["errcode"] == 200) {
                        data = data["data"];
                        if (data["errcode"] == 0) {
                            alert(data["errmsg"]);
                        }

                        else {
                            alert(data["errmsg"]);
                        }
                    }
                    // 路由失败
                    else {
                        alert(data["errmsg"]);
                    }
                });
        },
        finish: function() {
            
        }
    }
})

var vm2 = new Vue({
    el: "#paperInfo",
    data: {
        paper : {
            id: 0,
            name: "",
            description: "",
            total_points: 0,
            questions: []
        },
        answer: {
            answer: "",
            answer_id: ""
        }
    },
    methods: {
        correct: function(e) {
            question_id = e.currentTarget.getAttribute("id");
            var prohibitUrl = host + prohibit + "/" + question_id;
            $.get(prohibitUrl, function(data,status){
                console.log(status);
                if (data["errcode"] == 200) {
                    data = data["data"];
                        // 获取成功
                        if (data["errcode"] == 0) {
                            console.log(data);
                            answer = data["answer"];
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
        }
    }

})


$.get(getExamUrl, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                console.log(data);
                exam = data["exam"];
                groups = data["groups"];
                papers = data["papers"];
                vm.exam = exam;
                vm.groups = groups;
                vm.papers = papers;
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

$.get(getPaperUrl, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                console.log(data);
                var paper = data["paper"];
                var qs = [];
                for (var i = 0; i < paper.questions.length; i ++) {
                    if (paper.questions[i].type == 3) {
                        qs.push(paper.questions[i]);
                    }
                }
                qs.sort(function (val1, val2) {
                    return val1.num - val2.num;
                });
                vm2.paper = paper;
                vm2.paper.questions = qs;
                console.log(vm2.paper);
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