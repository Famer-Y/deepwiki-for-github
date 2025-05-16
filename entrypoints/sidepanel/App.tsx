
import {parse, UrlWithParsedQuery} from 'url';


function App() {

const [parsedUrl, setParsedUrl] = useState<UrlWithParsedQuery | null>(null);

  useEffect(() => {
    (async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs.length > 0) {
        const {url = ''} = tabs[0] ?? {}
        setParsedUrl(parse(url));
      }
    })();
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
  }, []);

  return (
    <>
      <iframe
        id="deepwiki-sidepanel"
        title="deepwiki-sidepanel"
        style={{
          width: "100%",
          minHeight: "auto"
        }}
        src={`https://deepwiki.com/${parsedUrl?.pathname}`}>
      </iframe>
    </>
  );
}

export default App;
