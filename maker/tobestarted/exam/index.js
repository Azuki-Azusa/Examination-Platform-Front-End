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
var editExam = "/maker/editexam"
var id = getQueryVariable("id");
console.log(id);var
var getExamUrl = host + getExam + "/" + id;
var editExamUrl = host + editExam + "/" + id;

var exam = {};

var vm = new Vue({
    el: '#examInfo',
    data: {
        name: "",
        description: "",
        rule: "",
        state: "",
        startTime: "2000-01-01 00:00",
        endTime: "2000-01-01 00:00",
        group: "",
        paper: "",
        groups: Array(),
        papers: Array(),
    },
    methods: {
        back: function() {
            history.back(-1);
        },
        save: function() {
            $.post(editExamUrl,
                {
                    "email" : this.makerEmail,
                    "password": this.makerPW
                },
                function(data,status){
                    console.log(status);
                    if (data["errcode"] == 200) {
                        data = data["data"];
                        // 注册成功
                        if (data["errcode"] == 0) {
                            console.log(data["session"]);
                            // cookie保存到浏览器关闭
                            $.cookie('sessionMaker', data["session"]);
                            makerLogin();
                        }

                        // 注册失败
                        else {
                            _this.errmsg = data["errmsg"];
                            _this.seen = true;
                        }
                    }
                    // 路由失败
                    else {
                        _this.errmsg = data["errmsg"];
                        _this.seen = true;
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
                vm.name = exam.name;
                vm.description = exam.description;
                vm.rule = exam.rule;
                vm.state = exam.state;
                vm.startTime = exam.startTime;
                vm.endTime = exam.endTime;
                vm.group = exam.group;
                vm.paper = exam.paper;
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

