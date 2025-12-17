// DOM Elements
const form = document.getElementById("limit-form");
const limitInput = document.getElementById("limit");
const tabCountEl = document.getElementById("tab-count");
const windowCountEl = document.getElementById("window-count");
const alertContainer = document.getElementById("alert-container");
const statusContainer = document.getElementById("status-container");
const saveButton = document.getElementById("save-button");
const buttonText = document.getElementById("button-text");

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  loadLimit();
  loadTabCount();
  loadWindowCount();
  loadLastLimitHit();
  clearBadge();
});

// Form submission handler
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Clear previous messages
  clearStatus();
  clearAlert();
  limitInput.classList.remove("error");

  const value = Number.parseInt(limitInput.value, 10);

  // Validation
  if (!Number.isFinite(value) || value < 1) {
    showAlert("error", "Invalid Input", "Please enter a number of 1 or higher.");
    limitInput.classList.add("error");
    limitInput.focus();
    return;
  }

  if (value > 9999) {
    showAlert("error", "Invalid Input", "Maximum limit cannot exceed 9999 tabs.");
    limitInput.classList.add("error");
    limitInput.focus();
    return;
  }

  // Show loading state
  setButtonLoading(true);

  try {
    const response = await chrome.runtime.sendMessage({ type: "setLimit", value });

    if (response?.ok) {
      showStatus("success", `Limit successfully set to ${response.limit} tabs`);
      await loadTabCount();

      // Check if current tabs exceed new limit
      const tabs = await chrome.tabs.query({});
      if (tabs.length > response.limit) {
        showAlert(
          "warning",
          "Limit Exceeded",
          `You currently have ${tabs.length} tabs open, which exceeds your new limit of ${response.limit}. Close ${tabs.length - response.limit} tab${tabs.length - response.limit > 1 ? 's' : ''} to be under the limit.`
        );
      }
    } else {
      showAlert("error", "Save Failed", response?.error || "Unable to save the tab limit. Please try again.");
      limitInput.classList.add("error");
    }
  } catch (error) {
    console.error("Error saving limit:", error);
    showAlert(
      "error",
      "Connection Error",
      "Unable to communicate with the extension. Please refresh and try again."
    );
  } finally {
    setButtonLoading(false);
  }
});

// Input validation on blur
limitInput.addEventListener("blur", () => {
  const value = Number.parseInt(limitInput.value, 10);
  if (limitInput.value && (!Number.isFinite(value) || value < 1 || value > 9999)) {
    limitInput.classList.add("error");
  } else {
    limitInput.classList.remove("error");
  }
});

// Clear error state on input
limitInput.addEventListener("input", () => {
  limitInput.classList.remove("error");
  clearAlert();
});

// Load saved limit
async function loadLimit() {
  try {
    const response = await chrome.runtime.sendMessage({ type: "getLimit" });
    limitInput.value = response?.limit ?? "";

    if (response?.limit) {
      // Show info if limit is already set
      const tabs = await chrome.tabs.query({});
      const remaining = response.limit - tabs.length;

      if (remaining > 0) {
        showAlert(
          "info",
          "Active Limit",
          `Your current limit is ${response.limit} tabs. You can open ${remaining} more tab${remaining > 1 ? 's' : ''}.`
        );
      }
    }
  } catch (error) {
    console.error("Error loading limit:", error);
    showAlert("error", "Load Error", "Unable to load saved settings.");
  }
}

// Load tab count
async function loadTabCount() {
  try {
    const tabs = await chrome.tabs.query({});
    tabCountEl.textContent = tabs.length;
    tabCountEl.classList.remove("loading");
  } catch (error) {
    console.error("Unable to count tabs:", error);
    tabCountEl.textContent = "?";
    tabCountEl.classList.remove("loading");
  }
}

// Load window count
async function loadWindowCount() {
  try {
    const windows = await chrome.windows.getAll();
    windowCountEl.textContent = windows.length;
    windowCountEl.classList.remove("loading");
  } catch (error) {
    console.error("Unable to count windows:", error);
    windowCountEl.textContent = "?";
    windowCountEl.classList.remove("loading");
  }
}

// Load last limit hit notification
async function loadLastLimitHit() {
  try {
    const { lastLimitHit } = await chrome.storage.session.get("lastLimitHit");
    if (lastLimitHit?.limit) {
      showAlert(
        "warning",
        "Tab Limit Reached",
        `You've hit your limit of ${lastLimitHit.limit} tabs. Close a tab to open a new one.`
      );
    }
  } catch (error) {
    console.error("Error loading limit hit status:", error);
  }
}

// Clear badge
function clearBadge() {
  chrome.action.setBadgeText({ text: "" }).catch(() => {});
}

// UI Helper Functions

function showAlert(type, title, message) {
  clearAlert();

  const icons = {
    warning: `<svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
    </svg>`,
    error: `<svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>`,
    success: `<svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>`,
    info: `<svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
    </svg>`
  };

  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.innerHTML = `
    ${icons[type]}
    <div class="alert-content">
      <div class="alert-title">${title}</div>
      <div class="alert-message">${message}</div>
    </div>
  `;

  alertContainer.appendChild(alert);
}

function clearAlert() {
  alertContainer.innerHTML = "";
}

function showStatus(type, message) {
  clearStatus();

  const status = document.createElement("div");
  status.className = `alert ${type}`;
  status.style.marginTop = "12px";
  status.style.marginBottom = "0";

  const icons = {
    success: `<svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>`,
    error: `<svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>`
  };

  status.innerHTML = `
    ${icons[type] || ''}
    <div class="alert-content">
      <div class="alert-message">${message}</div>
    </div>
  `;

  statusContainer.appendChild(status);

  // Auto-clear success messages after 3 seconds
  if (type === "success") {
    setTimeout(clearStatus, 3000);
  }
}

function clearStatus() {
  statusContainer.innerHTML = "";
}

function setButtonLoading(isLoading) {
  if (isLoading) {
    saveButton.disabled = true;
    buttonText.textContent = "Saving...";

    const spinner = document.createElement("div");
    spinner.className = "button-spinner";
    spinner.id = "button-spinner";
    saveButton.insertBefore(spinner, buttonText);
  } else {
    saveButton.disabled = false;
    buttonText.textContent = "Save Limit";

    const spinner = document.getElementById("button-spinner");
    if (spinner) {
      spinner.remove();
    }
  }
}
