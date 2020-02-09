$(function() {
    var makerRegisterUrl = "/maker/register";
    var makerLoginUrl = "/maker/login";
    var candidateLoginUrl = "/candidate/login";

    new Vue({
        el: '#maker',
        data: {
            makerEmail: "",
            makerPW: "",
            checked: false,
            errmsg: "",
            seen: false
        },
        methods: {
            login: function() {
                var _this = this;
                var url = host + makerLoginUrl + "/" + this.makerEmail + "/" + this.makerPW
                $.get(url, function(data,status){
                    console.log(status);
                    if (data["errcode"] == 200) {
                        data = data["data"];
                            // 登录成功
                            if (data["errcode"] == 0) {
                                console.log(data["session"]);
                                /*
                                if (_this.checked) {
                                    // 点选复选框，保存7天
                                    $.cookie('session', data["session"], { expires: 7 });
                                }
                                else {
                                    // 不选复选框，保存到浏览器关闭
                                    $.cookie('session', data["session"]);
                                }
                                */
                                // cookie保存到浏览器关闭
                                $.cookie('sessionMaker', data["session"]);
                                makerLogin();
                            }

                            // 登录失败
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
            },
            register: function() {
                var _this = this;
                $.post(host + makerRegisterUrl,
                    {
                        "email" : _this.makerEmail,
                        "password": _this.makerPW
                    },
                    function(data,status){
                        console.log(status);
                        if (data["errcode"] == 200) {
                            data = data["data"];
                            // 注册成功
                            if (data["errcode"] == 0) {
                                /*
                                if (_this.checked) {
                                    // 点选复选框，保存7天
                                    $.cookie('session', data["session"], { expires: 7 });
                                }
                                else {
                                    // 不选复选框，保存到浏览器关闭
                                    $.cookie('session', data["session"]);
                                }
                                */
                                // cookie保存到浏览器关闭
                                $.cookie('sessionMaker', data["session"]);
                                console.log($.cookie('sessionMaker'));
                                // makerLogin();
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

    new Vue({
        el: '#candidate',
        data: {
            examID: "",
            candidateID: "",
            candidatePW: "",
            checked: false,
            errmsg: "",
            seen: false
        },
        methods: {
            login: function() {
                var _this = this;
                var url = host + candidateLoginUrl + "/" + this.examID + "/" + this.candidateID + "/" + this.candidatePW
                $.get(url, function(data,status){
                    console.log(status);
                    if (data["errcode"] == 200) {
                        data = data["data"];
                            // 登录成功
                            if (data["errcode"] == 0) {
                                console.log(data["session"]);
                                /*
                                if (_this.checked) {
                                    // 点选复选框，保存7天
                                    $.cookie('session', data["session"], { expires: 7 });
                                }
                                else {
                                    // 不选复选框，保存到浏览器关闭
                                    $.cookie('session', data["session"]);
                                }
                                */
                                // cookie保存到浏览器关闭
                                $.cookie('sessionCandidate', data["session"]);
                                candidateLogin();
                            }

                            // 登录失败
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



    function makerLogin() {
        window.location.href = "./maker/tobestarted";
    }

    function candidateLogin() {
        window.location.href = "./candidate";
    }
})