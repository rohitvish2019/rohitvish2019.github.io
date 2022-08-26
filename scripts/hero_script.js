
//Basic details to create api request
let url = 'https://gateway.marvel.com/v1/public/characters/';
let id = localStorage.ID;
let contextRoot = '?apikey=966e57d18aad5280d7233b15161e5124&hash=73b135a14149184439d58a8c0f6e58c9&ts=1452'
let api = url+localStorage.ID+contextRoot;

// To get thumbnail of superhero.
function getThumbnail(api){
    fetch(api).then(resolve => resolve.json().then( resolve => {
        let bgImage = document.createElement('img');
        bgImage.src=resolve.data.results[0].thumbnail.path+'.jpg';
        document.getElementById('bgimage').appendChild(bgImage);
        bgImage.style.height = "22rem";
        bgImage.style.width = "90%"
        bgImage.style.borderRadius="1.5rem"

        document.getElementById('nameOfChar').innerText = resolve.data.results[0].name;
        let descLocal = resolve.data.results[0].description;
        if(descLocal.length < 2){
            descLocal = "Sorry, No description available for this chacarter";
        }
        document.getElementById('description').innerText = descLocal;
    }))
}
let domData=[];


// Show the details of comics, stories, series or events.

function showSeriesOrComcisList(api,content){
    let data1;
    let idTrav = 0;
    deleteStuff(domData);
    document.getElementById("no-data").style.display='none';
    domData = [];
    fetch(api).then(resolve => resolve.json().then( resolve => {
        data1 = resolve.data.results[0][content].items;
        if(data1.length < 3){
            document.getElementById("no-data").style.display='block';
        }
        for(let i=0;i<data1.length;i+=3){
            let val = resolve.data.results[0][content].items[i].name;
            let ele = document.createElement('li');
            let name1 = data1[i].name;
            let name2 = data1[i+1].name;
            let name3 = data1[i+2].name;
            ele.innerHTML=`
            <div class="aven-list-item">
                <div style="margin-top: 1.5%; width:30%" class= "aven-details">
                    <h6 style="margin-left:2%">${name1}</h6>
                </div>
                
                <div style="margin-top: 1.5%; width:30%" class= "aven-details">
                  <h6 style="margin-left:2%">${name2}</h6>
                </div>

                <div style="margin-top: 1.5%; width:30%" class= "aven-details">
                  <h6 style="margin-left:4%">${name3}</h6>
                </div>
            </div>
            `
            ele.id = idTrav++;
            ele.classList.add('list-group-item');
            ele.classList.add('project-bg');
            domData.push(ele.id);
            document.getElementById('listContainer').appendChild(ele);

        }
    }))

    
}

//Event listener for clicks.

document.addEventListener('click', function(event){
    if(event.target.id == 'comics' || event.target.id == 'events' || event.target.id == 'stories' || event.target.id == 'series'){
        showSeriesOrComcisList(api,event.target.id)
    }
})

//Clear the screen when getting details for other.

function deleteStuff(elements){
    for(let i=0;i<elements.length;i++){
        document.getElementById(elements[i]).remove();
    }
}


getThumbnail(api);
document.getElementById("no-data").style.display='none';


