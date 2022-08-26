let api = 'https://gateway.marvel.com/v1/public/characters/1009150?apikey=966e57d18aad5280d7233b15161e5124&hash=73b135a14149184439d58a8c0f6e58c9&ts=1452';


function getThumbnail(api){
    fetch(api).then(resolve => resolve.json().then( resolve => {
        let bgImage = document.createElement('img');
        bgImage.src=resolve.data.results[0].thumbnail.path+'.jpg';
        document.getElementById('bgimage').appendChild(bgImage);
        bgImage.style.height = "90%";
        bgImage.style.width = "90%"
        document.getElementById('nameOfChar').innerText = resolve.data.results[0].name;
        console.log(resolve.data.results[0]);
    }))
}
let domData=[];

function showSeriesOrComcisList(api,content){
    console.log(content);
    let data1;
    let idTrav = 0;
    deleteStuff(domData);
    domData = [];
    fetch(api).then(resolve => resolve.json().then( resolve => {
        //data1 = resolve.data.results[0][content].items;
        data1 = resolve.data.results[0][content].items;
        for(let i=0;i<data1.length;i+=3){
            let val = resolve.data.results[0][content].items[i].name;
            let ele = document.createElement('li');
            let name1 = data1[i].name;
            let name2 = data1[i+1].name;
            let name3 = data1[i+2].name;
            //console.log(src);
            ele.innerHTML=`
            <div class="aven-list-item">
                <div id= style="margin-top: 1.5%; width:30%" class= "aven-details">
                    <h6>${name1}</h6>
                </div>
                
                <div style="margin-top: 1.5%; width:30%" class= "aven-details">
                  <h6>${name2}</h6>
                </div>

                <div style="margin-top: 1.5%; width:30%" class= "aven-details">
                  <h6>${name3}</h6>
                </div>
            </div>
            `
            ele.id = idTrav++;
            ele.classList.add('list-group-item');
            ele.classList.add('project-bg');
            console.log(data1[i]);
            domData.push(ele.id);
            document.getElementById('listContainer').appendChild(ele);

        }
    }))

    
}

document.addEventListener('click', function(event){
    if(event.target.id == 'comics' || event.target.id == 'events' || event.target.id == 'stories' || event.target.id == 'series'){
        showSeriesOrComcisList(api,event.target.id)
    }
})



function showComics(api){
    fetch(api).then(resolve => resolve.json().then(resolve =>{
        console.log(resolve.data.results[0].events);
    }))
}


function deleteStuff(elements){
    console.log(elements);
    for(let i=0;i<elements.length;i++){
        document.getElementById(elements[i]).remove();
    }
}
console.log("script loaded");
getThumbnail(api);

//showSeriesOrComcisList(api,'stories');

