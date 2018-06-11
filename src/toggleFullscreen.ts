export function toggleFullScreen(doc: any) {
    if (!doc.fullscreenElement &&    // alternative standard method
        !doc.mozFullScreenElement && !doc.webkitFullscreenElement) {  // current working methods
      if (doc.documentElement.requestFullscreen) {
        doc.documentElement.requestFullscreen();
      } else if (doc.documentElement.mozRequestFullScreen) {
        doc.documentElement.mozRequestFullScreen();
      } else if (doc.documentElement.webkitRequestFullscreen) {
        doc.documentElement.webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (doc.cancelFullScreen) {
        doc.cancelFullScreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen();
      }
    }
  }
