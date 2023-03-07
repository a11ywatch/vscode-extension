import React, { useState } from "react";
import {
  AuditProvider,
  AuditList,
  FormDialog,
} from "@a11ywatch/react-a11ywatch-js";
import { A11yWatchProvider } from "@a11ywatch/react-a11ywatch-js";

const MainApp = () => {
  const [multi, setMulti] = useState<boolean>(true); // todo: bind to state
  const onSetMultiEvent = () => setMulti((x) => !x);

  return (
    <div className="py-2 space-y-2">
      <AuditProvider persist multi={multi}>
        <div className="space-y-2">
          <div className="pt-2">
            <label className="border rounded p-2">
              Full Crawl
              <input
                type={"checkbox"}
                value={`${multi ? "multi" : "single"} page`}
                checked={multi}
                onChange={onSetMultiEvent}
                style={{ marginLeft: 2 }}
              />
            </label>
          </div>
          <div className="py-2">
            <div className="border-t">
              <FormDialog
                buttonTitle="Run Audit"
                subTitle="Add a url to analyze below."
                submitTitle="Submit"
                activeSubscription
                submitButtonStyle={
                  "border-none py-3 text-center flex flex-1 w-full place-items-center place-content-center h-20"
                }
                viewConfigs={{ disabled: { lighthouse: true } }}
              />
            </div>
          </div>
          <div className="py-2">
            <AuditList />
          </div>
        </div>
      </AuditProvider>
    </div>
  );
};

// wrap in top level provider
export function App() {
  return (
    <A11yWatchProvider persist>
      <MainApp />
    </A11yWatchProvider>
  );
}
