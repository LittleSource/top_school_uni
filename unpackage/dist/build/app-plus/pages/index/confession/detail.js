
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["@-webkit-keyframes grace-fade{0% {opacity:0.6;}\n25% {opacity:1;}\n50% {opacity:0.6;}\n75% {opacity:1;}\n100% {opacity:0.6;}\n}@keyframes grace-fade{0% {opacity:0.6;}\n25% {opacity:1;}\n50% {opacity:0.6;}\n75% {opacity:1;}\n100% {opacity:0.6;}\n}.",[1],"grace-full-loading{width:100%; height:100%; background:#FFFFFF; position:fixed; z-index:99; left:0; top:0;}\n.",[1],"grace-full-loading wx-view{width:",[0,150],"; height:",[0,150],"; background:#2FBF79; position:absolute; z-index:100; left:50%; top:50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); border-radius:100%; -webkit-animation:grace-fade 3500ms infinite linear; animation:grace-fade 3500ms infinite linear; opacity:0.6; padding:",[0,10],";}\n.",[1],"grace-full-loading wx-view wx-image{width:",[0,150],"; height:",[0,150],"; border-radius:",[0,150],";}\n",],undefined,{path:"./pages/index/confession/detail.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/index/confession/detail.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      