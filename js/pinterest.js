/**
 * pinterest.js 1rd release
 * www.yedincikat.net
 *
 * Copyright (C) 2013, Barış Ateş.
 * All rights reserved.
 *
 * Bu plug-in pinterest bilgilerini getirir. 
 * 
 * Bu satırlar kaldırılmadan kullanım hakları için bir kısıtlama yoktur.
 * 
 **/
(function ($) {

    $.fn.pinterest = function (options, callback) {

        var $this = $(this)

        var settings = $.extend({
            'pinterestID': 'yedincikatajans',
            'pinterestImg': 'http://media-cache-ec1.pinimg.com/avatars/yedincikatajans-1368109475_600.jpg',
            'twitterID': 'yedincikatajans',
            'pintColor': '#1a1a1a',
            'pintWidth': 190,
            'line': 0,
            callback: function () { }
        }, options);

        var html = ""

        html = '<ul id="mainPinterest">'
        html += '<li class="pHeader">'
        html += '<table border="0" width="100%" cellspacing="0" cellpadding="0">'
        html += '<tr>'
        html += '<td width="138" align="left">'
        html += '<a href="http://pinterest.com/' + settings.pinterestID + '/" target="_blank"><img id="pinterestImg" src="' + settings.pinterestImg + '" alt="Yedinci Kat" width="128" height="128"></a>'
        html += '</td>'
        html += '<td valign="top">'
        html += '<p id="pinterestName">Yedinci Kat</p>'
        html += '<p id="pinterestDesc">Result of the first 6 floor, Cause of the first 6 floor..</p>'
        html += '</td>'
        html += '<td width="80" align="right">'
        html += '<p><a href="http://pinterest.com/' + settings.pinterestID + '/" target="_blank"><img src="http://s-passets-ec.pinimg.com/images/about/buttons/pinterest-button.png" width="80" height="28" alt="Takip Et"></a></p>'
        html += '<p class="pinterestStats" style="padding-top:15px;"><a target="_blank" href="http://pinterest.com/' + settings.pinterestID + '/pins/?filter=likes">Likes</a></p>'
        html += '<p class="pinterestStats"><a target="_blank" href="http://pinterest.com/' + settings.pinterestID + '/following/">Following</a></p>'
        html += '<p class="pinterestStats"><a target="_blank" href="http://pinterest.com/' + settings.pinterestID + '/followers/">Followers</a></p>'
        html += '</td>'
        html += '</tr>'
        html += '</table>'
        html += '</li>'
        html += '<li class="space"></li>'
        html += '<li class="pContent">'
        html += '<table border="0" width="100%" cellspacing="0" cellpadding="0" id="pintAble">'
        html += '<tr id="pintContent">'
        html += '</tr>'
        html += '</table>'
        html += '</li>'
        html += '</ul>'

        $this.append(html);

        for (var i = 1; i < (settings.line + 1); i++) {
            //alert(i);
            if (i == 1) {
                var myFloat = "left"
            } else if (i == settings.line) {
                var myFloat = "right"
            } else {
                var myFloat = "center"
            }

            var html = '<td align="' + myFloat + '" valign="top"><div style="position: relative; width: ' + settings.pintWidth + 'px; height: 100%; z-index: ' + i + ';" id="pint' + i + '"></div></td>'
            $this.find("#pintContent").append(html);
        }



        var locPro = "http:"
        if (document.location.protocol == "http:" || document.location.protocol == "https:") {
            locPro = document.location.protocol
        }
        $.ajax({
            url: locPro + '//ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=10&callback=?&q=' + encodeURIComponent("https://pinterest.com/" + settings.pinterestID + "/feed.rss"),
            dataType: 'json',
            success: function (data) {
                var maxi = 0

                //console.log("",data.responseData.feed.description);

                $this.find("#pinterestName").text(data.responseData.feed.title);
                $this.find("pinterestImg").attr("alt", data.responseData.feed.title);
                $this.find("#pinterestDesc").text(data.responseData.feed.description);


                jQuery.each(data.responseData.feed.entries, function (i, item) {

                    maxi++
                    //console.log(i, );
                    var d = item.publishedDate,
								img = '<a href="' + item.link + '" target="_blank"><img class="pint" src="' + $('img', item.content).attr('src') + '" alt="" /></a>',
								floatU = ""
                    if (maxi !== 4) { floatU = "left" } else { floatU = "right" }
                    html = '<div style="padding-bottom:10px; width:' + (settings.pintWidth - 10) + 'px;"><table border="0" width="100%" cellspacing="0" cellpadding="0" style="background-color:' + settings.pintColor + ';padding-bottom:10px;"><tr><td colspan="2" align="center">' + img + '</td></tr><tr><td class="fullPinText" style="padding:10px;">' + item.contentSnippet + '<br /> <span class="pinDate">' + nicetime(new Date(d).getTime()) + '</span>';

                    html += '</td><td align="right" width="26" valign="bottom"><span class="section-share">' + shareLink(item.contentSnippet, item.link, settings.twitterID) + '</span></td></tr></table></div>';

                    $this.find('#pint' + maxi).append(html);
                    if (maxi == settings.line) { maxi = 0; }

                });


            }, complete: function () {

                $('.sharer').click(function (e) {
                    if ($(this).parent().hasClass('section-share')) {
                        var u = $(this).attr('href');
                        window.open(u, 'sharer', 'toolbar=0,status=0,width=626,height=436');
                        return false;
                    } else {
                        if (external) { this.target = '_blank'; }
                    }
                });
                if (callback !== undefined) { callback(); }

            }
        });

        function nicetime(a) {
            var d = Math.round((+new Date - a) / 1000), fuzzy;
            var chunks = new Array();
            chunks[0] = [60 * 60 * 24 * 365, 'yýl'];
            chunks[1] = [60 * 60 * 24 * 30, 'ay'];
            chunks[2] = [60 * 60 * 24 * 7, 'hafta'];
            chunks[3] = [60 * 60 * 24, 'gün'];
            chunks[4] = [60 * 60, 'saat'];
            chunks[5] = [60, 'dakika'];
            var i = 0, j = chunks.length;
            for (i = 0; i < j; i++) {
                s = chunks[i][0];
                n = chunks[i][1];
                if ((xj = Math.floor(d / s)) != 0)
                    break;
            }
            fuzzy = xj == 1 ? '1 ' + n : xj + ' ' + n;
            if (i + 1 < j) {
                s2 = chunks[i + 1][0];
                n2 = chunks[i + 1][1];
                if (((xj2 = Math.floor((d - (s * xj)) / s2)) != 0))
                    fuzzy += (xj2 == 1) ? ' + 1 ' + n2 : ' + ' + xj2 + ' ' + n2;
            }
            fuzzy += ' önce';
            return fuzzy;
        }

        function shareLink(st, sq, tweetId) {
            var sq = encodeURIComponent(sq), st = encodeURIComponent(st);
            var s = '<a href="http://www.facebook.com/sharer.php?u=' + sq + '&t=' + st + '" class="sharer share-facebook"></a>';
            s += '<a href="https://twitter.com/share?url=' + sq + '&text=' + st + '&via=' + tweetId + '" onClick="return false;" class="sharer share-twitter"></a>';
            return s;
        }




    }
})(jQuery);