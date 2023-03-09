const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let n;t.addEventListener("click",(function(){n=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.43d37d62.js.map
