
import gh from 'parse-github-url';

export default function getRepoUrl(url) {
  try {
    const parsedUrl = gh(url);
    if (parsedUrl?.repo) {
      return `https://deepwiki.com/${parsedUrl.repo}`;
    }
  } catch (error) {
    console.error(error);
  }
  return 'https://deepwiki.com';
}
