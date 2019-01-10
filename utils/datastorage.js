function getTabs(){
  return [
    {
      id: '1',
      tag: '帮我送',
    },
    {
      id: '2',
      tag: '帮我买',
    },{
      id: '3',
      tag: '帮我买3',
    }, {
      id: '4',
      tag: '帮我买4',
    }, {
      id: '5',
      tag: '帮我买5',
    }
  ]
}

function getItemsByTabId(tabId){
  // if(tabId === "1"){
    return [
      {
        name: 'item0 >' + tabId,
        tag: 'item0 >'+tabId,
        color: 'black',
        hoverColor: 'red',
        imageSrc: '../image/location.png',
        selectImageSrc: '../image/select.png'

      }, {
        name: 'item1 >' + tabId,
        tag: 'item1 >' + tabId,
        color: 'black',
        hoverColor: 'red',
        imageSrc: '../image/location.png',
        selectImageSrc: '../image/select.png'

        
      }, {
        name: 'item2 >' + tabId,
        tag: 'item2 >' + tabId,
        color: 'black',
        hoverColor: 'red',
        imageSrc: '../image/location.png',
        selectImageSrc: '../image/select.png'

      }, {
        name: 'item3 >' + tabId,
        tag: 'item3 >' + tabId,
        color: 'black',
        hoverColor: 'red',
        imageSrc: '../image/location.png',
        selectImageSrc: '../image/select.png'

      }, {
        name: 'item4 >' + tabId,
        tag: 'item4 >' + tabId,
        color: 'black',
        hoverColor: 'red',
        imageSrc: '../image/location.png',
        selectImageSrc: '../image/select.png'
      },
      
    ]
  // }
}

module.exports = {
  getItemsByTabId: getItemsByTabId,
  getTabs: getTabs
}