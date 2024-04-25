'use client'
import React, { useState } from 'react'
import Editor from '../../../components/Editor'
import { MenuItemType } from '../../../components/BasicMenu/classes/type';


const getEditorID = ((init) => () => init++)(1);
const getEdtitorItemId = ((init) => () => init++)(100);

export interface ElementType {
  id: number;
  content: string | File;
  tag: string;
  atributes: {}
}
export interface EditorType {
  id: number;
  elements: ElementType[]
}
export default function page() {

  const [data, setData] = useState<EditorType[]>([{
    id: getEditorID(),
    elements: [
      {
        id: getEdtitorItemId(),
        content: 'write your story here..',
        tag: 'h2',
        atributes: {
          style: { outline: 'none' },
          contentEditable: true
        }
      }
    ],
  }])


  function addEditor(tag: string, index: number, style: {}, content?: File) {

    data.splice(index + 1, 0, {
      id: getEditorID(),
      elements: [{
        id: getEdtitorItemId(),
        content: content || "",
        tag: tag,
        atributes: {
          style: { ...style, outline: 'none' },
          contentEditable: true,
        }
      }]
    })
    setData([...data,]);
  }

  function updateEdiotor(selectedElement: null | EventTarget & HTMLElement, detail: MenuItemType, index: number) {
    const text = selectedElement?.innerText?.split('');
    const newLine = Boolean(text && text[text.length - 2] == "\n")
   
    if (newLine) {
      data[index].elements.push({
        id: getEdtitorItemId(),
        content: " ",
        tag: detail.tag,
        atributes: {
          style: { ...detail.style, outline: 'none' },
          contentEditable: true,
        }
      })
    }


    data[index].elements = data[index].elements.map((item) => {
      if (text && selectedElement && item.id === Number(selectedElement.id)) {
        if(newLine){
          text.pop()
          return {...item,content:text.join('')}
        }
        return { ...item, tag:detail.tag, content:text.join(''), atributes: { ...item.atributes, style: detail.style } }
      }
      return item
    })

    setData([...data])

  }

  function removeAditor(id: number) {
    setData(data.filter((item) => item.id !== id))
  }

  return (
    <div>
      {data.map((item, index) => <Editor
        key={item.id}
        data={item}
        index={index}
        onAdd={addEditor}
        onUpdate={updateEdiotor}
        removeEditor={removeAditor}
      />
      )

      }
    </div>
  )
}
