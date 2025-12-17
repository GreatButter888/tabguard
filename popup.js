const form = document.getElementById("limit-form");
const limitInput = document.getElementById("limit");
const statusEl = document.getElementById("status");
const tabCountEl = document.getElementById("tab-count");
const limitHitEl = document.getElementById("limit-hit");
const windowCountEl = document.getElementById("window-count");

document.addEventListener("DOMContentLoaded", () => {
  loadLimit();
  loadTabCount();
  loadWindowCount();
  loadLastLimitHit();
  clearBadge();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "";
  statusEl.classList.remove("error");

  const value = Number.parseInt(limitInput.value, 10);
  if (!Number.isFinite(value) || value < 1) {
    statusEl.textContent = "Enter a number that is 1 or higher.";
    statusEl.classList.add("error");
    return;
  }

  try {
    const response = await chrome.runtime.sendMessage({ type: "setLimit", value });
    if (response?.ok) {
      statusEl.textContent = `Saved. Limit set to ${response.limit}.`;
      loadTabCount();
    } else {
      statusEl.textContent = response?.error || "Could not save the limit.";
      statusEl.classList.add("error");
    }
  } catch (error) {
    statusEl.textContent = "Could not talk to the background service.";
    statusEl.classList.add("error");
    console.error(error);
  }
});

async function loadLimit() {
  try {
    const response = await chrome.runtime.sendMessage({ type: "getLimit" });
    limitInput.value = response?.limit ?? "";
  } catch (error) {
    limitInput.value = "";
    statusEl.textContent = "Could not load saved limit.";
    statusEl.classList.add("error");
    console.error(error);
  }
}

async function loadTabCount() {
  try {
    const tabs = await chrome.tabs.query({});
    tabCountEl.textContent = tabs.length;
  } catch (error) {
    tabCountEl.textContent = "–";
    console.error("Unable to count tabs", error);
  }
}

async function loadWindowCount() {
  try {
    const windows = await chrome.windows.getAll();
    windowCountEl.textContent = windows.length;
  } catch (error) {
    windowCountEl.textContent = "–";
    console.error("Unable to count windows", error);
  }
}

async function loadLastLimitHit() {
  try {
    const { lastLimitHit } = await chrome.storage.session.get("lastLimitHit");
    if (lastLimitHit?.limit) {
      limitHitEl.textContent = `Max reached: ${lastLimitHit.limit} tabs. Close one to open another.`;
    } else {
      limitHitEl.textContent = "";
    }
  } catch (error) {
    limitHitEl.textContent = "";
  }
}

function clearBadge() {
  chrome.action.setBadgeText({ text: "" }).catch(() => {});
}
