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
var editExam = "/maker/editexam";
var candidateTable = "/maker/inprogress/candidates";
var prohibit = "/maker/inprogress/prohibit";
var id = getQueryVariable("id");
console.log(id);
var getExamUrl = host + getExam + "/" + id;
var editExamUrl = host + editExam + "/" + id;
var candidateTableUrl = host + candidateTable + "/" + id;
var prohibitUrl = host + prohibit;

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
        }
    }
})

var vm2 = new Vue({
    el: "#candidateTable",
    data: {
        candidates: []
    },
    methods: {
        correct: function(e) {
            candidateid = e.currentTarget.getAttribute("id");
            candidatename = e.currentTarget.getAttribute("name");
            examid = id;
            console.log(examid, candidateid);
            var _this = this;
            if (confirm("Confirm to prohibit " + candidatename)) {
                $.post(prohibitUrl,
                    {
                        "examid": examid,
                        "candidateid": candidateid
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
                $(function () {
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

$.get(candidateTableUrl, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                console.log(data);
                vm2.candidates = data["candidates"];
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