function setLang(lang){
localStorage.setItem('lang',lang);
document.querySelectorAll('[data-lang]').forEach(el=>{
el.style.display = el.getAttribute('data-lang')===lang?'inline':'none';
});
}

function toggleTheme(){
document.body.classList.toggle('light');
}

setLang(localStorage.getItem('lang')||'en');
