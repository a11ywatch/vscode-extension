# vscode-extension-a11ywatch

[VSCode](https://code.visualstudio.com/insiders/) Extension bringing A11yWatch to your IDE. 

![vscode extension example](https://user-images.githubusercontent.com/8095978/211420387-26244092-ac8e-42e2-a141-f025f7812ef4.gif)

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

## Todo

- full fletched portable system usage of components from `a11ywatch-react-js`.
- add configs for workflows without the webview.
- add option to connect to remote API via switch.
- add [turbopack](https://turbo.build/pack).