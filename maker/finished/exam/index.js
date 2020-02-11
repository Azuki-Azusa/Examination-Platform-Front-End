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
var correct = "/maker/correct";
var correctAll = "/maker/correctall"
var finish = "/maker/finish"
var id = getQueryVariable("id");
console.log(id);
var getExamUrl = host + getExam + "/" + id;



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
            var correctAllUrl = host + correctAll;
            var _this = this;
            $.post(correctAllUrl,
                {
                    exam_id: _this.exam.id
                },
                function(data,status){
                    console.log(status);
                    if (data["errcode"] == 200) {
                        data = data["data"];
                        if (data["errcode"] == 0) {
                            alert(data["errmsg"]);
                            location.reload();
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
            var finishUrl = host + finish;
            var _this = this;
            $.post(finishUrl,
                {
                    exam_id: _this.exam.id
                },
                function(data,status){
                    console.log(status);
                    if (data["errcode"] == 200) {
                        data = data["data"];
                        if (data["errcode"] == 0) {
                            alert(data["errmsg"]);
                            history.back(-1);
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
            answer_id: "",
            question: "",
            points: 0,
            _points: 0
        },

    },
    methods: {
        correct: function(e) {
            question_id = e.currentTarget.getAttribute("id");
            question = e.currentTarget.getAttribute("question");
            points = e.currentTarget.getAttribute("points");
            var getrandomanswerUrl = host + getrandomanswer + "/" + question_id;
            var _this = this;
            $.get(getrandomanswerUrl, function(data,status){
                console.log(status);
                if (data["errcode"] == 200) {
                    data = data["data"];
                        // 获取成功
                        if (data["errcode"] == 0) {
                            console.log(data);
                            _this.answer = data["answer"];
                            _this.answer.question = question;
                            _this.answer.points = points;
                            _this.answer._points = 0;
                            console.log(_this.answer);
                        }
            
                        // 获取失败
                        else {
                            alert(data["errmsg"]);
                            $('#myModal').modal("hide");
                        }
                }
                // 路由失败
                else {
                    console.log(data["errmsg"]);
                }
            });
        },
        up: function() {
            if (confirm("确定给分：" + this.answer._points)) {
                var correctUrl = host + correct;
                var _this = this;
                $.post(correctUrl,
                    {
                        answer_id: _this.answer.answer_id,
                        points: _this.answer._points
                    },
                    function(data,status){
                        console.log(status);
                        if (data["errcode"] == 200) {
                            data = data["data"];
                            if (data["errcode"] == 0) {
                                alert(data["errmsg"]);
                                $('#myModal').modal("hide");
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
            }
            else {

            }
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

                
                var getPaperUrl = host + getPaper + "/" + vm.exam.paper;
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

