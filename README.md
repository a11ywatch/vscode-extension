# vscode-extension-a11ywatch

[VSCode](https://code.visualstudio.com/insiders/) Extension bringing A11yWatch Lite to your IDE.

## Installation

[Protoc](https://grpc.io/docs/protoc-installation/) is required to build the crawler. Follow the instructions from [crawler dependencies](https://github.com/a11ywatch/crawler#dependencies)

## Development

Install dependencies first.

```bash
git clone https://github.com/a11ywatch/vscode-extension.git
cd vscode-extension
npm i
```

After the install process you can press `F5` to "Start Debugging" (or select in menu **"Debug" -> "Run Extension"**). 
A new Extension Development Host window will open in which you need to open command palette (`Ctrl/Cmd + Shift + P`) and select **"Webview A11yWatch: Open Webview"** to open application.

Whats included:
- Communication between Webview and Extension
- Integrated configuration
- Accessibility Engine