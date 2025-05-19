
import gh from 'parse-github-url';

export default function getRepoUrl(url) {
  try {
    const parsedUrl = gh(url);
    if (parsedUrl?.host !== 'github.com') {
      return 'https://deepwiki.com';
    }
    if (parsedUrl?.repo) {
      return `https://deepwiki.com/${parsedUrl.repo}`;
    }
  } catch (error) {
    console.error(error);
  }
  return 'https://deepwiki.com';
}
