vex.defaultOptions.className = 'vex-theme-os'

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

const confirmSelection = () => {
    let price = 0;

    var allSeatsVals = [];

    $('#seatsBlock :checked').each(function () {
        allSeatsVals.push($(this).val());
    });

    if (allSeatsVals.length < 1) {
        vex.dialog.open({
            input: [
                '<h3 class="text-center"><span class="fa fa-info text-twitter"></span></h3>',
                '<p class="text-center font-weight-bold">No Seat Selected. Please select atleast one seat.</p>'
            ].join(''),
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, { text: 'Ok' })
            ]
        })
    } else if (allSeatsVals.length > 10) {
        vex.dialog.open({
            input: [
                '<h3 class="text-center"><span class="fa fa-info text-twitter"></span></h3>',
                '<p class="text-center font-weight-bold">You are only able to select a maximum of 10 seats per booking.</p>'
            ].join(''),
            buttons: [
                $.extend({}, vex.dialog.buttons.YES, { text: 'Ok' })
            ]
        })
    } else {
        allSeatsVals.forEach(seat => {
            price += parseInt($(`#${seat}`).data('price'));
        });

        $('#totalSeats').html(allSeatsVals.length);
        $('#totalPrice').html(price);
        $('#payableAmount').html(price);
        $('#seatsDisplay').html(allSeatsVals.toString());

        $('#sidebarWrapper').fadeIn();
        $('#checkoutSidebar').animate({ width: "20rem" }, 'slow', 'swing', () => {
            $('#sidebarBody').fadeIn(1000);
            $('#sidebarClose').slideDown(600);
            checkoutTimeout();
        });
    }
}

const closeSidebar = () => {
    $('#sidebarBody').fadeOut(1000);
    $('#sidebarClose').slideUp(600);
    setTimeout(() => {
        $('#sidebarWrapper').fadeOut()
        $('#checkoutSidebar').animate({ width: "0" }, 'slow', 'swing', () => location.reload());
    }, 1000);
}

const checkoutTimeout = () => {
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 2.5 * 60;
    const ALERT_THRESHOLD = 60;

    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };

    const TIME_LIMIT = 5 * 60;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    document.getElementById("countDown").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
    <span id="time-left-label" class="time-left-label ${remainingPathColor}">Left</span>
    </div>
    `;

    startTimer();

    function onTimesUp() {
        clearInterval(timerInterval);
        location.reload();
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
            document
                .getElementById("time-left-label")
                .classList.remove(warning.color);
            document
                .getElementById("time-left-label")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
            document
                .getElementById("time-left-label")
                .classList.remove(info.color);
            document
                .getElementById("time-left-label")
                .classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }
}