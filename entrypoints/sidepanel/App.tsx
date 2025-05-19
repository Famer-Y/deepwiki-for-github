import { useState, useEffect } from "react";

import { sendMessage } from "@/lib/utils";

import '@/styles/global.css';

function App() {

  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);

  useEffect(() => {
    (async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs.length < 1) {
        return;
      }
      const { id = 0 } = tabs[0] ?? {}
      if (id === 0) {
        return;
      }
      const url = await sendMessage('sidePanel:getUrl', {}, { tabId: id });
      console.log(url);
      setParsedUrl(new URL(url));

    })();

  }, []);

  return (
    <>
      {parsedUrl && <iframe
        id="deepwiki-sidepanel"
        title="deepwiki-sidepanel"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "1px",
        }}
        src={`https://deepwiki.com/${parsedUrl?.pathname}`}>
      </iframe>}
    </>
  );
}

export default App;
