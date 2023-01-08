type Message = import('../src/view/messages/messageTypes').Message;

type VSCode = {
  getState(): any;
  postMessage<T extends Message = Message>(message: T): void;
  setState(state: any): void;
};

declare const vscode: VSCode;

declare const apiUserGender: string;
