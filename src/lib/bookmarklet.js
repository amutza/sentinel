// Generates the bookmarklet JS code. It opens a centered popup to our /checker page,
// optionally prefilling with the user's currently-selected text (likely a CA).
export function buildBookmarkletCode(baseUrl) {
  const src = `(function(){
    var s=(window.getSelection&&window.getSelection().toString())||'';
    var u='${baseUrl}/checker?ca='+encodeURIComponent(s.trim());
    var w=520,h=680;
    var l=(screen.width-w)/2,t=(screen.height-h)/2;
    window.open(u,'axiomRugCheck','width='+w+',height='+h+',left='+l+',top='+t+',resizable=yes,scrollbars=yes');
  })();`;
  // Minify whitespace
  const mini = src.replace(/\s+/g, ' ').trim();
  return `javascript:${encodeURI(mini)}`;
}