var getGroup = "/maker/getgroup";
var editGroup = "/maker/editgroup";
var addCandidate = "/maker/addcandidate";
var removeCandidate = "/maker/removecandidate";
var id = getQueryVariable("id");
console.log(id);
var getGroupUrl = host + getGroup + "/" + id;
var editGroupUrl = host + editGroup;
var addCandidateUrl = host + addCandidate;
var removeCandidateUrl = host +removeCandidate;



var vm = new Vue({
    el: '#groupInfo',
    data: {
        group : {
            id: 0,
            name: "",
            description: "",
            number: 0,
            candidates: []
        },
        newCandidate: {
            login_id: "",
            name: "",
            password: ""
        }
    },
    methods: {
        back: function() {
            history.back(-1);
        },
        save: function() {
            var _this = this;
            $.post(editGroupUrl,
                {
                    group: _this.group
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
            $.post(addCandidateUrl,
                {
                    group_id: _this.group.id,
                    candidate: _this.newCandidate
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
        randomPW: function() {
            var len = 16;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            this.newCandidate.password = pwd;
        },
        remove: function(e) {
            id = e.currentTarget.getAttribute("id");
            name = e.currentTarget.getAttribute("name");
            if (confirm("Confirm to remove " + name)) {
                var _this = this;
                $.post(removeCandidateUrl,
                    {
                        candidate_id: id
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


$.get(getGroupUrl, function(data,status){
    console.log(status);
    if (data["errcode"] == 200) {
        data = data["data"];
            // 获取成功
            if (data["errcode"] == 0) {
                console.log(data);
                group = data["group"];
                group.candidates.sort(function(val1, val2) {
                    return val1.id - val2.id;
                });
                vm.group = group;
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

