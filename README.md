# DeepWiki For Github

A browser extension that integrates DeepWiki with GitHub repositories for enhanced documentation and knowledge management.

## Features

- **GitHub Integration**: Access DeepWiki directly while browsing GitHub repositories
- **Side Panel**: View DeepWiki documentation in a convenient browser side panel
- **Floating Button**: Quick access with a draggable floating button that persists position between sessions
- **Responsive Design**: Automatically adjusts to your browser window size

## Installation

### From Browser Extension Store

- Chrome/Edge: [DeepWiki for GitHub](https://chromewebstore.google.com/detail/deepwiki-for-github/fmpkkcnafhhkllnccpgebapehaepmodn)
- Firefox: Coming soon

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/deepwiki.git
   cd deepwiki
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   # For Chrome/Edge
   pnpm dev
   
   # For Firefox
   pnpm dev:firefox
   ```

4. Build for production:
   ```bash
   # For Chrome/Edge
   pnpm build
   
   # For Firefox
   pnpm build:firefox
   ```

## Usage

1. Navigate to any GitHub repository
2. Click the DeepWiki floating button to open the side panel
3. Access documentation and knowledge for the repository directly in your browser

## Technologies

- React 19
- TypeScript
- Tailwind CSS
- WXT (WebExtension Tools)
- DND Kit for drag-and-drop functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

`deepwiki for github` are authored by Famer-Y and are licensed under the [Apache License, Version 2.0](/LICENSE).


