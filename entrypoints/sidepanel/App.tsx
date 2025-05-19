import { useState, useEffect } from "react";

import getRepoUrl from "@/lib/getRepoUrl";

import '@/styles/global.css';
import { onMessage } from "@/lib/utils";

function App() {

  const [wikiUrl, setWikiUrl] = useState<string>('https://deepwiki.com');

  useEffect(() => {
    (async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs.length < 1) {
        return;
      }
      const [tab = {}] = tabs;
      const { url = '' } = { ...tab };
      if (url) {
        setWikiUrl(getRepoUrl(url));
      }
    })();

    onMessage('sidePanel:setUrl', ({ data: { url } }) => {
      setWikiUrl(url);
    });
  }, []);

  return (
    <>
      {wikiUrl && <iframe
        id="deepwiki-sidepanel"
        title="deepwiki-sidepanel"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "none",
        }}
        src={wikiUrl}>
      </iframe>}
    </>
  );
}

export default App;
