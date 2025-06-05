// background.js - Service Worker for Chrome Extension MV3

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    // Only handle main frame navigation (not iframes)
    if (details.frameId === 0) {
        await checkAndBlockUrl(details.url, details.tabId);
    }
});

// Also listen for tab updates to catch URL changes
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        await checkAndBlockUrl(changeInfo.url, tabId);
    }
});

async function checkAndBlockUrl(url, tabId) {
    try {
        // Don't block if already on the extension's blocked page
        if (url.includes('chrome-extension://') && url.includes('#blocked')) {
            return;
        }

        // Get stored profiles from chrome storage
        const result = await chrome.storage.local.get(['profiles']);
        const profiles = result.profiles || [];

        // Check if current URL matches any profile with blocking enabled
        const blockedProfile = findBlockedProfile(url, profiles);

        if (blockedProfile && isWithinBlockingTime(blockedProfile.block)) {
            // Redirect to blocked route in your React app
            await redirectToBlockedRoute(tabId, blockedProfile, url);
        }
    } catch (error) {
        console.error('Error in background script:', error);
    }
}

function findBlockedProfile(currentUrl, profiles) {
    return profiles.find(profile => {
        // Check if profile has blocking enabled
        if (!profile.block) return false;

        // Extract base URL from profile URL
        const profileBaseUrl = extractBaseUrl(profile.url);
        const currentBaseUrl = extractBaseUrl(currentUrl);

        // Check if base URLs match
        return profileBaseUrl && currentBaseUrl && profileBaseUrl === currentBaseUrl;
    });
}

function extractBaseUrl(url) {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch (error) {
        return null;
    }
}

function isWithinBlockingTime(blockData) {
    if (!blockData || !blockData.startTime || !blockData.endTime) {
        return false;
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

    // Parse time strings (assuming format like "09:00" or "21:30")
    const startTime = parseTimeToMinutes(blockData.startTime);
    const endTime = parseTimeToMinutes(blockData.endTime);

    if (startTime === null || endTime === null) {
        return false;
    }

    // Handle case where end time is next day (e.g., 23:00 to 07:00)
    if (startTime <= endTime) {
        return currentTime >= startTime && currentTime <= endTime;
    } else {
        return currentTime >= startTime || currentTime <= endTime;
    }
}

function parseTimeToMinutes(timeString) {
    if (!timeString) return null;

    const timeParts = timeString.split(':');
    if (timeParts.length !== 2) return null;

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return null;
    }

    return hours * 60 + minutes;
}

async function redirectToBlockedRoute(tabId, blockedProfile, originalUrl) {
    try {
        // Get the extension URL
        const extensionUrl = chrome.runtime.getURL('index.html');

        // Create URL with blocked route and pass data as URL parameters
        const blockedUrl = `${extensionUrl}#blocked?` +
            `profileTitle=${encodeURIComponent(blockedProfile.title || 'Website')}&` +
            `originalUrl=${encodeURIComponent(originalUrl)}&` +
            `startTime=${encodeURIComponent(blockedProfile.block.startTime)}&` +
            `endTime=${encodeURIComponent(blockedProfile.block.endTime)}&` +
            `profileId=${encodeURIComponent(blockedProfile.id)}`;

        // Update the tab to show the blocked route
        await chrome.tabs.update(tabId, { url: blockedUrl });
    } catch (error) {
        console.error('Error redirecting to blocked route:', error);
    }
}

// Handle extension installation/startup
chrome.runtime.onInstalled.addListener(() => {
    console.log('Profile Jumper background script installed');
});