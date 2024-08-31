import { useMemo } from "react";
import { generateHTML, generateJSON } from "@tiptap/html";
import Paragraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import BlockQuote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";
import OrderList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold"; // Ajoutez cette ligne
import HardBreak from "@tiptap/extension-hard-break"; // Ajoutez cette ligne*/
// the Tiptap schema API
import { Node } from '@tiptap/core'
import {type JSONContent } from "novel";


/*const Document = Node.create({
  name: 'doc',
  topNode: true,
  content: 'block+',
})

const Paragraph=  Node.create({
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM: () => ['p', 0],
})

const Text = Node.create({
  name: 'text',
  group: 'inline',
})

const Heading = Node.create({
  name: 'heading',
  group: 'inline',
})


const ListItem = Node.create({
  name: 'list-item',
  group: 'inline',
})

const Underline = Node.create({
  name: 'underline',
  group: 'inline',
})

const BulletList = Node.create({
  name: 'bullet-list',
  group: 'inline',
})

const Code = Node.create({
  name: 'code',
  group: 'inline',
})

const BlockQuote = Node.create({
  name: 'block-quote',
  group: 'inline',
})

const Link = Node.create({
  name: 'link',
  group: 'inline',
})

const CodeBlock = Node.create({
  name: 'codeblock',
  group: 'inline',
})


const TextStyle = Node.create({
  name: 'text-style',
  group: 'inline',

})*/



export function RenderArticle(json : {json : JSONContent}) {
  const outPut = useMemo(() => {
    return generateHTML( json , [
      Document,
      Paragraph,
      Text,
      Link,
      Underline,
      Heading,
      ListItem,
      BulletList,
      Code,
      BlockQuote,
      TextStyle,
      CodeBlock,
      OrderList,
      Bold, // Ajoutez cette ligne
      HardBreak, // Ajoutez cette ligne*/
    ])
}, [json]) ;

  return (
    <div
      className=" m-auto w-11/12 prose sm:prose-lg dark:prose-invert sm:w-2/3 prose-li:marker:text-primary"
      dangerouslySetInnerHTML={{ __html: outPut }}
    />
  );
}