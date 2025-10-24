const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let patched = [];
files.forEach(f => {
  const p = path.join('.', f);
  let t = fs.readFileSync(p, 'utf8');
  if ((/class=["']?dropdown["']?/i.test(t) || /dropdown-toggle/i.test(t)) && !/dropdown-nav\.js/.test(t)) {
    t = t.replace(/<\/body>/i, '    <script src="assets/js/dropdown-nav.js"></script>\n</body>');
    fs.writeFileSync(p, t, 'utf8');
    patched.push(f);
  }
});
console.log('Patched files:', patched.length);
patched.forEach(f => console.log(f));
