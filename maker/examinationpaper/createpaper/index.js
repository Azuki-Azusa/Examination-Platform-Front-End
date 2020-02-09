var createPaper = "/maker/createpaper";
var createPaperUrl = host + createPaper;



var vm = new Vue({
    el: '#paperInfo',
    data: {
        paper : {
            name: "",
            description: "",
        },
    },
    methods: {
        back: function() {
            history.back(-1);
        },
        create: function() {
            var _this = this;
            $.post(createPaperUrl,
                {
                    paper: _this.paper
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
