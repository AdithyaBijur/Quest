import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import React from "react";

import './Editor.css'
class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {} // You can also pass a Quill Delta here

  }
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image', 'code-block']
    ]
  }


  render() {
    return (
      <div className="app">
        <ReactQuill value={this.props.text}
          onChange={this.props.onChange}
          modules={this.modules}
        />
      </div>
    )
  }
}


export default Editor;