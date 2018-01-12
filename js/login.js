/**
 * Created by wwwya on 2018/1/12.
 */

$(function () {


 var $form = $("form");
//初始化表单校验插件
 $form.bootstrapValidator({

  //配置校验时显示的图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  fields:{

    username:{

      validators:{

        notEmpty:{
          message:"用户名不能为空哦！"
        },
        callback:{
          message:"用户名不存在"
        }

      }

    },
    password:{
      validators:{
        notEmpty:{
          message:"用户密码不能为空哦！"
        },
        stringLength:{
          min:6,
          max:12,
          message:"密码必须是6-12位"
        },
        callback:{
          message:"密码错误"
        }
      }
    }
  }

});


  $form.on("success.form.bv" ,function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function (info) {

          if(info.success) {
            location.href= "index.html";
          }

        if(info.error==1000) {
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error==1001) {
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })

  });

  $("[type='reset']").on("click", function () {
    //重置校验的样式
    $form.data("bootstrapValidator").resetForm();
  });
});