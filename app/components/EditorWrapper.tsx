"use client";

import { EditorCommand, EditorCommandEmpty, EditorCommandItem, EditorCommandList, EditorContent, EditorRoot } from "novel";
import { JSONContent } from "novel";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./SlashCommand";
import { handleCommandNavigation } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";

interface EditorProps{
  initialValue? : JSONContent
  onChange : (value : JSONContent) => void
}

const extensions = [...defaultExtensions, slashCommand]

const TailwindEditor = ({initialValue, onChange} : EditorProps) => {
  return (
    <EditorRoot>
      <EditorContent
      className="border p-4 rounded-lg min-h-64"
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event ) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>  handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          }
      }}
        immediatelyRender={false}
        initialContent={initialValue }
        extensions={extensions}
        onUpdate={({ editor } : JSONContent) => {
          const json = editor.getJSON();
          onChange(json)
        }}
      >
       <EditorCommand className='z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
    <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
<EditorCommandList>
    {suggestionItems.map((item) => (
      <EditorCommandItem
        value={item.title}
        onCommand={(val) => item.command?.(val)}
        className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
        key={item.title}>
        <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
          {item.icon}
        </div>
        <div>
          <div className='font-medium'>{item.title}</div>
          <div className='text-xs text-muted-foreground'>{item.description}</div>
          </div>
      </EditorCommandItem>
    ))}
</EditorCommandList>
  </EditorCommand>
  </EditorContent>
    </EditorRoot>
  );
};
export default TailwindEditor;
