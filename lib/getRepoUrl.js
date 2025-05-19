
import gh from 'parse-github-url';

export default function getRepoUrl(url) {
  try {
    const { host } = new URL(url);
    if (host !== 'github.com') {
      return 'https://deepwiki.com';
    }
    const parsedUrl = gh(url);
    if (parsedUrl?.repo) {
      return `https://deepwiki.com/${parsedUrl.repo}`;
    }
  } catch (error) {
    console.error(error);
  }
  return 'https://deepwiki.com';
}
