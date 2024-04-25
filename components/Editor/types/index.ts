export interface renderableItemType{
    tag:string;
    id:number;
    atributes:[];
    content:string;

}
export   type ElementClickFnType = (arg:EventTarget & HTMLElement)=> void
export interface renderable{
    renderElement(item:renderableItemType,handleClick:ElementClickFnType) : React.JSX.Element
}