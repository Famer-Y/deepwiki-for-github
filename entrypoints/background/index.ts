export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  import.meta.glob('./messaging/**/*.{ts,js}', { eager: true });
  import.meta.glob('./browser/**/*.{ts,js}', { eager: true });
});
