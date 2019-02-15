class Editor {
    constructor(editor) {
        this.editor = editor;
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
    insertHorizontalRule(){
        let btn = document.getElementById('insertHorizontalRule');
        btn.addEventListener('click', e => {
            document.execCommand('insertHorizontalRule');
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
    }
}