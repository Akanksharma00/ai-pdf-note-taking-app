import { Placeholder } from '@tiptap/extensions'
import {useEditor, EditorContent, Editor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorExtensions from './EditorExtensions'

const TextEditor = () => {
    const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your notes here...',
      })
    ],
    editorProps: {
      attributes:{
        class: 'focus:outline-none h-screen p-8',
      }
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })
  return (
    <div>
        <EditorExtensions editor={editor as Editor} />
        <EditorContent editor={editor} />
    </div>
  )
}

export default TextEditor
