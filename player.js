jQuery(function () {
    var myPlayer = jQuery("#bgndVideo").YTPlayer({
        videoURL: '5wHJ9T8YW2c', // short version
        ratio: 'auto',
        containment: 'body',
        showControls: true,
        autoPlay: true,
        loop: false,
        vol: 0,
        mute: true,
        opacity: 1,
        addRaster: true,
        quality: 'hd720',
        optimizeDisplay: true,
        addFilters: {
            opacity: 0,
            saturate: 0,
            contrast: 0
        },
        remember_last_time: false,
        useOnMobile: true,
        showControls: false,
        realfullscreen: true,
        abundance: 0.01
    });

    myPlayer.on("YTPEnd", function (e) {
        var currentVideoID = myPlayer.YTPGetVideoID();
        // short version
        if (currentVideoID === '5wHJ9T8YW2c') {
            // play scren saver version
            myPlayer.YTPChangeVideo({ videoURL: 'QzJICdaiF2k', loop: true });
        }

        // full version
        if (currentVideoID === 'vONtGL6LzxY') {
            // play short version
            myPlayer.YTPFullscreen();
            myPlayer.YTPChangeVideo({ videoURL: '5wHJ9T8YW2c', optimizeDisplay: true, loop: false, mute: true, addRaster: true });
        }
    });

    myPlayer.on("YTPReady", function (e) {
        var currentVideoID = myPlayer.YTPGetVideoID();
        // full version
        if (currentVideoID === 'vONtGL6LzxY') {
            myPlayer.YTPSetVolume(100);
        }
    });

    // myPlayer.on("YTPFullScreenStart", function (e) {
    //     // play full version
    //     myPlayer.YTPChangeVideo({ videoURL: 'vONtGL6LzxY', optimizeDisplay: false, loop: false, mute: false, addRaster: false });
    // });

    myPlayer.on("YTPFullScreenEnd", function (e) {
        var currentVideoID = myPlayer.YTPGetVideoID();
        // full version
        if (currentVideoID === 'vONtGL6LzxY') {
            // play full version
            myPlayer.YTPChangeVideo({ videoURL: '5wHJ9T8YW2c', optimizeDisplay: true, loop: false, mute: true, addRaster: true });
        }
    });
});

function togglePlay(state) {
    $("#togglePlay > i").removeClass(state == 1 ? "icon-play" : "icon-pause");
    $("#togglePlay > i").addClass(state == 1 ? "icon-pause" : "icon-play");
}