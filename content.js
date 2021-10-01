const notification = document.createElement("div");
const notificationText = document.createElement('p');
notification.appendChild(notificationText);
document.body.appendChild(notification);

const modal=document.createElement('div')
modal.className='note-box'
const title=document.createElement('h1')
title.innerHTML="Add a Note"
const input=document.createElement('textarea')
input.placeholder="enter some text"
input.name="noteText"
input.id="noteText"
const button=document.createElement('button')
button.innerHTML="Add"
button.id="buttontoadd"

modal.appendChild(title)
modal.appendChild(input)
modal.appendChild(button)
document.body.appendChild(modal)

const poppup=(link)=>{
    const noteModal = document.getElementsByClassName('note-box')[0];
    var en = document.getElementsByClassName('tF2Cxc')[0]
    noteModal.style.display = 'flex';
    document.getElementById("buttontoadd").addEventListener("click",function(){
        url=link
        var txt=document.getElementById('noteText').value
        chrome.storage.sync.set({[url]:txt},function(data){
            console.log('data'); 
            noteModal.style.display = 'none';
        });

        chrome.storage.sync.get(url, function(data){
        console.log(data[url]); 
        })
        noteModal.style.display = 'none';
        
    })


}
const getdata=(key,item)=>{
    chrome.storage.sync.get('noteShown',function(data){
        if(data['noteShown']==false){
            chrome.storage.sync.set({'noteShown':true})
            chrome.storage.sync.get(key, function(data){
                if(data[key]!=undefined){
                    var tx=data[key]
                    const nText = document.createElement('p');
                    nText.className='txt'
                    nText.innerHTML = `${tx}`
                    item.style.backgroundColor="#ebebeb"
                    item.appendChild(nText)
                    console.log(data[key]); 
                }
                else{console.log('no result')}
                })
        }
        else{
                
            chrome.storage.sync.set({'noteShown':false})
            var obj = document.getElementsByClassName('txt')
            for (let ob in obj){
                item.style.backgroundColor="white"
                obj[ob].remove()
            }
        }
    })
    
}
const geturl=(tab_title)=>{
    console.log(tab_title)
    if (tab_title.includes("Google Search")){
        const nText = document.createElement('p');
        nText.className='txt'
        console.log('in here')
        var en = document.getElementsByClassName('tF2Cxc')
        for(let item of en){
            var url=item.querySelector('a').href
            getdata(url,item)
        }
    }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.type){
        case 'url':poppup(request.info_n.linkUrl)
        break;
        case 'show':geturl(request.tabTitle)
        break;
        default:sendResponse('unknown');
        break;
    }

});

