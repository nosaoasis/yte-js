import { useState, useEffect } from "react";

const RichTextEditor = (props) => {
  const {customEditorContent, setCustomEditorContent} = props

  const updateContent = (e) => {
    console.log(e.target.innerHTML)
    console.log("wwwww")
  }

  useEffect(() => {
    window['customRichTextJS']()
  }, [])

  return (
    <>
      <div>
        <div className="options">
          {/* <!-- text format --> */}
          <button id="bold" className="option-button format">
            <i className="fa-solid fa-bold"></i>
          </button>
          <button id="italic" className="option-button format">
            <i className="fa-solid fa-italic"></i>
          </button>
          <button id="underline" className="option-button format">
            <i className="fa-solid fa-underline"></i>
          </button>
          <button id="strikethrough" className="option-button format">
            <i className="fa-solid fa-strikethrough"></i>
          </button>
          <button id="superscript" className="option-button script">
            <i className="fa-solid fa-superscript"></i>
          </button>
          <button id="subscript" className="option-button script">
            <i className="fa-solid fa-subscript"></i>
          </button>

          {/* <!-- lists --> */}
          <button id="insertOrderedList" className="option-button">
            <i className="fa-solid fa-list-ol"></i>
          </button>
          <button id="insertUnorderedList" className="option-button">
            <i className="fa-solid fa-list-ul"></i>
          </button>
          <button id="undo" className="option-button">
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <button id="redo" className="option-button">
            <i className="fa-solid fa-rotate-right"></i>
          </button>

          {/* <!-- link --> */}
          <button id="createLink" className="adv-option-button">
            <i className="fa-solid fa-link"></i>
          </button>
          <button id="unlink" className="option-button">
            <i className="fa-solid fa-unlink"></i>
          </button>

          {/* <!-- alignments --> */}
          <button id="justifyLeft" className="option-button">
            <i className="fa-solid fa-align-left"></i>
          </button>
          <button id="justifyCenter" className="option-button">
            <i className="fa-solid fa-align-center"></i>
          </button>
          <button id="justifyRight" className="option-button">
            <i className="fa-solid fa-align-right"></i>
          </button>
          <button id="justifyFull" className="option-button">
            <i className="fa-solid fa-align-justify"></i>
          </button>
          <button id="indent" className="option-button spacing">
            <i className="fa-solid fa-indent"></i>
          </button>
          <button id="outdent" className="option-button spacing">
            <i className="fa-solid fa-outdent"></i>
          </button>

          {/* <!-- headings --> */}
          <select id="formatBlock" className="adv-option-button">
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
            <option value="H4">H4</option>
            <option value="H5">H5</option>
            <option value="H6">H6</option>
          </select>

          {/* <!-- font name --> */}
          <select id="fontName" className="adv-option-button"></select>
          <select id="fontSize" className="adv-option-button"></select>

          {/* <!-- colors --> */}
          <div className="input-wrapper">
            <input type="color" id="foreColor" className="adv-option-button" />
            <label htmlFor="foreColor">Font Color</label>
          </div>
          <div className="input-wrapper">
            <input type="color" id="backColor" className="adv-option-button" />
            <label htmlFor="backColor">Highlight Color</label>
          </div>
        </div>
      
        <div id="text-input" contentEditable="true" onInput={updateContent}></div>
      </div>
      
    </>
  );
};

export default RichTextEditor;
