import React, { useEffect, useState } from "react";
import {
  AuditProvider,
  AuditList,
  FormDialog,
  useAuditContext,
  setAPIURL,
  SignOnForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";
import { A11yWatchProvider } from "@a11ywatch/react-a11ywatch-js";

const PROD_URL = "https://api.a11ywatch.com";

const TopMenu = ({
  onSetMultiEvent,
  multi,
}: {
  multi: boolean;
  onSetMultiEvent(): void;
}) => {
  const { audit } = useAuditContext();
  const { account } = useA11yWatchContext()

  const [baseAPI, setRemoteAPI] = useState<string>("http://localhost:3280");
  const [showAuth, setAuthForm] = useState<boolean>(false);

  useEffect(() => {
    const getAPIInstance = localStorage.getItem("@a11ywatch/API_ENDPOINT");
    if (getAPIInstance) {
      setRemoteAPI(getAPIInstance);
      setAPIURL(getAPIInstance);
    }
  }, [setRemoteAPI]);

  const onClearData = () => audit.reset();

  const production = baseAPI === PROD_URL;

  const onChangeProduction = () => {
    const nextURL = production
      ? "http://localhost:3280"
      : "https://api.a11ywatch.com";

    localStorage.setItem("@a11ywatch/API_ENDPOINT", nextURL);

    setAPIURL(nextURL);
    setRemoteAPI(nextURL);
  };

  const onToggleAuthenticate = () => setAuthForm((x) => !x);

  return (
    <>
      {showAuth ? <SignOnForm /> : null}
      <div className="pt-2 flex space-x-2 place-items-center">
        <label className="border rounded p-2">
          Full Crawl
          <input
            type={"checkbox"}
            value={`${multi ? "multi" : "single"} page`}
            checked={multi}
            onChange={onSetMultiEvent}
            className="ml-2 hover:opacity-80"
          />
        </label>
        <button
          className="border rounded p-2 hover:opacity-80"
          type="button"
          onClick={onClearData}
        >
          Clear
        </button>
        <button
          onClick={onToggleAuthenticate}
          type={"button"}
          className="border rounded p-2 hover:opacity-80"
        >
          {showAuth ? "Hide Auth" : "Authenticate"}
        </button>
        <button
          onClick={onChangeProduction}
          type={"button"}
          className="border rounded p-2 hover:opacity-80"
        >
          {production ? "Switch to Lite Mode" : "Switch to Production"}
        </button>
        <div className="space-y-2">
          <div className="font-semibold">API: {baseAPI}</div>
          {account.email ? <div>{account.email}</div> : null}
        </div>
      </div>
    </>
  );
};

const MainApp = () => {
  const [multi, setMulti] = useState<boolean>(true); // todo: bind to state

  const onSetMultiEvent = () => {
    localStorage.setItem("@a11ywatch/MULTI_CRAWL", multi ? "false" : "true");
    setMulti((x) => !x)
  };

  useEffect(() => {
    const mutli = localStorage.getItem("@a11ywatch/MULTI_CRAWL");

    if (mutli) {
      setMulti(mutli === "true");
    }
  }, [setMulti]);

  return (
    <div className="py-2 space-y-2">
      <AuditProvider persist multi={multi}>
        <div className="space-y-2">
          <TopMenu onSetMultiEvent={onSetMultiEvent} multi={multi} />
          <div className="py-2">
            <div className="border-t dark:border-gray-700">
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
