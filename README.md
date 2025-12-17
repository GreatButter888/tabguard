# Tab Guard

> A Chrome extension that helps you stay focused by limiting the number of tabs you can have open

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue?logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/tab-guard?style=social)](https://github.com/yourusername/tab-guard)

## Overview

Tab Guard is a productivity extension that helps you break the habit of tab hoarding. By setting a maximum tab limit, you'll reduce distractions, minimize context switching, and maintain a cleaner, more productive workspace.

When you try to exceed your configured limit, the newest tab is automatically closed and you'll receive a notification explaining why. This gentle enforcement helps you stay focused on what truly matters.

## Features

- 🎯 **Simple Tab Limiting** - Set your preferred maximum tab count (1-9999)
- 🔔 **Smart Notifications** - Get notified when you hit your limit
- 📊 **Live Statistics** - View current tab and window counts at a glance
- 🎨 **Beautiful UI** - Modern, accessible interface with dark mode support
- 🔒 **Privacy First** - No data collection, everything stored locally
- ⚡ **Lightweight** - Minimal performance impact

## Installation

### From Chrome Web Store

1. Visit the [Tab Guard Chrome Web Store listing](#)
2. Click **"Add to Chrome"**
3. Confirm by clicking **"Add extension"** in the popup
4. Click the Tab Guard icon in your Chrome toolbar to get started

That's it! Tab Guard is now protecting you from tab overload.

## How to Use

1. **Set Your Limit**: Click the Tab Guard icon in your toolbar and enter your preferred maximum tab count (e.g., 10, 20, 50)
2. **Stay Focused**: The extension automatically closes new tabs when you exceed your limit
3. **Get Notified**: You'll see a notification explaining when and why a tab was closed
4. **Monitor Your Tabs**: View real-time statistics of your open tabs and windows in the popup

## Privacy & Permissions

Tab Guard respects your privacy and only requests the minimum permissions necessary:

- **`tabs`** - Count open tabs and enforce the limit
- **`windows`** - Count open windows for statistics
- **`storage`** - Save your tab limit preference locally
- **`notifications`** - Alert you when the limit is reached

**No data is collected, transmitted, or shared.** Everything stays on your device.

See our [Privacy Policy](./PRIVACY_POLICY.md) for full details.

## For Developers

### Project Structure

```
tab-guard/
├── manifest.json      # Extension configuration
├── background.js      # Service worker for tab monitoring
├── popup.html         # Extension popup UI
├── popup.js           # Popup functionality
└── icons/             # Extension icons
```

### Local Development Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/tab-guard.git
   cd tab-guard
   ```

2. Load the extension in Chrome:
   - Open `chrome://extensions`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `tab-guard` folder

3. Make changes and click the reload button on the extension card to test

### Building from Source

No build process required - this is a pure JavaScript extension with no dependencies.

### Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.

## Support

- 🐛 **Found a bug?** [Open an issue](https://github.com/yourusername/tab-guard/issues)
- 💡 **Have a feature request?** [Start a discussion](https://github.com/yourusername/tab-guard/discussions)
- ☕ **Enjoy Tab Guard?** [Buy me a coffee](https://www.buymeacoffee.com/jacobleecolangelo)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author

**Jacob Colangelo**
- Website: [jacobcolangelo.com](https://jacobcolangelo.com)
- Email: jacob@jacobcolangelo.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

<div align="center">
  <strong>Stay focused. Stay productive.</strong>
  <br>
  Made with ❤️ by Jacob Colangelo
</div>
