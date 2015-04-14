$(function () {

  var check_seed_user_form = function (title, address, name, phone) {
    console.log(title);
    if (title==="" || address==="" || name==="" || phone==="") {
      return "请填写完整的申请信息";
    }
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
      return "请填写有效的手机号码";
    }
    return true;
  }

  $("#seed_user_form").submit(function(event) {
   
    // Stop form from submitting normally
    event.preventDefault();
   
    // Get some values from elements on the page:
    var $form = $(this);
    var title = $form.find( "input[name='title']" ).val();
    var address = $form.find( "input[name='address']" ).val();
    var name = $form.find( "input[name='name']" ).val();
    var phone = $form.find( "input[name='phone']" ).val();
   
    var form_valid = check_seed_user_form(title, address, name, phone);

    if (form_valid === true) {
      var url = "http://api.diankuai.cn/account/create-seed-user/";
      var posting = $.post(
        url,
        {
          title: title,
          address: address,
          name: name,
          phone: phone
        }
      );
      posting.done(function (data) {
        alert("提交成功！我们会在24小时内进行信息核实，并为您开通账号");
      })
      .fail(function (data) {
        alert("非常抱歉，提交失败，请重试。如还有问题，请联系我们，QQ：3035731421，电话：13021045329");
      });
    }else {
      alert(form_valid);
    }
  });

});

