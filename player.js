var isIframe = function () {
    var a = !1;
    try {
        self.location.href != top.location.href && (a = !0)
    } catch (b) {
        a = !0
    }
    return a
};

jQuery(function () {

    if (!isIframe()) {
        var logo = $("<a href='http://pupunzi.com/#mb.components/components.html' style='position:absolute;top:0;z-index:1000'><img id='logo' border='0' src='http://pupunzi.com/images/logo.png' alt='mb.ideas.repository'></a>");
        $("#wrapper").prepend(logo), $("#logo").fadeIn()
    }

    var myPlayer = jQuery("#bgndVideo").YTPlayer({
        videoURL: 'vONtGL6LzxY',
        ratio: '4/3',
        containment: 'body',
        showControls: true,
        autoPlay: true,
        loop: true,
        vol: 50,
        mute: true,
        startAt: 0,
        stopAt: 0,
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
        onReady: function (player) {
            YTPConsole.append(player.id + " player is ready");
            YTPConsole.append("<br>");
        }
    });

    myPlayer.on("YTPData", function (e) {
        $(".dida").html(e.prop.title + "<br>@" + e.prop.channelTitle);
        $("#videoData").show();
    });

    /* DEBUG ******************************************************************************************/
    var YTPConsole = jQuery("#eventListener");
    // EVENT: YTPStart YTPEnd YTPLoop YTPPause YTPBuffering
    myPlayer.on("YTPStart YTPEnd YTPLoop YTPPause YTPBuffering YTPMuted YTPUnmuted", function (e) {
        YTPConsole.append("event: " + e.type + " (" + jQuery("#bgndVideo").YTPGetPlayer().getPlayerState() + ") > time: " + e.time);
        YTPConsole.append("<br>");
    });
    // EVENT: YTPChanged
    myPlayer.on("YTPChanged", function (e) {
        YTPConsole.html("");
    });
    // EVENT: YTPData
    myPlayer.on("YTPData", function (e) {
        YTPConsole.append("******************************");
        YTPConsole.append("<br>");
        YTPConsole.append(e.type);
        YTPConsole.append("<br>");
        YTPConsole.append(e.prop.title);
        YTPConsole.append("<br>");
        YTPConsole.append(e.prop.description.replace(/\n/g, "<br/>"));
        YTPConsole.append("<br>");
        YTPConsole.append("******************************");
        YTPConsole.append("<br>");
    });
    // EVENT: YTPTime
    myPlayer.on("YTPTime", function (e) {
        var currentTime = e.time;
        var traceLog = currentTime / 5 == Math.floor(currentTime / 5);
        if (traceLog && YTPConsole.is(":visible")) {
            YTPConsole.append(myPlayer.attr("id") + " > " + e.type + " > actual time is: " + currentTime);
            YTPConsole.append("<br>");
        }
    });
    /* END DEBUG ******************************************************************************************/

    /* FILTER SLIDERS ******************************************************************************************/
    // create sliders for filters adjustment
    var $slider = $(".slider").simpleSlider({
        initialval: 0, //function (el) {return Math.random() * el.opt.scale},
        scale: 100
        , callback: function (el) {
            var filter = $(el).data("filter");

            var filterVal = +(el.value).toFixed(0);
            myPlayer.YTPApplyFilter(filter, filterVal);

            $("span", el).html(filter + "       (" + filterVal + ")");
            var applFilters = [];
            var desc = "$(selector).YTPApplyFilters({";
            for (var x = 0; x < $(".slider").length; x++) {
                var slider = $(".slider").eq(x).get(0);
                var $slaider = $(slider);
                if (slider.value) applFilters.push($slaider.data("filter") + ": " + (+(slider.value).toFixed(0)));
            }
            for (var y in applFilters) {
                var comma = y < applFilters.length - 1 ? "," : "<br>";
                desc += "<br> &nbsp;&nbsp;&nbsp;" + applFilters[y] + comma;
            }
            desc += "})";
            $("#filterScript").html(desc);
        }
    });

    //update applied filters
    myPlayer.on("YTPFiltersApplied", function () {
        var filters = myPlayer.get(0).filters;
        for (var key in filters) {
            $(".slider[data-filter=" + key + "]").updateSliderVal(filters[key].value);
        }
    });
});
/* END FILTER SLIDERS ******************************************************************************************/

function changeLabel(state) {
    $("#togglePlay").html(state == 1 ? "pause" : "play");
    $("#togglePlay").removeClass(state == 1 ? "play" : "pause");
    $("#togglePlay").addClass(state == 1 ? "pause" : "play");
}

function checkForVal(val) {
    return val || 0;
}