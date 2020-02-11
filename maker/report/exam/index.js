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
var candidateTable = "/maker/inprogress/candidates";
var id = getQueryVariable("id");
console.log(id);
var getExamUrl = host + getExam + "/" + id;
var getPaperUrl = host + getPaper;
var candidateTableUrl = host + candidateTable + "/" + id;

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
            points: 0
        },
        groups: Array(),
        papers: Array(),
    },
    methods: {
        back: function() {
            history.back(-1);
        }
    }
})

var vm2 = new Vue({
    el: "#candidateTable",
    data: {
        candidates: []
    },
    methods: {
        
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
                vm.groups = groups;
                vm.papers = papers;

                getPaperUrl = getPaperUrl + "/" + vm.exam.paper;
                $.get(getPaperUrl, function(data,status){
                    console.log(status);
                    if (data["errcode"] == 200) {
                        data = data["data"];
                            // 获取成功
                            if (data["errcode"] == 0) {
                                console.log(data);
                                exam.points = data["paper"].total_points;
                                vm.exam = exam;
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