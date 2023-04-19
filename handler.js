let bigarray = [];
let postindex = null;

boot();

function boot() {
    const pi = localStorage.getItem("postindex");
    if (pi > 0){
        postindex = pi;
        loadStageone();
    } else {
        postindex = 0;
        loadStageone();
    }
}

function loadStageone(){
    setTimeout(() => {
        if(postindex == 0){
            document.querySelectorAll(".loadanim").forEach(element=>{
                element.remove();
            });
            document.querySelectorAll(".loadingthing").forEach(element=>{
                element.append(document.createTextNode("Nieko nėra!"));
            });
        }
        else {
            for(let x = 0; x <= postindex; x++){
                var temp = localStorage.getItem(x);
                var parsed = JSON.parse(temp);
                bigarray.push(parsed);
            }
            loadStagetwo();
        }
    }, 310);
}

function loadStagetwo() {
    const full = document.querySelectorAll(".putter");
    const smol = document.querySelectorAll(".smolputter");
    for(let x = 0; x <= bigarray.length; x++){
        var name = correctchecker(bigarray,x,'name');
        var mail = correctchecker(bigarray,x,'mail');
        var text = correctchecker(bigarray,x,'text');
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var i = document.createElement("i");
        var p = document.createElement("p");
        correctappender(h3,name);
        correctappender(i,mail);
        correctappender(p,text);
        div.appendChild(h3);
        div.appendChild(i);
        div.appendChild(p);
        div.classList.add("post")
        full.forEach(element=>{
            element.appendChild(div);
        });
        document.querySelectorAll(".putter").forEach(element=>{
            element.classList.remove("centerall");
            element.classList.remove("center");
        });
        document.querySelectorAll(".loadanim").forEach(element=>{
            element.remove();
        });
    }
    smol.forEach(element=>{
        if(bigarray.length - 1 == 1) {
            element.appendChild(document.createTextNode(`Šiandien buvo įkeltas ${bigarray.length - 1} naujas dalykas!`))
        } else {
            element.appendChild(document.createTextNode(`Šiandien buvo įkelti ${bigarray.length - 1} nauji dalykai!`))
        }
        
    });
}

function correctchecker(arr,x,na){
    if (arr[x] === null || arr[x] === undefined) {
        return "";
    } else {
        if (arr[x][na] === null && arr[x][na] === undefined) {
            return "";
        } else {
            return document.createTextNode(arr[x][na]);
        } 
    }
}

function correctappender(el,na){
    if (na == "") {
        return "";
    } else {
        el.appendChild(na);
    }
}

function readsandwroots(){
    const form = document.querySelector("form");
    const nope = document.querySelector(".nope");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    const textsent = document.createTextNode("Sėkmingai išsiųsta! Tinklalapis netrukus bus atnaujintas..");
    const textnope = document.createTextNode("Prašome užpildyti visus langus taisyklingai.");
    var name = document.querySelector(".datext").value;
    var mail = document.querySelector(".damail").value;
    var text = document.querySelector(".dabigtext").value;
    if (name == "" || mailtestas(mail) == false || text == "") {
        nope.innerHTML = '';
        p2.appendChild(textnope);
        nope.appendChild(p2);
        for (var x = 1; x <= 3; x++){
            switch(x) {
                case 1:
                    if (name == ""){
                        document.querySelector(".datext").classList.add("blogai");
                        break;
                    } else {
                        document.querySelector(".datext").classList.remove("blogai");
                        break;
                    }
                case 2:
                    if (mailtestas(mail) == false){
                        document.querySelector(".damail").classList.add("blogai");
                        break;
                    } else {
                        document.querySelector(".damail").classList.remove("blogai");
                        break;
                    }
                case 3:
                    if (text == ""){
                        document.querySelector(".dabigtext").classList.add("blogai");
                        break;
                    } else {
                        document.querySelector(".dabigtext").classList.remove("blogai");
                        break;
                    }
            }
        }
    } else {
        var obj = {name: name, mail: mail, text: text}
        var objstring = JSON.stringify(obj);
        postindex++;
        localStorage.setItem("postindex", postindex);
        localStorage.setItem(postindex, objstring);
        form.innerHTML = '';
        p.appendChild(textsent);
        p.classList.add("pavyko");
        form.appendChild(p);
        form.classList.add("centerall");
        setTimeout(() => {
            window.location.href = "main.html";
        }, 2000);
    }
}

function mailtestas(input) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.match(mailformat)){
        return true;
    } else {
        return false;
    }
}

function remove() {
    localStorage.clear();
    location.reload();
}