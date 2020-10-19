$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })


    initUser()
    // 初始化用户的信息
    function initUser() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                // 调用form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }


    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUser()
    })


    // 更新用户的信息
    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 更新头像和用户名显示 调用fm父页面中的getUser
                window.parent.getuserInfo()
            }
        })
    })
})
