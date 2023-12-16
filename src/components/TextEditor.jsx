import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import { createReactEditorJS } from 'react-editor-js';

import { EDITOR_JS_TOOLS } from '../constants';

const ReactEditorJS = createReactEditorJS();

class TextEditor extends Component {
  render() {
    return (
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          time: 1635603431943,
          blocks: [
            {
              id: 'sheNwCUP5A',
              type: 'header',
              data: {
                text: 'Privacy Policy',
                level: 2,
              },
            },
          ],
        }}
      />
    );
  }
}

export default TextEditor;
