# Tab Guard

Chrome extension that keeps your browsing tidy by capping how many tabs you can have open. When you try to exceed the limit, the newest tab is closed and a notification lets you know you've hit the cap.

**Stay focused on what matters.** Tab Guard helps you break the habit of tab hoarding, keeping you focused on the tasks that truly matter. By limiting how many tabs you can have open at once, you'll reduce distractions, minimize context switching, and maintain a cleaner, more productive workspace.

## How to use
- In Chrome, open `chrome://extensions` and enable **Developer mode**.
- Click **Load unpacked** and select this `tab-guard` folder.
- Click the extension icon to set your preferred maximum tab count (defaults to 10).
- If you try to open more than the limit, the extra tab is closed and you'll see a "Tab limit reached" notification.

## Files
- `manifest.json` — Extension metadata and permissions.
- `background.js` — Watches for new tabs, enforces the cap, and shows notifications.
- `popup.html` / `popup.js` — Action popup UI to view/update the tab limit.
- `icons/` — Packaged icons used for the extension and notification.
