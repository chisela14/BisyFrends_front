"use strict";(self.webpackChunkbisyFrends=self.webpackChunkbisyFrends||[]).push([[592],{2733:(l,i,n)=>{n.d(i,{P:()=>s});var e=n(2340),u=n(8256),r=n(529);let s=(()=>{class t{constructor(o){this.http=o}getEvent(o){return this.http.get(`${e.N.apiUrl}/event/${o}`)}getUserEvents(){return this.http.get(`${e.N.apiUrl}/user/events`)}addEvent(o,a){return this.http.post(`${e.N.apiUrl}/event?group=${a}`,{event:o})}updateEvent(o){return this.http.patch(`${e.N.apiUrl}/event/${o.id}`,{event:o})}}return t.\u0275fac=function(o){return new(o||t)(u.LFG(r.eN))},t.\u0275prov=u.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},1161:(l,i,n)=>{n.d(i,{l:()=>s});var e=n(2340),u=n(8256),r=n(529);let s=(()=>{class t{constructor(o){this.http=o}getGroup(o){return this.http.get(`${e.N.apiUrl}/group/${o}`)}getGroups(){return this.http.get(`${e.N.apiUrl}/user/groups`)}}return t.\u0275fac=function(o){return new(o||t)(u.LFG(r.eN))},t.\u0275prov=u.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},1457:(l,i,n)=>{n.r(i),n.d(i,{HomeModule:()=>o});var e=n(6895),u=n(2019),r=n(3960),s=n(8256);const t=[{path:"",component:r.h}];let c=(()=>{class a{}return a.\u0275fac=function(d){return new(d||a)},a.\u0275mod=s.oAB({type:a}),a.\u0275inj=s.cJS({imports:[u.Bz.forChild(t),u.Bz]}),a})(),o=(()=>{class a{}return a.\u0275fac=function(d){return new(d||a)},a.\u0275mod=s.oAB({type:a}),a.\u0275inj=s.cJS({imports:[e.ez,c]}),a})()},3960:(l,i,n)=>{n.d(i,{h:()=>u});var e=n(8256);let u=(()=>{class r{constructor(){}ngOnInit(){}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-main-page"]],decls:14,vars:0,consts:[[1,"container","d-flex","flex-column","h-100"],[1,"row","gx-5","h-100"],[1,"d-flex","justify-content-center","mt-4"],["src","assets/logo.png","height","350","alt","Bisy Frends logo"],[1,"d-flex","justify-content-center"],[1,"text-justify"]],template:function(t,c){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.qZA(),e.TgZ(4,"div",4)(5,"h1"),e._uU(6,"\xa1Bienvenid@ a Bisy Frends!"),e.qZA()(),e.TgZ(7,"div",5)(8,"p"),e._uU(9,"A veces la vida es demasiado ajetreada y puede resultarnos dif\xedcil organizar nuestra agenda tanto a nivel personal como a nivel social."),e.qZA(),e.TgZ(10,"p"),e._uU(11,"En esta p\xe1gina web encontrar\xe1s una herramienta que puede ayudarte a gestionar tus planes o eventos, pero para poder utilizarla necesitar\xe1s crear una cuenta."),e.qZA(),e.TgZ(12,"p"),e._uU(13," Una vez tengas una cuenta podr\xe1s encontrar dos pesta\xf1as: agenda y grupos. En 'agenda' podr\xe1s ver, en un calendario con diferentes formatos, los eventos pasados, presentes y futuros que tengan una fecha decidida, mientras que en 'grupos' tendr\xe1s a tu disposici\xf3n los grupos a los que perteneces con los planes relacionados a \xe9stos; aqu\xed habr\xe1 algunos que no tengan una fecha final as\xed que aparecer\xe1n diferentes fechas para que los integrantes voten seg\xfan les vengan bien o mal. "),e.qZA()()()())},encapsulation:2}),r})()}}]);