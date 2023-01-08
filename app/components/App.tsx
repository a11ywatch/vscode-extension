import React from "react";
import {
  SignOnForm,
  useA11yWatchContext,
  AuditProvider,
  AuditForm,
  AuditList,
} from "@a11ywatch/react-a11ywatch-js";
import { A11yWatchProvider } from "@a11ywatch/react-a11ywatch-js";

const MainApp = () => {
  const { account } = useA11yWatchContext();
  
  return (
    <div className="py-2">
      {account.authed ? (
      <AuditProvider persist multi={false}>
        <AuditForm clear />
        <div className="py-2">
          <AuditList />
        </div>
      </AuditProvider>
      ) : (
        <SignOnForm />
      )}
    </div>
  );
};

// wrap in top level provider
export function App() {
  return <A11yWatchProvider persist><MainApp /></A11yWatchProvider>;
}