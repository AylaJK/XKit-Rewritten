import { registerMeatballItem, unregisterMeatballItem } from '../util/meatballs.js';
import { timelineObjectMemoized } from '../util/react_props.js';
import { getPreferences } from '../util/preferences.js';

let archiveUrl;

const meatballButtonLabel = 'Mirror this post';

const onButtonClicked = async function ({ target }) {
  const postElement = target.closest('[data-id]');
  const postID = postElement.dataset.id;

  const { postUrl } = await timelineObjectMemoized(postID);

  window.open(archiveUrl(postUrl), '_blank');
};

export const main = async function () {
  const { mirrorTo } = await getPreferences('mirror_button');

  switch (mirrorTo) {
    case 'archive_is':
      archiveUrl = (postUrl) => `https://archive.is/?run=1&url=${encodeURIComponent(postUrl)}`;
      break;
    case 'archive_org':
    default:
      archiveUrl = (postUrl) => `https://web.archive.org/save/${postUrl}`;
  }

  registerMeatballItem({ label: meatballButtonLabel, onClick: onButtonClicked });
};

export const clean = async function () {
  unregisterMeatballItem(meatballButtonLabel);
};
