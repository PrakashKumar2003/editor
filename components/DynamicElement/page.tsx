import { ElementType } from '@/app/editor/page'
import React, { createElement } from 'react'

export default function DynamicElement({item,
    onClickFn
    
}:{
    item:ElementType,
    onClickFn:(element:EventTarget & HTMLElement) => void,
}) {
    let element = createElement(
        item.tag,
        {
          onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => onClickFn(e.currentTarget),
          id: item.id,
          ...item.atributes,
        },
      (typeof item.content=='string')?  item.content:"") ;
        if(item.tag === 'img'&& typeof item.content !=='string'){
          element = createElement(
            'div',
            {
              onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => onClickFn(e.currentTarget),
              id: item.id,
              ...item.atributes,
            },
            createElement('img' ,{src:URL.createObjectURL(item.content)},null)) ;
        }

  return (
    <>
    {element}
    </>
  )
}
