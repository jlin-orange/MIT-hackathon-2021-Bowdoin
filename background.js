chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
      url: chrome.extension.getURL('window.html'),
      selected: true,
    })
    
    // make chrome full screen along with the new tab
    chrome.windows.getCurrent(function (win) {
        chrome.windows.update(win.id, { state: "fullscreen" })
    });
    
    
})

/**
 * Takes chrome out of full screen along & close the current tab
 */
function closeTab() {
    chrome.windows.getCurrent(function (win) {
        chrome.windows.update(win.id, { state: "normal" })
    });
    
    chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id, function() { });
    });
}

// 5 minute countdown
var timeLeft = 300; 
var downloadTimer = setInterval(function(){
    if (timeLeft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown-timer").innerHTML = "Break over!";
      closeTab();
    } else {
        if (timeLeft < 60){
            if (timeLeft < 10){
                document.getElementById("countdown-timer").innerHTML = "0:0" + timeLeft;
            } else {
                document.getElementById("countdown-timer").innerHTML = "0:" + timeLeft;
            }
        } else {
            currentMinutes = Math.floor(timeLeft / 60);
            currentSeconds = timeLeft % 60;
            if (currentSeconds < 10){
                document.getElementById("countdown-timer").innerHTML = currentMinutes + ":0" + currentSeconds;
            } else {
                document.getElementById("countdown-timer").innerHTML = currentMinutes + ":" + currentSeconds;
            }
        }
    }
    timeLeft -= 1;
  }, 1000);