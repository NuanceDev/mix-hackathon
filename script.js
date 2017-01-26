var config = {
    slackUrl : '',
    slackToken: '',
    community: ''
};

$(document).ready(function() {
    $('.submit').click(function() {
        var email = $('.field').val();
        $('.submit').prop('disabled', true);
        $.ajax({
            type: 'POST',
            url: 'https://'+ config.slackUrl + '/api/users.admin.invite',
            data: {
                email: email,
                token: config.slackToken,
                set_active: true
            },
            complete(result, status) {
                var body = result.responseJSON;
                if (body.ok) {
                    $('.result').html(
                        'Success! Check &ldquo;'+ email +'&rdquo; for an invite from Slack.'
                    )
                } else {
                    var error = body.error
                    if (error === 'already_invited' || error === 'already_in_team') {
                        $('.result').html(
                            'Success! You were already invited.<br>' +
                            'Visit <a target="_blank" href="https://'+ config.slackUrl +'">'+ config.community +'</a>'
                        )
                        $('.submit').prop('disabled', false);
                        $('.field').val('');
                        return;
                    } else if (error === 'invalid_email') {
                        error = 'The email you entered is an invalid email.';
                    } else if (error === 'invalid_auth') {
                        error = 'Something has gone wrong. Please contact a system administrator.';
                    }
                    $('.result').text('Failed! ' + error);
                }

                // Reset field
                $('.submit').prop('disabled', false);
                $('.field').val('');
            }
        });

    });

    var send = send;




});
