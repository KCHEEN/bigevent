$(function () {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val().trim()) {
                return '新密码不可与旧密码相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val().trim()) {
                return '两次输入密码不一致！'
            }
        }
    })


    // 为密码表单添加重置提交事件 
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})