window.onload = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: getMetaData
        }, handleResponse);
    });
}

function getMetaData() {
    const title = document.querySelector('title')?.innerText;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    let metaData = {
      title: title,
      description: description
    };
    return metaData;
}

function handleResponse(result) {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
    }

    let response = result[0].result;
    let ul = document.getElementById('seo-data');
    Object.entries(response).forEach(([key, value]) => {
        let li = document.createElement('li');
        li.textContent = `${key.toUpperCase()}: ${value}`;
        ul.appendChild(li);
    });
}
