# Playwright Test Automation Project

This project contains automated tests using Playwright for an Angular admin dashboard application.

## Prerequisites

- Node.js (latest LTS version recommended)
- Git
- Visual Studio Code (recommended)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/username/Playwright-Automation.git
cd Playwright-Automation
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Start the Angular application:

```bash
npm start
```

The app will be available at `http://localhost:4200`

## Project Structure

```
├── page-objects/            # Page Object Models
├── tests/                   # Test files
├── playwright.config.ts     # Playwright configuration
├── src/                     # Angular application source code
└── JS-Lessons/             # JavaScript examples
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

View test report:

```bash
npx playwright show-report
```

## Configuration

Test configuration is defined in `playwright.config.ts`:

- Timeout: 30 seconds
- Browsers: Chromium (default)
- Reporter: HTML
- Test directory: `./tests`

## Framework Features

- Page Object Model pattern
- Custom helpers and utilities
- Integration with Angular application
- HTML test reports
- TypeScript support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
