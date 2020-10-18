$(function () {
    getuserInfo()
    //点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出此页面?', { icon: 3, title: '提示' }, function (index) {
            //清除本地存储内的token
            localStorage.removeItem('token')
            //跳转回到login页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

//获取用户基本信息
function getuserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用渲染用户头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的用户名
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('text-avatar').hide()
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide()
        // 获取name里的第一个字符并设置为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}