document.addEventListener('DOMContentLoaded' , async function(){
    const response = await fetch('/savedData.json')
    if(!response.ok){
      console.log(`unable to get the data`);
    }
    const savedData = await response.json()
    console.log(savedData)
    
  // render the folder list
  savedData.folders.forEach((e)=>{
    const folderList = document.querySelector('.folder-list')
    // create li
    const folderLi = document.createElement('li')
    folderLi.setAttribute('class' , 'folder-item')
    folderLi.setAttribute('id' , `${e.id}`)
    folderLi.innerText = `${e.name}`

    const noteCount = document.createElement('span')
    noteCount.setAttribute('class' , 'note-count')
    noteCount.innerText = `${e.notes.length}`
    folderLi.append(noteCount)

    folderList.append(folderLi)
  })

  // render the notelist 
  document.querySelector('.folder-list').addEventListener('click' , function renderNoteList(e){

    const noteList = document.querySelector('.notes-list')
    const presentNoteItems = noteList.querySelectorAll('.note-item')
    presentNoteItems.forEach((e)=>{
      e.remove()
    })

    const folderItem = e.target.closest('.folder-item').id
    savedData.folders.forEach((e)=> {
      if(e.id == folderItem){
        let notes = e.notes
        notes.forEach((f)=>{
          const noteItem = document.createElement('div')
          noteItem.setAttribute('class' , 'note-item')

          const noteTitle = document.createElement('div')
          noteTitle.setAttribute('class' , 'note-title')
          noteTitle.innerText = `${f.title}`
          noteItem.append(noteTitle)

          const notePreview = document.createElement('div')
          notePreview.setAttribute('class' , 'note-preview')
          notePreview.innerText = 'A note preview text for now only'
          noteItem.append(notePreview)

          const noteDate = document.createElement('div')
          noteDate.setAttribute('class' , 'note-date')
          noteDate.innerText = 'Today 10:30AM'
          noteItem.append(noteDate)

          const notelist = document.querySelector('.notes-list')
          notelist.append(noteItem)
        })
      }
    })
   
  })
})
  