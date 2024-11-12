const UBI = document.querySelector("#UBI");
const UBIB = document.querySelector(".unblock-Btn");

let win; // Variable to keep track of the window

UBIB.addEventListener("click", () => {
    const UBIV = UBI.value.trim();
    // Check if the input is a valid URL
    if (UBIV && UBIV.startsWith("http")) {
        if (win) {
            // If the window is already open, bring it to the front
            win.focus();
        } else {
            // Open a new window
            win = window.open('', '_blank', 'width=800,height=600');

            // Style the new window and load URL in a full-screen iframe
            win.document.body.style.margin = '0';
            win.document.body.style.height = '100vh';

            const iframe = win.document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';

            // Set the iframe source to the URL provided
            iframe.src = `http://localhost:3000/proxy?url=${encodeURIComponent(UBIV)}`;

            // Add event listeners to check if the iframe loads or fails
            iframe.onload = () => {
                // Attempt a cross-origin check
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc) {
                        win.document.body.innerHTML += "<p>Website loaded and accessible in iframe!</p>";
                    }
                } catch (error) {
                    win.document.body.innerHTML += "<p>Website loaded, but access is restricted by cross-origin policies.</p>";
                }
            };

            iframe.onerror = () => {
                win.document.body.innerHTML += "<p>Website refused to connect or cannot be loaded in an iframe.</p>";
            };

            win.document.body.appendChild(iframe);

            // Check if the window is closed every 500 ms
            const interval = setInterval(() => {
                if (win.closed) {
                    clearInterval(interval);
                    win = undefined;
                }
            }, 500);
        }
    } else {
        // Clear the input field and set placeholder to prompt valid input
        UBI.value = '';
        UBI.placeholder = 'Please enter a valid URL starting with http:// or https://';
    }
});


{

    const settings_dialog = document.querySelector(".settings");
    const settings_btn = document.querySelector(".settings-btn");
    const close = document.querySelector(".close-settings-icon");

    settings_btn.addEventListener("click", ()=>{
        settings_dialog.showModal();
        settings_dialog.style.display = 'flex';
    });

    close.addEventListener("click", ()=>{
        settings_dialog.close();
        settings_dialog.style.display = 'none';
    });
}


    // Select buttons
const offServerBtn = document.querySelector("#off-server-btn");
const onServerBtn = document.querySelector("#on-server-btn");

// Function to turn off the VPN
function offServer() {
    offServerBtn.disabled = true;
    onServerBtn.disabled = false;
    offServerBtn.textContent = 'VPN is off';
    onServerBtn.textContent = 'Turn VPN On';
}

// Function to turn on the VPN
function onServer() {
    offServerBtn.disabled = false;
    onServerBtn.disabled = true;
    onServerBtn.textContent = 'VPN is on';
    offServerBtn.textContent = 'Turn VPN Off';
}

// Attach event listeners to buttons
offServerBtn.addEventListener("click", offServer);
onServerBtn.addEventListener("click", onServer);

// Initialize proxy server function (to be run once)
function initializeProxyServer() {
    const express = require('express');
    const request = require('request');
    const app = express();

    app.get('/proxy', (req, res) => {
        const url = req.query.url;
        if (!url) {
            return res.status(400).send('URL parameter is required');
        }
        request(url).pipe(res); // Forward the content from the URL to the client
    });

    app.listen(3000, () => console.log('Proxy server running on port 3000'));
}

// Run the proxy server only when the script starts
initializeProxyServer();


{
    // Directory for cursors:
    // ./mac-cur/Text.cur
    // ./mac-cur/Link.cur
    // ./mac-cur/Normal.cur

    const enable_mac_cursors = document.querySelector("#MAC-CURSOR");
    const disable_mac_cursors = document.querySelector("#OFF-MAC");

    enable_mac_cursors.addEventListener("click", () => {
        document.body.style.cursor = "url(./mac-cur/Normal.cur), auto";
    });

    disable_mac_cursors.addEventListener("click", () => {
        document.body.style.cursor = "auto";
    });
}