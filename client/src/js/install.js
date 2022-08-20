const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

// Create an addEventListener to the app installation button
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if(!promptEvent) {
        return;
    }
    promptEvent.prompt(); //display prompt

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null; 
    butInstall.classList.toggle('hidden', true);
});

// Create an addEventListener for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    //clear prompt
    window.deferredPrompt = null; 
});
