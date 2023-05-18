chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {text: 'check_meta'}, (response) => {
    console.log(response);
  });
});
