import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface common{
render(data:MenuItemType[]) : React.JSX.Element
}
export interface MenuItemType{
    id: number;
    tag:string;
     label: string|JSX.Element;
      style:{};
}