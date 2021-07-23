(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{14:function(e,t,i){},15:function(e,t,i){},17:function(e,t,i){"use strict";i.r(t);var n=i(1),c=i(8),a=i.n(c),s=(i(14),i(9)),r=i(2),o=i(5),l=i(3),d=(i(15),i(0)),u=function(){return Object(d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-trash-2",children:[Object(d.jsx)("polyline",{points:"3 6 5 6 21 6"}),Object(d.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}),Object(d.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),Object(d.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})};function j(e){var t="".concat(e.filter===e.value?"activeButton":""," ").concat(e.className);return Object(d.jsx)("button",{onClick:e.onClick,className:t,children:e.icon?Object(d.jsx)(u,{}):e.value})}function b(e){var t=Object(n.useState)(""),i=Object(l.a)(t,2),c=i[0],a=i[1],s=Object(n.useState)(!1),r=Object(l.a)(s,2),o=r[0],u=r[1],b=function(){c.trim()?(e.addTask(c.trim(),e.id),a("")):(a(""),u(!0))};return Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"inputDataContainer",children:[Object(d.jsx)("input",{onChange:function(e){a(e.currentTarget.value),u(!1)},onKeyPress:function(e){"Enter"===e.key&&b()},value:c,className:o?"dataInput error":"dataInput",placeholder:"What to add?"}),Object(d.jsx)(j,{value:"Add",onClick:b})]}),o&&Object(d.jsx)("div",{className:"errorMessage",children:"Field is required"})]})}var O=function(e){return Object(d.jsx)("input",{type:"checkbox",checked:e.checked,onChange:function(t){e.changeStatus(t.currentTarget.checked)},className:"checkbox"})},f=function(e){var t=function(t){return e.changeTodolistFilter(t,e.id)};return Object(d.jsxs)("div",{className:"todolistContainer",children:[Object(d.jsxs)("div",{className:"todolistHeaderWrapper",children:[Object(d.jsxs)("div",{className:"todolistHeaderContainer",children:[Object(d.jsx)("h2",{className:"todolistTitle",children:e.title}),Object(d.jsx)(j,{value:"x",className:"deleteButton",onClick:function(){return e.removeTodolist(e.id)},icon:"TrashIcon"})]}),Object(d.jsx)(b,{addTask:e.addTask,id:e.id})]}),Object(d.jsx)("ul",{className:"tasksContainer",children:e.tasks.map((function(t){return Object(d.jsxs)("li",{className:"singleTaskContainer",children:[Object(d.jsx)(O,{checked:t.isDone,changeStatus:function(i){return e.changeStatus(t.id,i,e.id)}}),Object(d.jsx)("span",{className:t.isDone?"completed":"",children:t.title}),Object(d.jsx)(j,{value:"x",onClick:function(){return e.removeTask(t.id,e.id)},className:"deleteButton",icon:"TrashIcon"})]},t.id)}))}),Object(d.jsxs)("div",{className:"filterButtonsContainer",children:[Object(d.jsx)(j,{value:"All",onClick:function(){return t("All")},filter:e.filter}),Object(d.jsx)(j,{value:"Active",onClick:function(){return t("Active")},filter:e.filter}),Object(d.jsx)(j,{value:"Completed",onClick:function(){return t("Completed")},filter:e.filter})]})]})},h=i(19),v=function(){var e,t=Object(h.a)(),i=Object(h.a)(),c=Object(n.useState)([{id:t,title:"What to Learn",filter:"All"},{id:i,title:"What to Buy",filter:"All"}]),a=Object(l.a)(c,2),u=a[0],j=a[1],b=Object(n.useState)((e={},Object(o.a)(e,t,[{id:Object(h.a)(),title:"HTML&CSS",isDone:!0},{id:Object(h.a)(),title:"JS",isDone:!0},{id:Object(h.a)(),title:"ReactJS",isDone:!1},{id:Object(h.a)(),title:"Rest API",isDone:!1},{id:Object(h.a)(),title:"GraphQL",isDone:!1}]),Object(o.a)(e,i,[{id:Object(h.a)(),title:"Beer",isDone:!0},{id:Object(h.a)(),title:"Milk",isDone:!0},{id:Object(h.a)(),title:"Cola",isDone:!1},{id:Object(h.a)(),title:"Bread",isDone:!1},{id:Object(h.a)(),title:"Smoke",isDone:!0}]),e)),O=Object(l.a)(b,2),v=O[0],m=O[1];Object(n.useEffect)((function(){var e=localStorage.getItem("todolists");if(e){var t=JSON.parse(e);j(t)}var i=localStorage.getItem("tasks");if(i){var n=JSON.parse(i);m(n)}}),[]),Object(n.useEffect)((function(){localStorage.setItem("todolists",JSON.stringify(u)),localStorage.setItem("tasks",JSON.stringify(v))}),[u,v]);var x=function(e,t){v[t]=v[t].filter((function(t){return t.id!==e})),m(Object(r.a)({},v))},k=function(e,t){var i={id:Object(h.a)(),title:e,isDone:!1};v[t]=[i].concat(Object(s.a)(v[t])),m(Object(r.a)({},v))},p=function(e,t,i){v[i]=v[i].map((function(i){return i.id===e?Object(r.a)(Object(r.a)({},i),{},{isDone:t}):i})),m(Object(r.a)({},v))},g=function(e,t){j(u.map((function(i){return i.id===t?Object(r.a)(Object(r.a)({},i),{},{filter:e}):i})))},C=function(e){j(u.filter((function(t){return t.id!==e}))),delete v[e]},N=function(e){switch(e.filter){case"Completed":return v[e.id].filter((function(e){return e.isDone}));case"Active":return v[e.id].filter((function(e){return!e.isDone}));default:return v[e.id]}},S=u.map((function(e){return Object(d.jsx)(f,{id:e.id,filter:e.filter,title:e.title,tasks:N(e),removeTask:x,changeTodolistFilter:g,addTask:k,changeStatus:p,removeTodolist:C},e.id)}));return Object(d.jsx)("div",{className:"App",children:S})};a.a.render(Object(d.jsx)(v,{}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.827151e0.chunk.js.map