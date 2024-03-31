$(function () {
    $('#send-btn').click(function () {
        var token = $('#token-input').val();
        var channelid = $('#channelid-input').val();
        var content = $('#content-input').val();
        var delay = $('#delay').val();
        if (token == null || token == "", channelid == null || channelid == "", content == null || content == "") {
            alert("Token is empty");
            return false;
        }

        let i = 0;
        let inteval = setInterval(function () {
            $.post(token, { "delay": delay, "content": content, "channelid": channelid, });
            time.sleep(delay)

    
      
        }, 50)



    });
});
