export  default async function getCurrentTab(tab: Browser.tabs.Tab|undefined) : Promise<Browser.tabs.Tab>  {
    if (tab) {  
        return tab;
    }
    const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
    return activeTab;
}