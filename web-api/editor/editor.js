class Editor {
    constructor(editor) {
        this.editor = editor;
    }
    /**
     * 光标位置
     */
    editRange() {
        let lastEditRange;
        // 编辑框点击事件
        let editor = document.getElementById(this.editor);
        editor.addEventListener('click', e => {
            // 获取选定对象
            let selection = getSelection()
            console.log(selection)
            // 设置最后光标对象
            lastEditRange = selection.getRangeAt(0)
        })
    }
    copy() {
        let copy = document.getElementById('copy');
        copy.addEventListener('click', e => {
            document.execCommand('copy');
        });
    }
    cut() {
        let cut = document.getElementById('cut');
        cut.addEventListener('click', e => {
            document.execCommand('cut');
        });
    }
    italic() {
        let italic = document.getElementById('italic');
        italic.addEventListener('click', e => {
            document.execCommand('italic');
        });
    }
    bold() {
        let bold = document.getElementById('bold');
        bold.addEventListener('click', e => {
            document.execCommand('bold');
        });
    }
    delete() {
        let deleted = document.getElementById('delete');
        deleted.addEventListener('click', e => {
            document.execCommand('delete');
        });
    }
    underline() {
        let underline = document.getElementById('underline');
        underline.addEventListener('click', e => {
            document.execCommand('underline');
        });
    }
    /** h1-h6 */
    title() {
        let btn = document.getElementById('titleList');
        let list = btn.querySelectorAll('.dropdown-item');
        list.forEach(item => {
            item.addEventListener('click', e => {
                let h = e.target.innerText;
                // 火狐支持
                var css = !!document.queryCommandSupported('heading') ? "btn-succes" : "btn-error"
                if (css && Object.is(css, "btn-error")) {
                    alert("您的浏览器不支持");
                }
                document.execCommand('heading', false, h)
            });
        })
    }
    /** 插入水平线 */
    insertHorizontalRule() {
        let btn = document.getElementById('insertHorizontalRule');
        btn.addEventListener('click', e => {
            document.execCommand('insertHorizontalRule');
        });
    }
    images() {
        let btn = document.getElementById('images');
        btn.addEventListener('click', e => {
            let url = prompt('请输入网络图片路径', 'http://img17.3lian.com/d/file/201701/16/779db6efe9d4520e07e8bfb8b9e55175.jpg');
            document.execCommand('insertImage', false, url);
        });
    }
    /**
     * 有序列表
     */
    insertOrderedList() {
        let btn = document.getElementById('insertOrderedList');
        btn.addEventListener('click', e => {
            document.execCommand('insertOrderedList');
        });
    }
    insertUnorderedList() {
        let btn = document.getElementById('insertUnorderedList');
        btn.addEventListener('click', e => {
            document.execCommand('insertUnorderedList');
        });
    }
    /** 初始化编辑器 */
    initEditor() {
        this.cut();
        this.italic();
        this.bold();
        this.delete();
        this.copy();
        this.underline();
        this.title();
        this.insertHorizontalRule();
        this.images();
        this.insertOrderedList();
        this.insertUnorderedList();
        this.editRange();
    }
}