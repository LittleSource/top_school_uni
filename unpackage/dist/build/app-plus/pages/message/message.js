
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"grace-badge{ margin-right: 8px; }\n",],undefined,{path:"./pages/message/message.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/message/message.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      