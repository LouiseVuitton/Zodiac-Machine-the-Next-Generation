/**
 * Fetches data from the api
 */
function getFiles() {
  return fetch('/api/file')
    .then(response => response.json())
    .then(files => {
      console.log("Files, I got them:", files);
      return files;
    })
    .catch(error => console.error("GETFILES:", error));
}

/**
 * Render a list of files
 */
function renderFiles(files) {
  const listItems = files.map(file => `
    <li class="list-group-item">
      <strong>${file.sign1}</strong> - ${file.userHoroscope}
      <span class="pull-right">
        <button type="button" class="btn btn-xs btn-default" onclick="handleEditFileClick(this)" data-file-id="${file._id}">Edit</button>
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteFileClick(this)" data-file-id="${file._id}">Del</button>
      </span>
    </li>`);
  const html = `<ul class="list-group">${listItems.join('')}</ul>`;

  return html;
}


/**
 * Fetch files from the API and render to the page
 */
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
    sign: $('#file-sign1').val(),
    horoscope: $('#file-userHoroscope').val(),
    compatibility: $('#file-sign2').val(),
    mood: $('#file-userMood').val(),
    color: $('#file-userColor').val(),
    number: $('#file-luckyNumber').val(),
    time: $('#file-luckyTime').val(),
  };

//   console.log("Your file data", fileData);
// };

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
  const fileId = element.getAttribute('data-file-id');

  const file = window.fileList.find(file => file._id === fileId);
  if (file) {
    $('#file-sign1').val(file.sign1),
    $('#file-userHoroscope').val(file.userHoroscope),
    $('#file-sign2').val(file.sign2),
    $('#file-userMood').val(file.userMood),
    $('#file-userColor').val(file.userColor),
    $('#file-luckyNumber').val(file.luckyNumber),
    $('#file-luckyTime').val(file.luckyTime),
    setForm(file)
  }
}


function setForm(data) {
  data = data || {};

  const file = {
    sign1: data.sign1 || '',
    horoscope: data.userHoroscope || '',
    compatibility: data.sign2 || '',
    mood: data.userMood || '',
    color: data.userColor || '',
    number: data.luckyNumber || '',
    time: data.luckyTime || '',
    _id: data._id || '',
  };

  $('#sign1').val(file.sign1);
  $('#sign2').val(file.sign2);
  $('#userHoroscope').val(file.userHoroscope);
  $('#userMood').val(file.userMood);
  $('#userColor').val(file.userColor);
  $('#luckyNumber').val(file.luckyNumber);
  $('#luckyTime').val(file.luckyTime);


  if (file._id) {
    $('#form-label').text("Edit File");
  } else {
    $('#form-label').text("Add File");
  }
}

function handleDeleteFileClick(element) {
  const fileId = element.getAttribute('data-file-id');

  if (confirm("Are you sure?")) {
    console.log("File", fileId, "is DOOMED!!!!!!");
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