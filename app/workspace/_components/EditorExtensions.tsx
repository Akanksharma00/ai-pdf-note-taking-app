import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { Bold, Italic } from 'lucide-react'

const EditorExtensions = ({ editor }:{editor: Editor}) => {
    
  if (!editor) {
    return null
  }

  return (
    <div className="control-group p-4 border-b">
        <div className="button-group flex gap-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(editor.isActive('bold') ? 'text-blue-600' : '')}
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <Italic size={18} />
          </button>
        </div>
      </div>
  )
}

export default EditorExtensions
