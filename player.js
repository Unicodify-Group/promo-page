jQuery(function () {
    var myPlayer = jQuery("#bgndVideo").YTPlayer({
        videoURL: '5wHJ9T8YW2c',
        ratio: '4/3',
        containment: 'body',
        showControls: true,
        autoPlay: true,
        loop: false,
        vol: 0,
        mute: true,
        opacity: 1,
        addRaster: true,
        quality: 'hd1080',
        optimizeDisplay: true,
        addFilters: {
            opacity: 0,
            saturate: 0,
            contrast: 0
        },
        remember_last_time: false,
        useOnMobile: true,
        showControls: false
    });

    myPlayer.on("YTPEnd", function (e) {
        myPlayer.YTPChangeVideo({ videoURL: 'QzJICdaiF2k', loop: true });
    });

    // myPlayer.on("YTPFullScreenStart", function (e) {
    //     myPlayer.YTPChangeVideo({ videoURL: 'vONtGL6LzxY', optimizeDisplay: false, loop: false, mute: false, addRaster: false });
    // });

    myPlayer.on("YTPFullScreenEnd", function (e) {
        myPlayer.YTPChangeVideo({ videoURL: '5wHJ9T8YW2c', optimizeDisplay: true, loop: false, mute: true, addRaster: true });
    });
});

function togglePlay(state) {
    $("#togglePlay > i").removeClass(state == 1 ? "icon-play" : "icon-pause");
    $("#togglePlay > i").addClass(state == 1 ? "icon-pause" : "icon-play");
}