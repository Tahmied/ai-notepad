const savedData = {
    "folders": [
      {
        "id": "folder-1",
        "name": "Work",
        "notes": [
          {
            "id": "note-1",
            "title": "Meeting Notes",
            "lastModified": "2025-04-09T10:00:00Z",
            "blocks": [ [
                {
                  "id": "block-1",
                  "type": "heading",
                  "level": 2,
                  "content": "My Awesome Page"
                },
                {
                  "id": "block-2",
                  "type": "paragraph",
                  "content": "This is a paragraph with some text."
                },
                {
                  "id": "block-3",
                  "type": "list",
                  "style": "bullet",
                  "items": [
                    "First item",
                    "Second item",
                    "Third item"
                  ]
                },
                {
                  "id": "block-4",
                  "type": "todo",
                  "items": [
                    { "text": "Do laundry", "checked": false },
                    { "text": "Write blog", "checked": true }
                  ]
                },
                {
                  "id": "block-5",
                  "type": "quote",
                  "content": "Creativity is intelligence having fun. - Albert Einstein"
                }
              ]
            ]
          },
          {
            "id": "note-2",
            "title": "Project Plan",
            "lastModified": "2025-04-08T15:00:00Z",
            "blocks": [ /* ... */ ]
          }
        ]
      },
      {
        "id": "folder-2",
        "name": "Personal",
        "notes": [
          {
            "id": "note-3",
            "title": "Shopping List",
            "lastModified": "2025-04-07T08:30:00Z",
            "blocks": [ /* ... */ ]
          }
        ]
      }
    ]
  }
  
  // render the folders
  // render the note list
  // render the note editor

  // rendering the folder
  // get the folder name lists from the save data object > folders array
  // create list item for each folder name and append to the parent ul in html


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

  // render the note list
  function rendferNoteList(e){
    const noteList = document.querySelector('note-list')

    // find which folder is clicked
    // find its position in the folders array
    // access the folder object and then access the notes
    // display the notes and create the dom elements
    console.log(this.innerText)
  }

  document.querySelector('.folder-list').addEventListener('click' , function renderNoteList(e){

    const noteList = document.querySelector('.notes-list')
    noteList.querySelector('.note-item').remove()

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
  

  