const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
  
   
    let elem = items.querySelectorAll('.item');

    elem.forEach(function(element) {
      let btn = element.getElementsByClassName("item__button")[0];
      btn.addEventListener('click', deleteItem);

      let chb = element.getElementsByClassName("item__checkbox")[0];
      chb.addEventListener('click', finish);

      let edt = element.getElementsByClassName("item__text")[0];
      edt.addEventListener('click', edit);

    });
  }

  function formHandler(e) {
    e.preventDefault();

    let texti = document.getElementsByClassName("form__input")[0].value; 
    texti = texti.trim();

    let l = texti['length'];
    // console.log(texti + "length : " + l);
    if (l > 0){
      add(texti);
      // ÞAÐ VIRKARR !!! EEEEEE

      // console.log('halló heimur ' + texti);
    }
    document.getElementsByClassName("form__input")[0].value = "";
  }


  // event handler fyrir það að klára færslu
  function finish(e) {
    // console.log("ef ytt, strika yfir");
    let blu = e.target.parentElement;
    // console.log(blu);
    if (blu.className == "item item--done"){
      blu.className = "item";
    }
    else {
      blu.className = "item item--done";
    }
    // ÞETTA VIRRRKARRR!!! 10 sek partipása

  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    //console.log("ef ytt, leyfa breytingar a faerslu " + e.target); 
    const text = e.target.textContent; 
    let fjarl = e.target.parentNode;
    let hopp = fjarl.parentNode;
    //console.log(text + " " + fjarl);
    let framam = fjarl.nextSibling;
    fjarl.parentElement.removeChild(fjarl);
    hopp.insertBefore(beta(text), framam);
    //Fyrrihelmingur virkar
    let foc = document.getElementsByClassName("item__edit")[0];
    foc.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    //console.log("ef ytt a enter, vista breytta faerslu");
    //console.log(e.target);
    let texxti = e.target.parentNode.getElementsByClassName("item__edit")[0].value;
    //console.log(texxti);

    let fjarl = e.target.parentNode;
    let hopp = fjarl.parentNode;
    //console.log(text + " " + fjarl);
    let framam = fjarl.nextSibling;
    fjarl.parentElement.removeChild(fjarl);
    hopp.insertBefore(el(texxti, "checkbox", "deleteItem"), framam);
    
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    // console.log("add value");
    items.appendChild(el(value, "checkbox", "deleteItem")); 
    
  }

  // event handler til að eyða færslu
  function deleteItem(e){
    //console.log("ef ytt a eyða, eyða faerslu");
    //console.log("e = " + e);
    let bleu = e.target.parentElement;
    //console.log(bleu);
    bleu.parentNode.removeChild(bleu);

  }
  function beta(e) {
    let inpu = document.createElement("input");
    inpu.setAttribute("class","item__checkbox");
    inpu.setAttribute("type", "checkbox");
    
    let betaaa = document.createElement("input");
    betaaa.setAttribute("class", "item__edit");
    betaaa.value = e; 

    betaaa.addEventListener('keydown', function(event) {  
      if (event.keyCode == ENTER_KEYCODE){
        commit(event);
      } 
    });
    

    let butt = document.createElement("button");
    butt.setAttribute("class","item__button");
    butt.innerHTML = "Eyða"; 
    butt.addEventListener('click', deleteItem);

    let ele = document.createElement("li");

    ele.appendChild(inpu);
    ele.appendChild(betaaa);
    ele.appendChild(butt);

    ele.setAttribute("class", "item");
    
    return ele; 
  }

  // hjálparfall til að útbúa element
  function el(value, className, clickHandler) {
    

    let inpu = document.createElement("input");
    inpu.setAttribute("class","item__checkbox");
    inpu.setAttribute("type", "checkbox");
    
    inpu.addEventListener('click', finish);
    
    let spam = document.createElement("span");
    spam.setAttribute("class", "item__text");
    spam.innerHTML = value;

    spam.addEventListener('click', edit); 
    
    let butt = document.createElement("button");
    butt.setAttribute("class","item__button");
    butt.innerHTML = "Eyða"; 
    butt.addEventListener('click', deleteItem);
    
    let ele = document.createElement("li");
    
    ele.appendChild(inpu);
    ele.appendChild(spam);
    ele.appendChild(butt);
    
    ele.setAttribute("class","item");
    
    return ele;
  }

  return {
    init: init
  }
})();

// ALLT VIRKAAR VAHÚ
