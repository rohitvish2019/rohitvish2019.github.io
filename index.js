console.log("Script loaded");
var domElemnts=[];
let apiUrl = "https://gateway.marvel.com:443/v1/public/characters?apikey=966e57d18aad5280d7233b15161e5124&hash=73b135a14149184439d58a8c0f6e58c9&ts=1452"

function initializeApp(){
    loadCrousals(apiUrl);
    loadAvengersList(apiUrl);
    document.getElementById('searchButton').onclick= null;
    document.getElementById('hideAll').style.display = 'none';
    document.getElementById('listContainer').style.display = 'none';

}

function loadCrousals(apiUrl){
    fetch(apiUrl).then(resolve => resolve.json().then(resolvedData =>{
        data1 = resolvedData.data.results.slice(0,5);
        let crousalsData = resolvedData.data.results;
        let ele;
        let address;
        let name;
        
        for(let i=1;i<crousalsData.length;i++){
            ele = document.createElement('div');
            address = crousalsData[i].thumbnail.path+"."+crousalsData[i].thumbnail.extension;
            name = crousalsData[i].name;
            console.log(crousalsData[i].id);
            ele.innerHTML=`
                <div class="card" style="width: 40rem; margin-left: 25%; margin-right: 30%; height: 90%;">
                    <img class="card-img-top" src="${address}" alt="Card image cap" height="70%">
                    <div class="card-body project-bg" style="text-align: center;">
                        <h1>${name}</h1>
                        <a class="card-text" id = "${crousalsData[i].id}"><h1>Checkout</h1></a>
                    </div>
                </div>
            `;
            ele.classList.add('carousel-item');
            document.getElementById('crousals').appendChild(ele);
        
        }
        
        
    }))
}

function loadAvengersList(apiUrl){
    fetch(apiUrl).then(resolve => resolve.json().then(resolvedData =>{
        data1 = resolvedData.data.results;
        console.log(data1[2]);

        for(let i=0;i<data1.length;i++){
            ele = document.createElement('li');
            let src = data1[i].thumbnail.path+"."+data1[i].thumbnail.extension;
            let name = data1[i].name;
            let description = data1[i].description;
            //console.log(src);
            ele.innerHTML=`
            <div class="aven-list-item" id= "${data1[i].id}">
                <div style="height: 8rem; width: 13%;"  id= "${data1[i].id}">
                  <img src="${src}" height="87%" style="margin:5% ; border-radius: 1.5rem;" id= "${data1[i].id}">
                </div>
                
                <div style="margin-top: 1.5%; width:60%" class= "aven-details" id= "${data1[i].id}">
                  <h2 id= "${data1[i].id}">${name}</h2>
                  <h6 id= "${data1[i].id}">${description}</h6>
                </div>
                
                <div style=" margin-top: 1.5%;" id= "${data1[i].id}">
                  <h4 id= "${data1[i].id}">Comics : ${data1[i].comics.available}</h4>
                  <h4 id= "${data1[i].id}">Series-Movies : ${data1[i].series.available} </h4>
                  <h4 id= "${data1[i].id}">Stories : ${data1[i].stories.available}</h4>
                </div>
                <div class="fav img-white" id="${data1[i].id}img">
                  <img src= "./images/heart-solid.svg" height="50%" width="50%" class="img-red" id="${data1[i].id}img">
                </div>
            </div>
            `
            ele.id = data1[i].id;
            ele.classList.add('list-group-item');
            ele.classList.add('project-bg');
            console.log(data1[i]);
            let value = {
                'name':data1[i].name,
                'id':data1[i].id,
            }
            domElemnts.push(value);
            document.getElementById('listContainer').appendChild(ele);
        }
        let favs = JSON.parse(localStorage.getItem('data'));
        if(favs == null){
            return;
        }
        for(let i=0;i<favs.length;i++){
            document.getElementById(favs[i]).classList.remove('img-white');
            document.getElementById(favs[i]).classList.add('img-red');
        }
        
    }));
}

document.addEventListener('click', function(event){
    clickHandler(event);
})

document.getElementById('searchBox').addEventListener('keyup',function(event){
    searchHandler();
})

function addToFav(doc){
    let temp = JSON.parse(localStorage.getItem('data'));
    if(temp == null){
        localStorage.setItem('data',JSON.stringify([]));
        temp = JSON.parse(localStorage.getItem('data'));
        temp[0] = doc.id;
    }
    else{
        temp[temp.length] = doc.id;
    }
    localStorage.setItem('data', JSON.stringify(temp));
    doc.classList.remove('img-white');
    doc.classList.add('img-red');
}

function removeFromFav(doc){
    let temp = JSON.parse(localStorage.getItem('data'));
    let del = -1;
    let newTemp = [];
    let k=0;
    for(let i=0;i<temp.length;i++){
        console.log(temp[i]+"   "+doc.id);
        if(temp[i] != doc.id){
            newTemp[k++] = temp[i];
            console.log("added to newtemp "+"  "+k+" "+newTemp[k]);
        }
    }
    console.log(newTemp);
    localStorage.setItem('data',JSON.stringify(newTemp));
    doc.classList.remove('img-red');
    doc.classList.add('img-white');
}

function clickHandler(event){
    console.log(event.target.id);
    let crsl = document.getElementById('carouselExampleControls');
    let thisId = event.target.id;
    if(thisId === 'getAll'){
       crsl.style.display="none";
       document.getElementById('hideAll').style.display='inline-block';
       document.getElementById('listContainer').style.display='block';
    }

    else if(thisId === 'hideAll'){
        crsl.style.display="block";
        document.getElementById('hideAll').style.display='none';
        document.getElementById('listContainer').style.display='none';
    }

    else if(thisId.slice(thisId.length-3) == 'img'){
        let doc = document.getElementById(thisId);
        console.log(event.target.classList);
        if(doc.classList[1] == 'img-white'){
            addToFav(doc);
        }
        else if(doc.classList[1] == 'img-red'){
            removeFromFav(doc);
        }
    }
    else if(thisId == 'searchButton'){
        searchHandler();
    }
    else if(thisId == 'myfav'){
        getMyFav();
    }

    else{
        for(let i=0;i<domElemnts.length;i++){
            if(domElemnts[i].id == thisId){
                redirectToHeroPage(thisId);
                return;
            }
        }
    }
}

function redirectToHeroPage(thisId){
    window.location.href = './hero.html'
    localStorage.setItem('ID',thisId);
}

function searchHandler(){
    document.getElementById('carouselExampleControls').style.display = 'none';
    document.getElementById('home-bg').style.display='none';
    document.getElementById('listContainer').style.display='block';
    let pattern = document.getElementById('searchBox').value.toLowerCase();
    for(let i=0;i<domElemnts.length;i++){
        if(domElemnts[i].name.toLowerCase().search(pattern) != -1){
            document.getElementById(domElemnts[i].id).style.display='block';
        }
        else{
            document.getElementById(domElemnts[i].id).style.display='none';
        }
    }
}


function getMyFav(){
    document.getElementById('carouselExampleControls').style.display = 'none';
    document.getElementById('home-bg').style.display='none';
    document.getElementById('listContainer').style.display='block';
    for(let i=0;i<domElemnts.length;i++){
        let ele = document.getElementById(domElemnts[i].id+"img");
        if(ele.classList[1] == 'img-red'){
            console.log("add me");
            document.getElementById(domElemnts[i].id).style.display='block';
        }
        else{
            console.log("remove me");
            document.getElementById(domElemnts[i].id).style.display='none';
        }
    }
}

function showLocal(){
    console.log(domElemnts.length);
    for(let i=0;i<domElemnts.length;i++){
        console.log(domElemnts[i]);
    }
}
initializeApp();


