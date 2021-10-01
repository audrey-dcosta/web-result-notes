var clickHandler = (info,tab)=> {
    console.log('testing testing');
    console.log('bckgrd')
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        console.log(tabs[0].url)
        chrome.tabs.sendMessage(tabs[0].id, {
            type:'url',
            info_n: info
        });
    });
  }

function showNotes() {
    console.log('bckgrd')
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        console.log(tabs[0].url)
        chrome.tabs.sendMessage(tabs[0].id, {
            type:'show',
            tabTitle: tabs[0].title
        });
    });
}
// const toggleShow=()=>{
//     chrome.storage.sync.get('noteShown',function(data){
//         console.log(data)
//         if(data['noteShown']==false){
//             chrome.storage.sync.set({'noteShown':true})
//         }
//         else{
//             chrome.storage.sync.set({'noteShown':false})
//         }
//     })
// }

const setShow=()=>{
    chrome.storage.sync.set({'noteShown':false})
    console.log('changed')
}
chrome.contextMenus.create({
    "title": "Add Note to website",
    "contexts": ["page", "selection", "image", "link"]
  });
  
chrome.runtime.onInstalled.addListener(setShow)
chrome.contextMenus.onClicked.addListener(clickHandler);
chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'show':
            showNotes();
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});


