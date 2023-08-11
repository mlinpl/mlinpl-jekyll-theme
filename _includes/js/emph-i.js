function emphI(html){
    html = html.replace('i', '<span class="emph">i</span>');
    html = html.replace('I', '<span class="emph">I</span>');
    return html;
};

let toEmph = document.getElementsByClassName('emph-i');
for (let item of toEmph) {
    item.innerHTML = emphI(item.innerHTML);
};
