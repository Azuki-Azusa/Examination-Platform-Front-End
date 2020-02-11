var id = getQueryVariable("id");
var getQuestions = "/candidate/getquestions";
var commit = "/candidate/commit";
var getQuestionsUrl = host + getQuestions + "/" + id;
var commitUrl = host + commit;

var vmCandidate = new Vue({
    el: '#questions',
    data: {
        questions: Array(),
        answers: Array(),
        nowTime: "",
        endTime: "",
        name: "",
        show: {
            question: "",
            answers: Array(),
            type: 0,
            typet: "",
            id: 0,
            index: 0,
            answer: Array()
        }
    },
    created: function() {
        var _this = this;
        $.get(getQuestionsUrl, function(data,status){
            console.log(status);
            if (data["errcode"] == 200) {
                data = data["data"];
                    // 获取成功
                    if (data["errcode"] == 0) {
                        console.log(data);
                        _this.questions = data["questions"];
                        _this.endTime = data["endTime"];
                        _this.name = data["name"];
                        if ($.cookie('' + id)) {
                            _this.answers = JSON.parse($.cookie('' + id));
                        }
                        else {
                            _this.answers = Array(_this.questions.length);
                            var end = new Date(_this.endTime);
                            $.cookie('' + id, JSON.stringify(_this.answers), { expires: end, path: '/' });
                        }
                        getDate();
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
        save: function() {
            this.answers[this.show.index] = {
                answer: this.show.answer,
                question_id: this.show.id
            };
            if (this.show.type == 1) {
                this.answers[this.show.index].answer.sort();
            }
            var end = new Date(this.endTime);
            $.cookie('' + id, JSON.stringify(this.answers), { expires: end, path: '/' });
        },
        tran: function(index) {
            this.show.question = this.questions[index].question.question.question;
            this.show.answers = this.questions[index].question.question.answers;
            this.show.id = this.questions[index].question.id;
            this.show.type = this.questions[index].question.type;
            switch(this.show.type) {
                case 0: this.show.typet = "单选题"; this.show.answer = ""; break;
                case 1: this.show.typet = "多选题"; this.show.answer = Array(); break;
                case 2: this.show.typet = "填空题"; this.show.answer = ""; break;
                case 3: this.show.typet = "主观题"; this.show.answer = ""; break;
            }
            if (this.answers[this.show.index]) {
                this.show.answer = this.answers[this.show.index].answer;
            }
        },
        commit: function() {
            console.log(this.answers);
            this.save();
            var _this = this
            $.post(commitUrl,
                {
                    exam_id: id,
                    answers: _this.answers
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
        end: function() {
            alert("已结束");
            this.question = undefined;
            this.answers = undefined;
            this.show = undefined;
        }
    }
})

function getDate() {
    $.ajax({
        url: "http://quan.suning.com/getSysTime.do",
        dataType:'jsonp',
        processData: false,
        type:'get',
        success:function(data){
            vmCandidate.nowTime = data.sysTime2.substring(0,16);
            var now = new Date(vmCandidate.nowTime).getTime();
            var end = new Date(vmCandidate.endTime).getTime();
            var min = (end - now) / 60000;
            if (min == 1) {
                vmCandidate.commit();
            }
            else if (min < 1) {
                vmCandidate.end();
            }

        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}
setInterval("getDate()",60000);      


$(function(){
    $('.list-group').on('click','.list-group-item',function(e){
        vmCandidate.save();
        $("#" + vmCandidate.show.index).attr("class", "list-group-item");
        vmCandidate.show.index = e.currentTarget.getAttribute("id");
        $("#" + vmCandidate.show.index).attr("class", "list-group-item active");
        vmCandidate.tran(vmCandidate.show.index);
    });
})