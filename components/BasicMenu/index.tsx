import React from 'react'
import { IconButton, Menu, MenuItem, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { MenuItemType } from './classes/type';




interface MenuItem {
    type: 'HEADINGS' | 'SUB-HEADINGS' | 'MEDIA' | 'OTHER';
    items: MenuItemType[]
}
const menuItems: MenuItem[] = [
    {
        type: 'HEADINGS',
        items: [
            { id: 1, label: 'H1 Heading', style: { fontSize: '2em', fontWeight: 'bolder' },tag:'h1' },
            { id: 2, label: 'H2 Heading', style: { fontSize: '1.5em', fontWeight: 'bolder' },tag:'h2' },
            { id: 3, label: 'H3 Heading', style: { fontSize: '1.17em', fontWeight: 'bolder' },tag:'h3' },
            { id: 4, label: 'H4 Heading', style: { fontSize: '1em', fontWeight: 'bolder' },tag:'h4' },
            { id: 5, label: 'H5 Heading', style: { fontSize: '.83em', fontWeight: 'bolder' },tag:"h5" },
        ]
    },
    {
        type: 'SUB-HEADINGS',
        items: [
            { id: 6, label: 'SH1 Subheading', style: { fontSize: "1.3em", fontWeight: "400" },tag:"p" },
            { id: 7, label: 'SH2 Subheading', style: { fontSize: "1em", fontWeight: "300" },tag:"p" },
            { id: 8, label: 'SH3 Subheading', style: { fontSize: ".75em", fontWeight: "200" },tag:"p" },

        ]
    },
    {
        type: 'MEDIA',
        items: [
            { id: 9, label: <InsertPhotoIcon />, style: { },tag:"img" },
            { id: 10, label: <InsertPhotoIcon />, style: {  },tag:"video" }

        ]
    },
    {
        type: 'OTHER',
        items: [
            { id: 10, label: <InsertPhotoIcon />, style: {  },tag:"code" },
            { id: 11, label: <InsertPhotoIcon />, style: { },tag:"" }

        ]
    }
]

export interface BasicMenuProp {
    onClick(item: MenuItemType): void;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
    handleImageUpload: (detail:MenuItemType,images: FileList | null) => void
}
export default function BasicMenu({ onClick, Icon, handleImageUpload }: BasicMenuProp) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const showDropdown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleItemClick(item: MenuItemType) {
        onClick(item)
        handleClose()
    }
    return (
        <div>
            <IconButton
                onClick={showDropdown}
            >
                <Icon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuItems.map((item, index) => {
                    const additinalStyle = (item.type == 'MEDIA' || item.type == 'OTHER')?{border: '2px solid red', borderRadius: '50%'}:null;
                    return <div>
                        {(index !== 0) && <div>....</div>}
                        {item.type}

                        <div style={{ display: (item.type == 'MEDIA' || item.type == 'OTHER') ? 'flex' : 'block' }}>
                            
                            {item.items.map((item) => {
                                if (item.id == 9) {
                                    return <MenuItem sx={{...item.style,...additinalStyle}} >
                                        <input type="file" id="fileInput" onChange={(e) => { handleImageUpload(item,e.target.files) }} style={{ display: 'none' }} />
                                        <label
                                            htmlFor="fileInput">
                                            {item.label}
                                        </label>
                                    </MenuItem>
                                }
                                return <MenuItem sx={{...item.style,...additinalStyle}}  onClick={() => handleItemClick(item)}> {item.label}</MenuItem>
                            })}
                        </div>
                    </div>
                }
                )}
            </Menu>
        </div>
    )
}
