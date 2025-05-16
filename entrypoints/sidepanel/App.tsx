
// import { URL } from "url";

import { sendMessage } from "@/lib/utils";

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

  useEffect(() => {
    const iframe = document.getElementById('deepwiki-sidepanel');
    if (iframe) {
      iframe.style.width = window.innerWidth + 'px';
      iframe.style.height = window.innerHeight + 'px';
    }
    window.onresize = function () {
      if (iframe) {
        iframe.style.width = window.innerWidth + 'px';
        iframe.style.height = window.innerHeight + 'px';
      }
    };
  }, [parsedUrl]);

  return (
    <>
      {parsedUrl && <iframe
        id="deepwiki-sidepanel"
        title="deepwiki-sidepanel"
        style={{
          width: "100%",
          minHeight: "auto"
        }}
        src={`https://deepwiki.com/${parsedUrl?.pathname}`}>
      </iframe>}
    </>
  );
}

export default App;
