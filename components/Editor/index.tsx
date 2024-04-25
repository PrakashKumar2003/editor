'use client'
import React, { useState } from 'react'
import Toolbar from '../Toolbar'
import { EditorType } from '@/app/editor/page';
import DynamicElement from '../DynamicElement/page';
import { MenuItemType } from '../BasicMenu/classes/type';

interface EditorProps {
  data: EditorType;
  index: number;
  onAdd: (tag: string, index: number, style: {}, content?: File) => void;
  onUpdate: (selectedElement: null | EventTarget & HTMLElement, detail: MenuItemType, index: number) => void;
  removeEditor: (id: number) => void;

}
export default function Editor({ data, index, onAdd, onUpdate, removeEditor }: EditorProps) {
  const [showToolbar, setShowToolbar] = useState<'hidden' | 'visible'>('hidden');
  const [selectedElement, setSelectedElemenat] = useState<null | EventTarget & HTMLElement>(null);

  function handleElementClick(element: EventTarget & HTMLElement) {
    setSelectedElemenat(element)
  }
  function handleUpdateEditor(item: MenuItemType) {
    onUpdate(selectedElement, item, index)
  }

  function handleAddEditor(detail: MenuItemType, content?: File
  ) {

    onAdd(detail.tag, index, detail.style, content);
    setShowToolbar('hidden');
  }
  return (
    <div
      style={{ display: 'flex' }}
      onMouseOver={() => setShowToolbar('visible')}
      onMouseOut={() => setShowToolbar('hidden')}
    >
      <div
        style={{ visibility: showToolbar }}
      >
        <Toolbar
          onClick={handleUpdateEditor}
          onAdd={handleAddEditor}
        />
      </div>
      <div
        style={{ width: "100%" }}
        onKeyDown={(e) => {
          if (e.key == 'Backspace' &&
            selectedElement?.innerText.length != undefined &&
            selectedElement?.innerText.length <= 1 &&
            data.elements.length <= 1) {    
            removeEditor(data.id)
          }
        }
        }
      >
        {data.elements.map((item) => <DynamicElement
          item={item}
          onClickFn={handleElementClick}
        />)}
      </div>
    </div>
  )
}
