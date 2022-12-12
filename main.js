// ==UserScript==
// @name VareseNews Disable AutoRefresh
// @namespace VareseNews Disable AutoRefresh
// @description [FORK] Disable AutoRefresh is a user script to override and disable meta refresh html tag on all websites to prevent the automatic refresh or redirection.
// @author SMed79, alexrah
// @version 0.1.0
// @license https://creativecommons.org/licenses/by-nc-sa/4.0/
// @icon http://i.imgur.com/ZJ9mHLO.png
// @supportURL https://github.com/alexrah/userscript_varesenews_disable_autorefresh/issues
// @match   https://*.varesenews.it/
// @match   https://*.v2media.it/
// @match   https://*.malpensanews.it/
// @match   https://*.saronnonews.it/
// @match   https://*.verbanonews.it/
// @match   https://*.malpensanews.com/
// @run-at document-start
// @grant none
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

        rules = [{
            host : 'varesenews.it',
            timeout : .5
        }
        ];

        allMetas = document.getElementsByTagName('meta');
        for (var i = 0; i < allMetas.length; i++) {
            thisMeta = allMetas[i];

            if (thisMeta.httpEquiv.match(/refresh/i)) {
                if (thisMeta.content.match(/[\D]/)) {
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
                        console.log('Redirection stopped after ' + timeout_ms + ' ms');
                        window.stop();
                    }, timeout_ms);
                }
            }
        }

    });

})();
