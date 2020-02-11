$(function () {
    var picker1 = $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: moment.locale('zh-cn'),
    });
    var picker2 = $('#datetimepicker2').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        locale: moment.locale('zh-cn')
    });
    //动态设置最小值
    picker1.on('dp.change', function (e) {
        picker2.data('DateTimePicker').minDate(e.date);
    });
    //动态设置最大值
    picker2.on('dp.change', function (e) {
        picker1.data('DateTimePicker').maxDate(e.date);
    });
});


var getExam = "/maker/getexam";
var editExam = "/maker/editexam";
var removeExam = "/maker/remove";
var groupPaper = "/maker/grouppaper";
var id = getQueryVariable("id");
console.log(id);
var getExamUrl = host + getExam + "/" + id;
var editExamUrl = host + editExam;
var removeExamUrl = host + removeExam;
var groupPaperUrl = host + groupPaper;


var vm = new Vue({
    el: '#examInfo',
    data: {
        exam : {
            id: "",
            name: "",
            description: "",
            rule: "",
            state: "",
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
        save: function() {
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
        remove: function() {
            var _this = this;
            $.post(removeExamUrl,
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

$(function () {
    $('#datetimepicker1').on('dp.change', function (e) {
        vm.exam.startTime = e.date._d.toJSON().substring(0, 10) + " " + e.date._d.toJSON().substring(11, 16);
    });
    $('#datetimepicker2').on('dp.change', function (e) {
        vm.exam.endTime = e.date._d.toJSON().substring(0, 10) + " " + e.date._d.toJSON().substring(11, 16);
    });
});

$.get(getExamUrl, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                console.log(data);
                exam = data["exam"];
                vm.exam = exam;
                $(function () {
                    $('#datetimepicker1').data("DateTimePicker").maxDate(exam.endTime);
                    $('#datetimepicker2').data("DateTimePicker").minDate(exam.startTime);
                })
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

$.get(groupPaperUrl, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                console.log(data);
                groups = data["groups"];
                papers = data["papers"];
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