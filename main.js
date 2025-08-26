const detailsList = document.querySelectorAll('details');
for (const d of detailsList)
{
    d.addEventListener('toggle', handler);
}

function handler(event) {
    const d = event.currentTarget;
    if (!d.open) {
    const ps = d.querySelectorAll('.type-on-open');
    ps.forEach(p => {
        p.style.visibility = 'visible';
        if (p._timer) {
        clearInterval(p._timer);
        p._timer = null;
        }
        if (p.dataset.full) {
        p.textContent = p.dataset.full;
        }
    });
    return;
    }
    console.log('toggled', d);
    if(d.dataset.typed === '1'){return}

    const paras = d.querySelectorAll('.type-on-open');
    for (const el of paras) {
    if (!el.dataset.full) el.dataset.full = el.textContent;
    el.style.visibility = 'hidden';
    el.textContent = '';
    }
    console.log(paras.length);
    if(!paras[0]){return}

    function playNext(index) {
    if (index >= paras.length) {
        d.dataset.typed = '1';
        return;
    }
    typeOne(paras[index], () => playNext(index + 1));
    }
    playNext(0);
    }

function typeOne(el, done){
    if (!el.dataset.full) el.dataset.full = el.textContent;
    const full = el.dataset.full;
    el.textContent = '';
    let i = 0;

    el.style.visibility = 'visible';
    el._timer = setInterval(() => {
        el.textContent += full[i];
        i++;

        if (i === full.length)
        {
            clearInterval(el._timer);
            el._timer = null;
            if (done) done();
            return;
        }
    }, 20)

}
