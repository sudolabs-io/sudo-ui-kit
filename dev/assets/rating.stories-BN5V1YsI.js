import{r,R as l}from"./index-CtvPRVHf.js";import{c as b}from"./createLucideIcon-B43J2gWc.js";/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],f=b("Star",V),v=({fullIcon:s=l.createElement(f,{className:"text-foreground",fill:"currentColor"}),emptyIcon:u=l.createElement(f,{className:"text-foreground"}),initialRating:c=0,onHover:a,onChange:n})=>{const[t,d]=r.useState(0),[i,S]=r.useState(c),m=e=>{d(e)},p=()=>{d(0)},x=e=>{S(e)};return r.useEffect(()=>{a==null||a(t)},[t,a]),r.useEffect(()=>{n==null||n(i)},[i,n]),l.createElement("div",null,Array.from({length:5},(e,N)=>N+1).map(e=>l.createElement("button",{type:"button",key:e,onMouseOver:()=>m(e),onFocus:()=>m(e),onMouseOut:p,onBlur:p,onClick:()=>x(e)},t>=e||i>=e?s:u)))};v.__docgenInfo={description:"",methods:[],displayName:"Rating",props:{fullIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:'<Star className="text-foreground" fill="currentColor" />',computed:!1}},emptyIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:'<Star className="text-foreground" />',computed:!1}},initialRating:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onHover:{required:!1,tsType:{name:"signature",type:"function",raw:"(rating: number) => void",signature:{arguments:[{type:{name:"number"},name:"rating"}],return:{name:"void"}}},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(rating: number) => void",signature:{arguments:[{type:{name:"number"},name:"rating"}],return:{name:"void"}}},description:""}}};const E=({initialRating:s})=>{const[u,c]=r.useState(null),[a,n]=r.useState(null);return React.createElement(React.Fragment,null,React.createElement(v,{initialRating:s,onHover:t=>c(t),onChange:t=>n(t)}),React.createElement("p",null,"Hover value: ",u),React.createElement("p",null,"Fixed value: ",a))},o={render:s=>React.createElement(E,{...s}),args:{initialRating:3},argTypes:{initialRating:{type:"number",defaultValue:1}}},h={title:"Components/Rating/Rating",component:E};var g,R,y;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <RatingStory {...args} />,
  args: {
    initialRating: 3
  },
  argTypes: {
    initialRating: {
      type: 'number',
      defaultValue: 1
    }
  }
}`,...(y=(R=o.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};const q=["Default"];export{o as Default,q as __namedExportsOrder,h as default};
