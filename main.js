
$(function () {
    $('#send-btn').click(function () {
        var token = $('#token-input').val();
        var channelid = $('#channelid-input').val();
        var content = $('#content-input').val();
        var delay = $('#delay-input').val();
        if (token == null || token == "", channelid == null || channelid == "", content == null || content == "") {
            alert("Token is empty");
            return false;
        }

        let i = 0;
        let inteval = setInterval(function () {
            $.post(token, { "delay-input": delay, "content-input": content, "channelid-input": channelid, });
            time.sleep(delay)

    
      
        }, 50)



    });
});
