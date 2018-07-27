//****************************** */
// FETCHING FILES
// FETCHING FILES FROM THE API
//****************************** */

function getFiles() {
  return fetch('/api/file')
    .then(response => response.json())
    .then(files => {
      console.log("Files, I got them:", files);
      return files;
    })
    .catch(error => console.error("GETFILES:", error));
}


//****************************** */
// RENDER (READING) LIST OF FILES
// file.sign1 and file.words RELATES TO THE FileSchema IN file.model.js
//****************************** */

function renderFiles(files) {
  const listItems = files.map(file => `
    <li class="list-group-item">
      <strong>${file.sign1}</strong> - ${file.words}
      <span class="pull-right">
        <button type="button" class="btn btn-xs btn-default" onclick="handleEditFileClick(this)" data-file-id="${file._id}">Edit</button>
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteFileClick(this)" data-file-id="${file._id}">Del</button>
      </span>
    </li>`);
  const html = `<ul class="list-group">${listItems.join('')}</ul>`;

  return html;
}


//****************************** */
// FETCHING FILES
// FETCHING FILES FROM THE API AND RENDERING IT ON THE PAGE
// HERE WE ALSO CREATE READ, UPDATE, AND DELETE THE USER DATA
//****************************** */

function refreshFileList() {
  getFiles()
    .then(files => {

      window.fileList = files;

      const html = renderFiles(files);
      $('#list-container').html(html);
    });
}


function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");
 
  const fileData = {
    _id: $('#id').val(),
    sign1: $('#sign1').val(),
    words: $('#userHoroscope').val(),
    compatibility: $('#sign2').val(),
    mood: $('#userMood').val(),
    color: $('#userColor').val(),
    number: $('#luckyNumber').val(),
    time: $('#luckyTime').val(),
  };

  console.log("Your file data", fileData);

  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/file/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/file';
  }
 
  fetch(url, {
    method: method,
    body: JSON.stringify(fileData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(file => {
      console.log("we have updated the data", file);
      setForm();
      refreshFileList();
    })
    .catch(err => {
      console.error("A terrible thing has happened", err);
    }) 
}

 

function cancelFileForm() {
  setForm();
}
  

function handleEditFileClick(element) {
  console.log("you are editing the file");
  const fileId = element.getAttribute('data-file-id');

  const file = window.fileList.find(file => file._id === fileId);

  if (file) {
    $('#id').val(file._id);
    $('#sign1').val(file.sign1);
    $('#userHoroscope').val(file.words);
    $('#sign2').val(file.compatibility);
    $('#userMood').val(file.mood);
    $('#userColor').val(file.color);
    $('#luckyNumber').val(file.luckyNumber);
    $('#luckyTime').val(file.luckyTimeOfDay);
    // setForm(file)
  }
}


function setForm(data) {
  data = data || {};

  const file = {
    sign1: data.sign1 || '',
    horoscope: data.words || '',
    compatibility: data.compatibility || '',
    mood: data.mood || '',
    color: data.color || '',
    number: data.luckyNumber || '',
    time: data.luckyTimeOfDay || '',
    _id: data._id || '',
  };

  $('#sign1').val(file.sign1);
  $('#sign2').val(file.compatibility);
  $('#userHoroscope').val(file.words);
  $('#userMood').val(file.mood);
  $('#userColor').val(file.color);
  $('#luckyNumber').val(file.luckyNumber);
  $('#luckyTime').val(file.luckyTimeOfDay);


  if (file._id) {
    $('#form-label').text("Edit File");
  } else {
    $('#form-label').text("Add File");
  }
}

function handleDeleteFileClick(element) {
  const fileId = element.getAttribute('data-file-id');

  if (confirm("Are you sure?")) {
    deleteFile(fileId);
  }
}

function deleteFile(fileId) {
  const url = '/api/file/' + fileId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      console.log("DOOOOOOOOOM!!!!!");
      refreshFileList();
    })
    .catch(err => {
      console.error("I'm not dead yet!", err);
    });
}