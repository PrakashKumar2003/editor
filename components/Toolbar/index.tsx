import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import BasicMenu from '../BasicMenu';
import { MenuItemType } from '../BasicMenu/classes/type';

export interface ToolbarItem {
    label: string;
    commandName: string;
    commandValue?: string;
    options?: any
}

export interface TagName {
    tag: string;
    label: string;
    type: string;
}

export interface ToolbarProp {
    onClick: (item: MenuItemType) => void;
    onAdd: (detail:MenuItemType, content?: File) => void;
}
export default function Toolbar({ onClick, onAdd }: ToolbarProp) {

    function handleAddEditor(detail: MenuItemType) {
        onAdd(detail)
    }
    function handleToolbarClick(item: MenuItemType) {
        onClick(item)
    }
    function addImage(detail:MenuItemType,files: FileList | null) {
        if (files) {
            let filesArr = Array.from(files)
            onAdd(detail, filesArr[0])
        }
    }
    return (
        <div style={{ marginTop: '10px' }}>

            <BasicMenu
                handleImageUpload={() => { }}
                Icon={MoreVertIcon}
                onClick={handleToolbarClick}
            />

            <BasicMenu
                handleImageUpload={addImage}
                Icon={AddIcon}
                onClick={handleAddEditor}
            />
        </div>
    )
}
