var createGroup = "/maker/creategroup";
var createGroupUrl = host + createGroup;



var vm = new Vue({
    el: '#groupInfo',
    data: {
        group : {
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
            $.post(createGroupUrl,
                {
                    group: _this.group
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
