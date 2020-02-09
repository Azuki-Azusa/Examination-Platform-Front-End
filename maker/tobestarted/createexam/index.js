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


var createExam = "/maker/createexam";
var groupPaper = "/maker/grouppaper";
var createExamUrl = host + createExam;
var groupPaperUrl = host + groupPaper;

var vm = new Vue({
    el: '#examInfo',
    data: {
        exam : {
            name: "",
            description: "",
            rule: "",
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
        create: function() {
            console.log(this.exam);
            var _this = this;
            $.post(createExamUrl,
                {
                    "exam": _this.exam
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