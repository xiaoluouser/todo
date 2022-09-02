import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
function TextEditor({ getContent }) {
    // editor 实例
    const [editor, setEditor] = useState(null);
    // 工具栏配置
    const toolbarConfig = {
        toolbarKeys: [
            'headerSelect',
            '|',
            'bold',
            'italic',
            'underline',
            'color',
            'bgColor',
            'fontSize',
            'fontFamily',
            'bulletedList',
            "uploadImage",
        ]
    }
    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
        onDestroyed: (editor) => {
            if (editor.getHtml() === '<p><br></p>') {
                return;
            }
            let reg = /。/gi;
            let index = reg.exec(editor.getText()).index;
            let description = editor.getText().slice(0, index);
            getContent(description, editor.getHtml());
        }
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div style={{ zIndex: 100, height: '100%', width: '100%' }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #90A4AE', width: '100%' }}
            />
            <Editor
                defaultConfig={editorConfig}
                onCreated={setEditor}
                mode="default"
                style={{ height: '100%', width: '100%', overflowY: 'hidden' }}
            />
        </div>
    )
}

export default TextEditor;