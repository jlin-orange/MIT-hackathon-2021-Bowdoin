chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
      url: chrome.extension.getURL('window.html'),
      selected: true,
    })
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
      document.getElementById("countdown-timer").innerHTML = "Break over!";
      closeTab();
    } else {
        currentMinutes = Math.floor(timeLeft / 60);
        currentSeconds = timeLeft % 60;
        if (currentSeconds < 10){
            document.getElementById("countdown-timer").innerHTML = currentMinutes + ":0" + currentSeconds;
        } else {
            document.getElementById("countdown-timer").innerHTML = currentMinutes + ":" + currentSeconds;
        }
    }
    timeLeft -= 1;
  }, 1000);