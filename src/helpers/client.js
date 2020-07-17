export const getPlatformName = () => {
  return navigator.platform;
};

export const getBrowserName = () => {
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  if (isChrome) return 'Chrome';

  const isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox) return 'Firefox';

  /* global safari */
  var isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function(p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(
      !window['safari'] ||
        (typeof safari !== 'undefined' && safari.pushNotification),
    );
  if (isSafari) return 'Safari';

  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia;
  if (isEdge) return 'Edge';

  const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') != -1;
  if (isEdgeChromium) return 'Edge Chromium';

  /* global opr */
  const isOpera =
    (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(' OPR/') >= 0;
  if (isOpera) return 'Opera';

  const isBlink = (isChrome || isOpera) && !!window.CSS;
  if (isBlink) return 'Blink';

  const isIE = /*@cc_on!@*/ false || !!document.documentMode;
  if (isIE) return 'Internet Explorer';

  return 'Unkown client'
};
