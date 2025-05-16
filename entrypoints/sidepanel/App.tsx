import { onMessage } from "@/lib/utils";

function App() {

  useEffect(() => {

    const iframe = document.getElementById('inlineFrameExample');
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
    window.onload = function () {
      if (iframe) {
        iframe.style.width = window.innerWidth + 'px';
        iframe.style.height = window.innerHeight + 'px';
      }
    };
  
  }, []);

  return (
    <>
      <iframe id="inlineFrameExample" title="Inline Frame Example" style={{ width: "100%", minHeight: "auto" }}
        src="https://deepwiki.com/PostHog/posthog-js-lite">
      </iframe>
    </>
  );
}

export default App;
