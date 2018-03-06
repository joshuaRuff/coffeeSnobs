import axios from 'axios';

export function getWithToken(url, store) {
  const { apiUrl, accountId } = store.app;
  const { token } = store.auth;
  return axios({
    url: `${apiUrl}/pages/${accountId}/${url}`,
    method: 'get',
    headers: { Authorization: token },
  });
}

export function parseLocation(path) {
  if (path) {
    const splitPath = path.split('/');
    const templateOrLayout = splitPath[1] || '';
    const id = splitPath[2] || '';
    const action = splitPath[3] || '';
    return {
      action,
      id,
      templateOrLayout,
    };
  }
  return {};
}

export function setAndIndentEditor(templateString, whichEditor) {
  const newContent = spaceContent(templateString);
  whichEditor.setValue(newContent);
  whichEditor.setSelection(
    {
      line: whichEditor.firstLine(),
      ch: 0,
      sticky: null,
    }, {
      line: whichEditor.lastLine(),
      ch: 0,
      sticky: null,
    },
    { scroll: false },
  );
  // auto indent the selection
  whichEditor.indentSelection('smart');
  whichEditor.setSelection({
    line: whichEditor.firstLine(),
    ch: 0,
    sticky: null,
  });
}

function spaceContent(content) {
  let editedContent = content;
  editedContent = editedContent.replace(/>(?!<)/g, '>\n');
  editedContent = editedContent.replace(/</g, '\n<');
  return editedContent;
}

export function cleanContent(content) {
  let editedContent = content;
  editedContent = editedContent.replace(/\s+/g, ' ');
  editedContent = editedContent.replace(/> /g, '>');
  return editedContent;
}
