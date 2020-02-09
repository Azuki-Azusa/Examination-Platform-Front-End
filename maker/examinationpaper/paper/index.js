var getPaper = "/maker/getpaper";
var editPaper = "/maker/editpaper";
var addQuestion = "/maker/addquestion";
var removeQuestion = "/maker/removequestion";
var id = getQueryVariable("id");
console.log(id);
var getPaperUrl = host + getPaper + "/" + id;
var editPaperUrl = host + editPaper;
var addQuestionUrl = host + addQuestion;
var removeQuestionUrl = host +removeQuestion;



var vm = new Vue({
    el: '#paperInfo',
    data: {
        paper : {
            id: 0,
            name: "",
            description: "",
            total_points: 0,
            questions: []
        },
        newQuestion: {
            num: "",
            question: {
                question: "",
                answers: [
                    {
                        id: 0,
                        text: ""
                    },
                    {
                        id: 1,
                        text: ""
                    }
                ]
            },
            answer: 0,
            points: "0",
            type: 0,
        }
    },
    methods: {
        back: function() {
            history.back(-1);
        },
        save: function() {
            var _this = this;
            $.post(editPaperUrl,
                {
                    paper: _this.paper
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
        add: function() {
            var _this = this;
            if (_this.newQuestion.type == 1) {
                _this.newQuestion.answer.sort();
            }
            console.log(_this.newQuestion);
            $.post(addQuestionUrl,
                {
                    paper_id: _this.paper.id,
                    question: _this.newQuestion
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
        addChoice: function() {
            answers = this.newQuestion.question.answers
            len = answers.length;
            answers.push({
                id: len,
                text: ""
            });
        },
        remove: function(e) {
            id = e.currentTarget.getAttribute("id");
            num = e.currentTarget.getAttribute("num");
            if (confirm("Confirm to remove question" + num)) {
                var _this = this;
                $.post(removeQuestionUrl,
                    {
                        question_id: id
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
        },
        show: function(e) {
            id = e.currentTarget.getAttribute("id");
            for (var i = 0; i < this.paper.questions.length; i ++) {
                if (this.paper.questions[i].id == id) {
                    console.log(this.paper.questions[i]);
                    alert("Shown in console(F12)");
                    break;
                }
            }
        },
        getTypeSelected() {
            console.log(this.newQuestion.type)
            if (this.newQuestion.type == 0) {
                this.newQuestion.question.answers = [
                    {
                        id: 0,
                        text: ""
                    },
                    {
                        id: 1,
                        text: ""
                    }
                ];
                this.newQuestion.answer = 0;
            }
            else if (this.newQuestion.type == 1) {
                this.newQuestion.question.answers = [
                    {
                        id: 0,
                        text: ""
                    },
                    {
                        id: 1,
                        text: ""
                    }
                ];
                this.newQuestion.answer = [];
            }
            else if (this.newQuestion.type == 2) {
                this.newQuestion.question.answers = "";
                this.newQuestion.answer = "";
            }
            else {
                this.newQuestion.question.answers = "";
                this.newQuestion.answer = "";
            }

        }
    }
})


$.get(getPaperUrl, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                console.log(data);
                paper = data["paper"];
                vm.paper = paper;
                for (var i = 0; i < vm.paper.questions.length; i ++) {
                    switch(vm.paper.questions[i].type) {
                        case 0:
                            vm.paper.questions[i].type = "单选题";
                            break;

                        case 1:
                            vm.paper.questions[i].type = "多选题";
                            break;

                        case 2:
                            vm.paper.questions[i].type = "填空题";
                            break;
                        
                        case 3:
                            vm.paper.questions[i].type = "主观题";
                            break;
                        
                    }
                }
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

