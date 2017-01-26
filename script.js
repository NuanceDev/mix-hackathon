var iframe = document.createElement("iframe");
iframe.src = "http://199.245.57.4/embedded";

$(document).ready(function() {
    $('#slack-invitation-iframe').append(iframe);
});
