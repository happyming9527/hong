'use strict';
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Row, Col  } from 'antd'
import {
  AtomicBlockUtils,
  Entity,
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
  convertFromHTML,
  ContentState,
  Modifier,
  DefaultDraftBlockRenderMap,
} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {Map} from 'immutable'
require('draft-js/dist/Draft.css')
require('./RichEditor.css')

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    //let html =
    //  `
    //  <h4>中国用户</h4>
    //  <blockquote>为了忘却的纪念</blockquote>
    //  <p>今天是7月7日,很多人不太记得这是什么日子了.</p>
    //  `
    //let content = ContentState.createFromBlockArray(convertFromHTML(this.props.initContent))
    let contentState = stateFromHTML(this.props.initContent);
    this.state = {
      editorState: EditorState.createWithContent(contentState),
      showURLInput: false,
      url: '',
      urlType: '',
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState})
      this.props.changeCallback(stateToHTML(this.state.editorState.getCurrentContent()))
    };
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (this.props.initContent !== nextProps.initContent) {
      let contentState = stateFromHTML(nextProps.initContent);
      this.setState({
        editorState: EditorState.createWithContent(contentState),
      })
    }
  }

  getContent() {
    let that = this
    return stateToHTML(that.state.editorState.getCurrentContent())
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }


  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _confirmMedia(e) {
    e.preventDefault();
    const {editorState, urlValue, urlType} = this.state;
    const entityKey = Entity.create(urlType, 'IMMUTABLE', {src: urlValue})

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }

  _promptForMedia(type) {
    const {editorState} = this.state;
    this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type,
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0);
    });
  }

  _addAudio() {
    this._promptForMedia('audio');
  }

  _addImage() {
    this._promptForMedia('image');
  }

  _addVideo() {
    this._promptForMedia('video');
  }

  render() {
    const styles = {
      root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
      },
      buttons: {
        marginBottom: 10,
      },
      urlInputContainer: {
        marginBottom: 10,
      },
      urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
        height: 35,
        width: 300
      },
      editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
      },
      button: {
        marginTop: 10,
        textAlign: 'center',
      },
      media: {
        width: '100%',
      },
    };

    const {editorState} = this.state;

    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>
            添加
          </button>
        </div>;
    }

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    function mediaBlockRenderer(block) {
      if (block.getType() === 'atomic') {
        return {
          component: Media,
          editable: false,
        };
      }

      return null;
    }

    const Audio = (props) => {
      return <audio controls src={props.src} style={styles.media} />;
    };

    const Image = (props) => {
      return <img src={props.src} style={styles.media} />;
    };

    const Video = (props) => {
      return <video controls src={props.src} style={styles.media} />;
    };

    const Media = (props) => {
      debugger
      if (!props.block.getEntityAt(0)) {
        return null
      }
      const entity = Entity.get(props.block.getEntityAt(0));
      const {src} = entity.getData();
      const type = entity.getType();

      let media;
      if (type.toUpperCase() === 'AUDIO') {
        media = <Audio src={src} />;
      } else if (type.toUpperCase() === 'IMAGE') {
        media = <Image src={src} />;
      } else if (type.toUpperCase() === 'VIDEO') {
        media = <Video src={src} />;
      }

      return media;
    };

    return (
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />

          <div className="RichEditor-controls">
            <span className={'RichEditor-styleButton'} onMouseDown={this.addAudio}> 音频 </span>
            <span className={'RichEditor-styleButton'} onMouseDown={this.addImage}> 图片 </span>
            <span className={'RichEditor-styleButton'} onMouseDown={this.addVideo}> 视频 </span>
          </div>

          {urlInput}
          <div className={className} onClick={this.focus}>
            <Editor
              blockRendererFn={mediaBlockRenderer}
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="在此输入..."
              ref="editor"
              spellCheck={false}
            />
          </div>
      </div>

    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class BlockStyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: '标题1', style: 'header-one'},
  {label: '标题2', style: 'header-two'},
  {label: '标题3', style: 'header-three'},
  {label: '标题4', style: 'header-four'},
  {label: '标题5', style: 'header-five'},
  {label: '标题6', style: 'header-six'},
  {label: '引用', style: 'blockquote'},
  {label: '无序列表', style: 'unordered-list-item'},
  {label: '有序列表', style: 'ordered-list-item'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <BlockStyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: '加粗', style: 'BOLD'},
  {label: '斜体', style: 'ITALIC'},
  {label: '下划线', style: 'UNDERLINE'},
  {label: '等间距', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <BlockStyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default RichEditorExample