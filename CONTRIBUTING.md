# Contributing to Tab Guard

Thank you for your interest in contributing to Tab Guard! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- A clear, descriptive title
- Steps to reproduce the problem
- Expected vs actual behavior
- Chrome version and OS
- Screenshots (if applicable)

### Suggesting Features

Feature requests are welcome! Please open an issue that includes:

- A clear description of the feature
- The problem it solves
- Example use cases
- Any implementation ideas (optional)

### Pull Requests

1. **Fork the repository** and create a new branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, commented code
   - Follow existing code style
   - Test your changes thoroughly

3. **Test the extension**
   - Load the extension in Chrome via `chrome://extensions`
   - Verify all features work as expected
   - Test in both light and dark mode

4. **Commit your changes**
   - Use clear, descriptive commit messages
   - Follow conventional commits format (optional but appreciated):
     ```
     feat: add new feature
     fix: resolve bug in X
     docs: update README
     style: format code
     refactor: restructure Y
     test: add tests for Z
     ```

5. **Push to your fork** and submit a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

6. **In your PR description**, include:
   - Summary of changes
   - Related issue number (if applicable)
   - Screenshots/videos of UI changes
   - Testing steps

## Development Setup

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/GreatButter888/tabguard.git
   cd tabguard
   ```

2. **Load the extension** in Chrome for testing:
   - Open `chrome://extensions`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `tab-guard` folder

3. **Make changes** and click the reload icon on the extension card to test your changes

## Project Structure

```
tab-guard/
├── manifest.json      # Extension metadata and permissions
├── background.js      # Service worker (tab monitoring logic)
├── popup.html         # Extension popup UI
├── popup.js           # Popup functionality
├── icons/             # Extension icons (16px, 48px, 128px)
└── README.md          # Documentation
```

## Code Style Guidelines

- Use modern JavaScript (ES6+)
- Use 2 spaces for indentation
- Add comments for complex logic
- Use semantic variable names
- Keep functions small and focused

## Testing Checklist

Before submitting a PR, verify:

- [ ] Extension loads without errors in developer mode
- [ ] Tab limiting works correctly (test with various limits)
- [ ] Notifications appear as expected when limit is reached
- [ ] Popup UI displays correctly
- [ ] Settings persist across browser restarts
- [ ] Works in both light and dark mode
- [ ] Responsive to different popup widths
- [ ] No console errors or warnings
- [ ] Code is properly formatted
- [ ] No sensitive data or debugging code left in
- [ ] All "yourusername" placeholders replaced (if applicable)

## Questions?

Feel free to open an issue with the "question" label or reach out to jacob@jacobcolangelo.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
