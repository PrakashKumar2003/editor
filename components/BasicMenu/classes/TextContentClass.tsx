import { JSX } from "react";
import {  MenuItemType, common } from "./type";
import { MenuItem } from "@mui/material";


export default class TextContentClass implements common {
    render(data: MenuItemType[]): JSX.Element {
        
           return <div>
        {data.map((item) =><MenuItem sx={item.style}> {item.label}</MenuItem>)}
            </div>
        }
    }
 export function renderMenuItem(data: MenuItemType[],style:{}): JSX.Element{
    return <div style={style}>
    {data.map((item) =><MenuItem sx={item.style}> {item.label}</MenuItem>)}
        </div>
    }
 