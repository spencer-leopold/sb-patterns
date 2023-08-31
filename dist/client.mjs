import { seed, randFullName, randWord, randSentence, randParagraph, randLine } from '@ngneat/falso';
import B from 'html-react-parser';
import O from 'react';

var z=Object.defineProperty;var G=(l,t)=>{for(var e in t)z(l,e,{get:t[e],enumerable:!0});};var N={};G(N,{getNamespaces:()=>rt,getPatternConfiguration:()=>at,getRenderer:()=>st,renderPattern:()=>$,renderPatternPreview:()=>H,setNamespaces:()=>nt,setRenderer:()=>it});var V=class{constructor(t,e,i,n,r){this.enable=!0;this.name=t,this.type=e,this.label=i,this.description=n,this.preview=r;}getDescription(){return typeof this.description>"u"?"":this.description}setDescription(t){this.description=t;}isEnable(){return this.enable}setEnable(t){this.enable=t;}generateFake(t){let e="lorem.word",i={};typeof t=="string"?e=t:(t.token==null&&t.property!=null&&(e=t.property),t.token!=null&&(e=t.token),i=t.options??{});try{process.env.STORYBOOK_PATTERN_FAKER_SEED!=null&&(Number.isNaN(process.env.STORYBOOK_PATTERN_FAKER_SEED)?console.error("STORYBOOK_PATTERN_FAKER_SEED must be numeric"):seed(process.env.STORYBOOK_PATTERN_FAKER_SEED));let n={"lorem.fullName":randFullName,"lorem.word":randWord,"lorem.sentence":randSentence,"lorem.paragraph":randParagraph,"lorem.paragraphs":randParagraph,"lorem.line":randLine};if(!n[e])return `Invalid faker token: ${e}. Valid tokens are: ${Object.keys(n).join(", ")}`;let r=n[e](i);return Array.isArray(r)?r.join(" "):r}catch(n){return n instanceof Error?`Invalid faker configuration "${e}". ${n.message}`:""}}cleanString(t){let e="";for(let i=0;i<t.length;i+=1)(t.charCodeAt(i)<=127||t.charCodeAt(i)>=160&&t.charCodeAt(i)<=255)&&(e+=t.charAt(i));return e}getPreview(){if(typeof this.preview=="object")return this.preview?.faker?this.generateFake(this.preview.faker):this.type==="pattern"||this.type==="object"||this.type==="media_library"?(Array.isArray(this.preview)&&(this.preview=this.preview.map(e=>typeof e=="string"?B(this.cleanString(e)):e)),this.preview):JSON.stringify(this.preview);let t=this.preview;return typeof t=="string"&&(t=B(this.cleanString(t))),t}setPreview(t){this.preview=t;}getLabel(){return this.label}setLabel(t){this.label=t;}getName(){return this.name}setName(t){this.name=t;}getType(){return this.type}setType(t){this.type=t;}};var j=(i=>(i.items="items",i.field_items="field_items",i.single_value="single_value",i))(j||{}),S=class extends V{multiValueType(){return this.multiValue}setMultiValueType(e){this.multiValue=e;}};function D(...l){let t=e=>e&&typeof e=="object";return l.reduce((e,i)=>(Object.keys(i).forEach(n=>{let r=e[n],s=i[n];Array.isArray(r)&&Array.isArray(s)?e[n]=r.concat(...s):t(r)&&t(s)?e[n]=D(r,s):e[n]=s;}),e),{})}function _(l){return typeof l>"u"||l===null}function et(l){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];var i=Array.from(typeof l=="string"?[l]:l);i[i.length-1]=i[i.length-1].replace(/\r?\n([\t ]*)$/,"");var n=i.reduce(function(o,c){var u=c.match(/\n([\t ]+|(?!\s).)/g);return u?o.concat(u.map(function(a){var g,d;return (d=(g=a.match(/[\t ]/g))===null||g===void 0?void 0:g.length)!==null&&d!==void 0?d:0})):o},[]);if(n.length){var r=new RegExp(`
[	 ]{`+Math.min.apply(Math,n)+"}","g");i=i.map(function(o){return o.replace(r,`
`)});}i[0]=i[0].replace(/^\r?\n/,"");var s=i[0];return t.forEach(function(o,c){var u=s.match(/(?:^|\n)( *)$/),a=u?u[1]:"",g=o;typeof o=="string"&&o.includes(`
`)&&(g=String(o).split(`
`).map(function(d,A){return A===0?d:""+a+d}).join(`
`)),s+=g+i[c+1];}),s}var C=et;var E=class{constructor(t,e,i,n,r,s,o){this.renderArgs={};this.fields={};this.settings={};this.id=t,this.pattern=e,this.variant=i,this.label=r,this.use=n,this.description=s,this.configuration=o;}cleanStorybookString(t){return t.toLowerCase().replace(/ /g,"-").replace(/\//g,"-")}getUse(){return this.use?this.use:this.getPattern().getUse()}getCode(){let t={variant:""},e=this.getSettings();this.getId()!=="__default"?t.variant=this.getId():delete t.variant,Object.keys(e).forEach(o=>{let c=e[o];c.getType()!=="media_library"&&c.isEnable()&&(t[o]=c.getPreview());});let i=Object.keys(t).length===0?"":`with ${JSON.stringify(t,null,2)}`;delete t.variant;let n=Object.keys(t).length===0?"''":`${JSON.stringify(t,null,2)}`,r=[{title:"Pattern function (recommended)",code:C`
          import { pattern } from '@cmbr/sb-patterns';
          ...
          return (
            <>
              {pattern('${this.getPattern().getId()}', ${n}, '${this.getId()}')}
            </>
          );
          ...
        `},{title:"As a component",code:C`
          import { ComponentName } from '@cmbr/sb-patterns';
          TODO: Finish documenting this.
          ...
          return (
            <>
              <ComponentName ${i} />
            </>
          );
          ...
        `}],s=[];return Object.entries(r).forEach(([o,c])=>s.push(C`
       /**
        * ${c.title}:
        */
        ${c.code}
      `)),s.join(`

`)}getStoryId(){let t=this.getPattern();return this.cleanStorybookString(`${t.getNamespace()}-${t.getLabel()}--${this.getLabel()}`)}getId(){return this.id}getStorage(){return this.pattern.getStorage()}getLabel(){return this.label}getDescription(){return this.description}getPattern(){return this.pattern}setPattern(t){this.pattern=t;}getVariant(){return this.variant}setVariant(t){this.variant=t;}getFields(){return this.fields}setConfiguration(t){this.configuration=t;}getConfiguration(){return this.configuration}addField(t){this.fields[t.getName()]=t;}getField(t){return this.fields[t]}setFields(t){this.fields=t;}getSettings(){return this.settings}setSettings(t){this.settings=t;}getSetting(t){return this.settings[t]}addSetting(t){this.settings[t.getName()]=t;}handleFieldItem(t){let e=t.variant!==null?t.variant:null,i=t.fields!=null?t.fields:{},n=t.settings!=null?t.settings:{},r=Object.assign(i,n);return {patternId:t.id,variant:e,fields:i,settings:n,variables:r}}handleSubPreviewPattern(t,e){t.fields!==void 0&&Object.keys(t.fields).forEach(i=>{let n=t.fields[i];if(n!=null&&n.id!==void 0)e.children===void 0&&(e.children={}),e.children[i]=this.handleFieldItem(n),this.handleSubPreviewPattern(n,e.children[i]);else if(Array.isArray(n)){let r=0;e.children===void 0&&(e.children={}),n.forEach(s=>{s.id!==void 0&&(e.children[`${i}--${r}`]=this.handleFieldItem(s),this.handleSubPreviewPattern(s,e.children[`${i}--${r}`]),r+=1);});}});}buildPreviewPattern(t){let e=this.handleFieldItem(t);return this.handleSubPreviewPattern(t,e),e}getRenderInfo(){let t={};return Object.keys(this.fields).forEach(e=>{let i=this.fields[e],n=i.getPreview();if(i.getType()==="pattern"&&Array.isArray(n))for(let r=0;r<n.length;r+=1)t[`${e}--${r}`]=this.buildPreviewPattern(n[r]);else i.getType()==="pattern"&&n?.id&&(t[e]=this.buildPreviewPattern(n));}),Object.keys(this.settings).forEach(e=>{let i=this.settings[e],n=i.getPreview();i.getType()==="media_library"&&n?.id&&(t[e]=this.buildPreviewPattern(n));}),t}setRenderArgs(t){this.renderArgs=t,this.beforeRenderHandler!=null&&this.beforeRenderHandler(t);}getRenderArgs(){return this.renderArgs}beforeRender(t){this.beforeRenderHandler=t;}getVariables(t=!0,e=!0,i=!0){let n={variant:void 0};return this.variant!==b.DEFAULT_VARIANT_NAME&&i&&(n.variant=this.variant),t&&Object.keys(this.fields).forEach(r=>{let s=this.fields[r];s!==null&&s.getType()!=="pattern"&&(n[r]=s.getPreview());}),e&&Object.keys(this.settings).forEach(r=>{this.settings[r].getType()!=="media_library"&&(n[r]=this.settings[r].getPreview());}),n}};var R=class extends V{constructor(){super(...arguments);this.defaultValue="";this.required=!1;this.options={};}getOptions(){return this.options}setOptions(e){this.options=e;}getOptionKeyByLabel(e){let i="";return Object.keys(this.options).forEach(n=>{this.options[n]===e&&(i=n);}),i}getPreviewDisplayValue(){if(this.getType()==="select"&&this.getPreview()){let e=this.options[this.getPreview()];if(typeof e=="string")return e}return this.getPreview()}getDefaultValue(){return this.defaultValue}setDefaultValue(e){this.defaultValue=e;}isRequired(){return this.required}setRequired(e){this.required=e;}};var w=class{constructor(t,e,i){this.patternVariants={};this.id=t,this.label=e.label,this.description=e.description,this.visible=e.visible,this.storage=i,this.use=e.use,this.iconPath=e.icon_path?.replace("ws-assets://",""),this.namespace=e.namespace,this.parameters=e.parameters,this.definition=e,this.defaultVariant=new E("__default",this,w.DEFAULT_VARIANT_NAME,this.use,this.label,this.description,e.configuration),this.initializeVariants();}getComponent(){return this.storage.getComponent(this.getUse())}getUse(){return this.use}getStoryName(){return `${this.getNamespace()}/${this.getLabel()}`}getLabel(){return this.label}getIconPath(){return this.iconPath}setIconPath(t){this.iconPath=t;}getNamespace(){return this.namespace}setNamespace(t){this.namespace=t;}getDescription(){return this.description}getId(){return this.id}getDefaultVariant(){return this.defaultVariant}isVisible(t){if(this.visible==null||this.visible==="")return !0;let e=this.visible.split("|");for(let i=0;i<e.length;i+=1)if(e[i].trim()===t)return !0;return !1}getPatternVariants(){return this.patternVariants}getVariant(t=w.DEFAULT_VARIANT_NAME){let e=t===""||t==null?w.DEFAULT_VARIANT_NAME:t;if(this.patternVariants[e]==null)throw new Error(`Variant "${t}" not found in pattern "${this.getId()}". Possible Variants are: "${Object.keys(this.patternVariants).join(", ")}"`);return this.patternVariants[e]}getParameters(){return this.parameters}getStorage(){return this.storage}initializeVariants(){let t=[],e=this.definition.settings??{},i=this.definition.fields??{},n={},r=this.definition.configuration??{},s=this.definition.variants??{};Object.keys(s).forEach(c=>{t.push(c);}),t.length===0&&t.push(w.DEFAULT_VARIANT_NAME);let o=!0;t.forEach(c=>{let u={};Object.entries(e).forEach(([p,f])=>{if(f.options){let P={};Object.entries(f.options).forEach(([I,T])=>{T?.condition?.variant&&T?.condition?.variant!==c||(T.configuration?(n[p]||(n[p]={}),n[p][I]=T.configuration,P[I]=T.label):P[I]=T);}),u[p]=P;}});let a=s[c]??this.definition,g=a.label??this.label,d=a.use??this.use,A=a.description??"",v=a.configuration!=null?a.configuration:{},h=D(r,n,v),m=new E(c,this,c,d,g,A,h);o===!0&&(this.defaultVariant=m),o=!1,Object.keys(e).forEach(p=>{let f=new R(p,e[p].type,e[p].label,e[p].description??"",e[p].preview);if(f.setRequired(!!e[p].required),f.setOptions(u[p]),e[p].default_value&&f.setDefaultValue(e[p].default_value??""),e[p].default_value&&f.setPreview(e[p].default_value??null),!f.getPreview()&&e[p].required===!0&&e[p].type==="select"){let P=Object.keys(u[p]);if(P.length>0){let I=P[0];f.setPreview(I);}}m.addSetting(f);}),Object.keys(i).forEach(p=>{let f=new S(p,i[p].type,i[p].label,i[p].description||"",i[p].preview);if(f.setMultiValueType("single_value"),i[p].multi_value_type){let P=i[p].multi_value_type;f.setMultiValueType(j[P]);}else Array.isArray(i[p].preview)&&f.setMultiValueType("single_value");m.addField(f);}),a&&(a.settings&&Object.keys(a.settings).forEach(p=>{let f=m.getSetting(p),P=p;f&&!_(a.settings)?(f.setPreview(a.settings[P]),f.setEnable(!1)):console.warn(`Invalid variant configuration. Setting with ${p} doesn't exists in variant. ${m.getId()}`);}),a.fields&&Object.keys(a.fields).forEach(p=>{let f=m.getField(p),P=p;f&&!_(a.fields)?(f.setPreview(a.fields[P]),f.setEnable(!1)):console.warn(`Invalid variant configuration. Field with ${p} doesn't exists in variant. ${m.getId()}`);})),this.patternVariants[c]=m;});}},b=w;b.DEFAULT_VARIANT_NAME="__default";var F=class{renderVariant(t,e){if(!t)return O.createElement(O.Fragment,null,"Error while render variant. Variant is null.");if(!t.getPattern())return O.createElement(O.Fragment,null,"`Error while render variant. Pattern is null. [ID: $",t.getId(),"]`");if(!t.getPattern().getComponent())return O.createElement(O.Fragment,null,"`Error while rendering variant. Component not linked to pattern [ID: $",t.getPattern().getId(),", PATH: $",t.getPattern().getUse(),"]`");let i=t.getPattern().getComponent();return O.createElement(i,{...e})}};var L=Y(),M=new F,W={};function it(l){M=l;}function nt(l){W=l;}function rt(){return W}function st(){return M}function at(l,t=b.DEFAULT_VARIANT_NAME,e){return L.loadVariant(l,t).getConfiguration()[e]||""}function H(l,t={},e=b.DEFAULT_VARIANT_NAME,i={}){let n;try{n=L.loadVariant(l,e);}catch(a){return console.error(a),null}let r={...n.getRenderInfo(),...i},s={},o=[],c=0;Object.keys(r).forEach(a=>{s[c]=H(r[a].patternId,r[a].variables,r[a].variant,r[a]?.children||{}),o[c]=a,c+=1;});let u=n.getVariables();if(Object.keys(s).length!==0){let a={};Object.keys(s).map(d=>{let A=+d,v=s[A],h=o[A].split("--");if(h.length===1)a[h[0]]=v;else {let m=h[0],p=Number.parseInt(h[1],10);n.getField(m).multiValueType()==="items"?(typeof a[h[0]]>"u"&&(a[h[0]]=[]),a[h[0]][p]=v):n.getField(m).multiValueType()==="field_items"?(typeof a[h[0]]>"u"&&(a[h[0]]=[]),a[h[0]][p]={content:v}):n.getField(m).multiValueType()==="single_value"?typeof a[h[0]]>"u"?a[h[0]]=[v]:a[h[0]].push(v):a[h[0]]=`No multi value type for field: '${n.getPattern().getId()}:${m}:${n.getField(m).multiValueType()}'`;}});let g={...u,...x(t)};return Object.keys(a).forEach(d=>{g[d]!==null&&(g[d]=a[d]);}),$(l,g,e)}return $(l,{...u,...x(t)},e)}function x(l){let t=l;if(l instanceof Map){let e={};l.forEach((i,n)=>{e[n]=i;}),t=e;}return t}function $(l,t={},e=b.DEFAULT_VARIANT_NAME){try{let i=L.loadVariant(l,e),r={...i.getVariables(!1),...x(t)};return r.variant=e,i.setRenderArgs(r),M.renderVariant(i,r)}catch(i){return console.error(i),null}}var y=class{constructor(){this.components={};this.namespaces={};this.patterns={};this.definitions={};}static getInstance(){return y.instance||(y.instance=new y),y.instance}addComponent(t,e){this.components[t]=e;}getComponent(t){return this.components[t]||null}setNamespaces(t){this.namespaces=t;}getNamespaces(){return this.namespaces}getPatternIds(){return Object.keys(this.definitions)}extendPatternDefinition(t){let e=t;return t!=null&&t.extends!=null&&t.extends.length!==0&&(t.extends.forEach(i=>{let[n,r,s]=i.split(".");if(this.definitions[n]==null)throw new Error(`Base pattern "${n}" not found. Possible patterns ${Object.keys(this.definitions).join(", ")}`);let o=this.extendPatternDefinition(this.definitions[n]),c=[];r==null?(c=["fields","settings"],e.use===void 0&&(e.use=o.use)):c=[r],c.forEach(u=>{if(!s)o[u]&&(e[u]=D(o[u]||{},e[u]||{}));else if(o[u]){let a=e[u]||{},g=o[u]||{};a[s]=g[s],e[u]=a;}});}),e.extends=[]),e}loadPattern(t){if(this.patterns[t])return this.patterns[t];let e=this.extendPatternDefinition(this.definitions[t]);if(e==null)throw new Error(`Pattern definition "${t}" not found. Possible pattern ids are: "${Object.keys(this.definitions).join(" ,")}"`);return this.patterns[t]=new b(t,e,this),this.patterns[t]}loadVariant(t,e){return this.loadPattern(t).getVariant(e)}createDefinitions(t){this.definitions=t,this.patterns={};}createDefinitionsFromMultiContext(t){this.patterns={},Array.isArray(t)||(t=[t]),t.forEach(e=>{e!=null&&this.createDefinitionsFromContext(e);});}createDefinitionsFromContext(t){t.keys().forEach(e=>{if(!(e.includes("__tests__")!==!1||e.includes("__int_tests__")!==!1))try{let i=t(e);if(i.default&&(!i.wingsuit||!i.wingsuit.patternDefinition))throw new Error("No wingsuit export found");let n=i.wingsuit?i.wingsuit.patternDefinition:i;if(n!=null&&typeof n=="object"){let{parameters:r}=n,{namespace:s}=n;if(s==null){let o=e.split("/");if(o.length>2){s=o[1];let c=s.split("-");c.length>1&&c[0].length===2&&(c.shift(),s=c.join("-"),s=s.charAt(0).toUpperCase()+s.slice(1));}}Object.keys(n).forEach(o=>{r!==null&&(n[o].parameters=r),n[o].namespace==null&&(n[o].namespace=s),this.addDefinition(o,n[o]);});}}catch(i){console.error("Loading failed."),console.error(i);}});}createComponentStorageFromContext(t){t.forEach(e=>{e.keys().forEach(i=>{let r=i.replace(/\.(ts|tsx|js|jsx)$/,"").replace("./","").split("/"),s=r[0],o="";Object.keys(this.namespaces).forEach(g=>{let d=this.namespaces[g].split("/");d[d.length-1]===s&&(o=g);}),r.shift();let u=`${o.startsWith("@")?"":"@"}${o}/${r.join("/")}`,a=e(i);a.default&&this.addComponent(u,a.default);});});}addDefinition(t,e){this.definitions[t]=e,delete this.patterns[t];}addDefinitions(t){Object.keys(t).forEach(e=>{this.definitions[e]=t[e],delete this.patterns[e];});}};var ot=N,U=({patternId:l,variantId:t,variant:e,...i})=>{let n=typeof e<"u"?e?.getPattern().getId():l,r=typeof e<"u"?e?.getId():t;return n?ot.renderPatternPreview(n,i,r):null};U.displayName="PatternPreview";U.defaultProps={patternId:"",variantId:"",variant:void 0};var lt=U;var q=y.getInstance(),Ut=N;function Y(){return q}function J(l){let t=l.getOptions(),e={};return l.isRequired()===!1&&(e={"":"Empty"}),Object.keys(t).forEach(i=>{if(typeof t[i]=="object"){let n=t[i];e[i]=n.label;}else e[i]=t[i];}),e}function qt(l,t){let e;try{e=q.loadVariant(l,t);}catch{return {}}let i={};return Object.keys(e.getSettings()).forEach(n=>{let r=e.getSetting(n);r.isEnable()&&r.getType()!=="group"&&r.getType()!=="media_library"?(i[n]={name:n,type:{type:"string",required:r.isRequired()},table:{defaultValue:{summary:r.getPreview()},category:"Settings"},defaultValue:r.getDefaultValue(),description:`${r.getLabel()} ${r.getDescription()!==""?` - ${r.getDescription()}`:""}`},r.getType()==="select"||r.getType()==="radios"||r.getType()==="colorwidget"?(i[n].type.name="enum",i[n].description+=`<br>Option keys: ${Object.keys(r.getOptions()).join(", ")}`,i[n].options=Object.keys(J(r)),i[n].control={labels:J(r),type:r.getType()==="radio"?"radio":"select"}):r.getType()==="boolean"?(i[n].type.name="boolean",i[n].control={type:"boolean"}):r.getType()==="number"?(i[n].type.name="number",i[n].control={type:"number"}):(i[n].type.name="string",i[n].control={type:"text"})):i[n]={table:{disable:!0}};}),Object.keys(e.getFields()).forEach(n=>{let r=e.getField(n);r.isEnable()?(i[n]={name:n,table:{category:"Fields"},type:{required:!1},defaultValue:r.getPreview(),description:`${r.getLabel()} ${r.getDescription()!==""?` - ${r.getDescription()}`:""}`},r.getType()==="object"?(i[n].type.name="object",i[n].control={type:"object"}):r.getType()==="pattern"||r.getType()==="media_library"?(i[n].type.name="boolean",i[n].defaultValue=!0,i[n].control={type:"boolean"}):(i[n].type.name="string",i[n].control={type:"text"})):i[n]={table:{disable:!0}};}),i.patternId={table:{disable:!0}},i.variantId={table:{disable:!0}},i.variant={table:{disable:!0}},i}function Kt(l,t,e){let i;try{i=q.loadVariant(t,e);}catch{return {}}let n=i.getFields(),r={...l,...i.getVariables(!0,!0,!1)};return Object.keys(n).forEach(s=>{n[s].getType()==="pattern"&&(r[s]===!1?r[s]=null:delete r[s]);}),r}

export { b as Pattern, lt as PatternPreview, E as PatternVariant, qt as argTypes, Kt as args, Y as getStorage, Ut as renderer, q as storage };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=client.mjs.map