import { useState, useEffect } from "react";
  
import { BeatLoader } from "react-spinners";

import getRepoUrl from "@/lib/getRepoUrl";

import '@/styles/global.css';
import { onMessage } from "@/lib/utils";

function App() {

  const [wikiUrl, setWikiUrl] = useState<string>('https://deepwiki.com');
  const [isLoading, setIsLoading] = useState(true);

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

    onMessage('sidePanel:setTab', async ({ data: { tab } }) => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs.length < 1) {
        return;
      }
      const [currentTab = null] = tabs;
      if (!currentTab) {
        return;
      }
      if (currentTab.id === tab.id) {
        setWikiUrl(getRepoUrl(tab.url));
      }
    });
  }, []);

  return (
    <>
      {isLoading &&
        <div className="h-full w-full flex items-center justify-center">
          <BeatLoader color="#000" />
        </div>}
      {wikiUrl &&
        <iframe
          id="deepwiki-sidepanel"
          title="deepwiki-sidepanel"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "none",
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
          src={wikiUrl}>
        </iframe>}
    </>
  );
}

export default App;
