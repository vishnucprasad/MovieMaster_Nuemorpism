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
        iziToast.show({
            title: 'Approved',
            titleColor: '#03c895',
            icon: 'fa fa-check',
            iconColor: '#03c895',
            class: 'shadow-soft border-light',
        });
    }, 2000);
});

const loadImage = (e) => {
    document.getElementById('profilePic').src = URL.createObjectURL(e.target.files[0]);

    $('#profilePicUploadBtn').attr('hidden', true);
    $('#profilePicConfirmBtn').removeAttr('hidden');
}

$('#updateProfilePicForm').submit((e) => {
    e.preventDefault();
    $('#profilePicSubmitBtn').attr('hidden', true);
    $('#profilePicLoadingBtn').removeAttr('hidden');

    setTimeout(() => {
        $('#profilePicSubmitBtn').removeAttr('hidden');
        $('#profilePicLoadingBtn').attr('hidden', true);
        $('#profilePicConfirmBtn').attr('hidden', true);
        $('#profilePicUploadBtn').removeAttr('hidden');
        iziToast.show({
            title: 'Successfully changed profile picture',
            titleColor: '#03c895',
            icon: 'fa fa-check',
            iconColor: '#03c895',
            class: 'shadow-soft border-light',
        });
    }, 2000);
});

$('#editProfileForm').submit((e) => {
    e.preventDefault();
    $('#editProfileSubmitBtn').attr('hidden', true);
    $('#editProfileLoadingBtn').removeAttr('hidden');

    setTimeout(() => {
        $('#editProfileSubmitBtn').removeAttr('hidden');
        $('#editProfileLoadingBtn').attr('hidden', true);
        iziToast.show({
            title: 'Successfully saved',
            titleColor: '#03c895',
            icon: 'fa fa-check',
            iconColor: '#03c895',
            class: 'shadow-soft border-light',
        });
    }, 2000);
});

const copyRefferalLink = (e) => {
    e.preventDefault();

    const copyText = document.getElementById('refferalLink');

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");

    iziToast.show({
        title: 'Successfully copied to the clipboard',
        titleColor: '#03c895',
        icon: 'fa fa-check',
        iconColor: '#03c895',
        class: 'shadow-soft border-light',
    });
}