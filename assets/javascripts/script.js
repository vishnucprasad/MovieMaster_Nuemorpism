$(window).on("scroll", function () {
    const scroll = $(window).scrollTop();

    if (scroll >= 80) {
        $("#navbar-main").addClass("shadow-soft");
    } else {
        $("#navbar-main").removeClass("shadow-soft");
    }
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("movetop").style.display = "block";
    } else {
        document.getElementById("movetop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$('#signupForm').submit((e) => {
    e.preventDefault();
    $('#submitBtn').attr('hidden', true);
    $('#loadingBtn').removeAttr('hidden');

    setTimeout(() => {
        $("#signupSubmit").hide();
        $("#verificationForm").slideDown(500);
    }, 2000);
});

$('#loginForm').submit((e) => {
    e.preventDefault();
    $('#submitBtn').attr('hidden', true);
    $('#loadingBtn').removeAttr('hidden');

    setTimeout(() => {
        $("#loginSubmit").hide();
        $("#verificationForm").slideDown(500);
    }, 2000);
});

$('#verificationForm').submit((e) => {
    e.preventDefault();
    $('#verificationSubmitBtn').attr('hidden', true);
    $('#verificationLoadingBtn').removeAttr('hidden');

    setTimeout(() => {
        $('#verificationLoadingBtn').html('<span class="fa fa-check text-success"></span> Approved');
    }, 2000);
});