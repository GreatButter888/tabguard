const DEFAULT_LIMIT = 10;
const NOTIFICATION_ID = "tab-limit-guard";
let lastNotifiedAt = 0;
let lastBadgeSetAt = 0;

chrome.runtime.onInstalled.addListener(() => {
  ensureDefaultLimit();
});

chrome.tabs.onCreated.addListener((tab) => {
  enforceLimit(tab.id);
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "getLimit") {
    getLimit().then((limit) => sendResponse({ limit }));
    return true;
  }

  if (message?.type === "setLimit") {
    const nextLimit = Number.parseInt(message.value, 10);
    if (!Number.isFinite(nextLimit) || nextLimit < 1) {
      sendResponse({ ok: false, error: "Tab limit must be a positive number." });
      return;
    }

    chrome.storage.sync
      .set({ tabLimit: nextLimit })
      .then(() => sendResponse({ ok: true, limit: nextLimit }))
      .catch((error) => sendResponse({ ok: false, error: error?.message || "Unable to save tab limit." }));
    return true;
  }

  return undefined;
});

async function ensureDefaultLimit() {
  const { tabLimit } = await chrome.storage.sync.get("tabLimit");
  if (!Number.isFinite(tabLimit) || tabLimit < 1) {
    await chrome.storage.sync.set({ tabLimit: DEFAULT_LIMIT });
  }
}

async function getLimit() {
  const { tabLimit } = await chrome.storage.sync.get("tabLimit");
  if (!Number.isFinite(tabLimit) || tabLimit < 1) {
    return DEFAULT_LIMIT;
  }
  return Math.floor(tabLimit);
}

async function enforceLimit(newTabId) {
  const limit = await getLimit();
  const tabs = await chrome.tabs.query({});
  if (tabs.length <= limit) {
    return;
  }

  const tabIdToClose = newTabId ?? findNewestTabId(tabs);
  if (tabIdToClose !== undefined) {
    try {
      await chrome.tabs.remove(tabIdToClose);
    } catch (error) {
      console.warn("Could not remove tab over limit:", error);
    }
  }

  notifyLimitReached(limit);
}

function findNewestTabId(tabs) {
  const sorted = [...tabs].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  return sorted[0]?.id;
}

function notifyLimitReached(limit) {
  const now = Date.now();
  if (now - lastNotifiedAt < 1500) {
    return;
  }
  lastNotifiedAt = now;

  chrome.notifications.clear(NOTIFICATION_ID).finally(() => {
    chrome.notifications.create(NOTIFICATION_ID, {
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Tab limit reached",
      message: `Limit set to ${limit}. Close a tab to open a new one.`,
      priority: 2,
      requireInteraction: true
    });
  });

  chrome.storage.session.set({ lastLimitHit: { limit, at: now } }).catch(() => {});

  const nowBadge = Date.now();
  if (nowBadge - lastBadgeSetAt > 500) {
    lastBadgeSetAt = nowBadge;
    chrome.action.setBadgeText({ text: "MAX" }).catch(() => {});
    chrome.action.setBadgeBackgroundColor({ color: "#d14343" }).catch(() => {});
  }

  chrome.action.openPopup?.().catch(() => {});
}
