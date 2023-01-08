# vscode-extension-a11ywatch

VSCode Extension bringing A11yWatch to your IDE.

![vscode extension example](https://user-images.githubusercontent.com/8095978/211318106-30e7601d-52c7-4ae3-8b05-29e686617a1c.gif)

## Development

Install dependencies first.

```bash
git clone https://github.com/a11ywatch/vscode-extension.git
cd vscode-extension
npm i
```

After the install process you can press `F5` to "Start Debugging" (or select in menu **"Debug" -> "Run Extension"**). 
A new Extension Development Host window will open in which you need to open command palette (`Ctrl/Cmd + Shift + P`) and select **"Webview React: Open Webview"** to open application.

Whats included:
- Communication between Webview and Extension
- Integrated configuration
- Accessibility Engine

## Todo

- full fletched portable system usage of components from `a11ywatch-react-js`.
- add configs for workflows without the webview.
- add crawl multi site pages.
- add [turbopack](https://turbo.build/pack).