
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"grace-comment-face { margin-left: 5px; margin-right: 5px; }\n",],undefined,{path:"./pages/common/comment.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/common/comment.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      