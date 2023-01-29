var introTimer = countdown(
    function(ts) {
        document.getElementById("d-left").innerHTML = ts.days;
        document.getElementById("m-left").innerHTML = ("0" + ts.hours).slice(-2);
        document.getElementById("h-left").innerHTML = ("0" + ts.minutes).slice(-2);
        document.getElementById("s-left").innerHTML = ("0" + ts.seconds).slice(-2);
    },
    new Date("2023-10-26T00:00:00"),
    countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
