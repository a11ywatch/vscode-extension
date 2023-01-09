import React, { useState } from "react";
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
  const [multi, setMulti] = useState<boolean>(false); // todo: bind to state
  const [loginView, setAuthView] = useState<boolean>(false); // todo: bind to state

  // toggle multi page scan
  const onSetMultiEvent = () => setMulti((x) => !x)
  const onLoginFormEvent = () => setAuthView((x) => !x);

  return (
    <div className="py-2 space-y-2">
      {!account.authed ? <button onClick={onLoginFormEvent} className={"px-2 py-2 border-b"}>Login or Register?</button> : null}
      {loginView ? <SignOnForm /> : null}
      <AuditProvider persist multi={multi}>
        <div className="flex space-x-2 place-items-center py-2">
          <AuditForm clear />
          <label>
             Full
            <input type={"checkbox"} value={`${multi ? "multi page" : "single page"}`} checked={multi} onChange={onSetMultiEvent} style={{ marginLeft: 2 }} />
          </label>
        </div>
        <div className="py-2">
          <AuditList />
        </div>
      </AuditProvider>
    </div>
  );
};

// wrap in top level provider
export function App() {
  return <A11yWatchProvider persist><MainApp /></A11yWatchProvider>;
}