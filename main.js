var input_chanelID = addInput("Channel ID");
    var input_saying = addTextarea("Message");
    h.append("<br>");
    var btn_start = addBtn("Send");
    var btn_stop = addBtn("Stop").hide();
    var nowStatus = $("<div>").appendTo(h);
    h.append("<br><br><br><br>");
