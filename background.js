chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({'url':"chrome://newtab"})
    
})
function openInNewTab(url) {
    window.open(url, '_blank').focus();

    // make chrome full screen along with the new tab
    chrome.windows.update(windowId, { state: "fullscreen" })
}

// TODO: add function to close tab at the end of timer
function closeTab() {
    chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id, function() { });
    });
    // take out of front screen end
}

var timeLeft = 300; //5 min break

var downloadTimer = setInterval(function(){
    if(timeLeft <= 0){
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Break over!";
      closeTab();
    } else {
        if (timeLeft < 60){
            document.getElementById("countdown").innerHTML = "0:" + timeLeft;
        } else {
            currentMinutes = Math.floor(timeLeft / 60);
            currentSeconds = timeLeft % 60;
            document.getElementById("countdown").innerHTML = currentMinutes + ":" + currentcurrentSeconds + timeLeft;
        }
    }
    timeLeft -= 1;
  }, 1000);