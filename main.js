// ==UserScript==
// @name VareseNews Disable AutoRefresh
// @namespace VareseNews Disable AutoRefresh
// @description [FORK] Disable AutoRefresh is a user script to override and disable meta refresh html tag on all websites to prevent the automatic refresh or redirection.
// @author SMed79, alexrah
// @version 1.1.1
// @license https://creativecommons.org/licenses/by-nc-sa/4.0/
// @icon http://i.imgur.com/ZJ9mHLO.png
// @supportURL https://github.com/alexrah/userscript_varesenews_disable_autorefresh/issues
// @match   https://*.varesenews.it/*
// @match   https://*.v2media.it/*
// @match   https://*.malpensanews.it/*
// @match   https://*.saronnonews.it/*
// @match   https://*.verbanonews.it/*
// @match   https://*.legnanonews.com/*
// @run-at document-start
// @grant none
// @downloadURL https://raw.githubusercontent.com/alexrah/userscript_varesenews_disable_autorefresh/master/main.js
// @updateURL   https://raw.githubusercontent.com/alexrah/userscript_varesenews_disable_autorefresh/master/main.js
// ==/UserScript==

/*
Example of a immediate redirection.
http://www.isthe.com/chongo/tech/comp/cgi/zeroredirect.html
<META HTTP-EQUIV="Refresh" content="0; url=cgidemo.html">

Example of a 5 second redirection.
http://www.isthe.com/chongo/tech/comp/cgi/index.html
<META HTTP-EQUIV="Refresh" content="5; url=cgidemo.html">
*/

(function () {

    window.addEventListener("DOMContentLoaded", function (event) {

        var allMetas,
            thisMeta,
            content,
            timeout,
            timeout_ms,
            rules;

        // rules = [{
        //     host : 'varesenews.it',
        //     timeout : .5
        // }
        // ];
        rules = [];

        allMetas = document.getElementsByTagName('meta');
        for (var i = 0; i < allMetas.length; i++) {
            thisMeta = allMetas[i];

            if (thisMeta.httpEquiv.match(/refresh/i)) {
                if (thisMeta.content.match(/[0-9]+/)) {

                    content = thisMeta.content.split(';');
                    timeout = content[0] - 1;

                    rules.forEach(function (rule) {
                        if (location.host.indexOf(rule.host) > -1) {
                            timeout = rule.timeout;
                            return false;
                        }
                    })

                    timeout_ms = (timeout > 0) ? (timeout * 1e3) : 0;
                    setTimeout(function () {
                        console.log('%cRedirection stopped after ' + timeout_ms + ' ms','color: orange');
                        window.stop();
                    }, timeout_ms);
                }
            }
        }

    });

})();
