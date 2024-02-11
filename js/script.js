let editIndex = -1;

let songDataList = [
  {
    song: "Mazhai Kuruvi",
    album: "Chekka Chivantha Vaanam",
    artist: "A.R.Rahman",
    genre: "Melody",
    lyricist: "Vairamuthu",
    dor: "2018-09-08",
    url: "../Asset/image12.jpg",
    sUrl: "../Asset/Mazhai-Kuruvi-MassTamilan.com.mp3",
  },
  {
    song: "Azhagiye",
    album: "Kaatru Veliyidai",
    artist: "A.R.Rahman",
    genre: "Melody",
    lyricist: "Vairamuthu",
    dor: "2015-07-13",
    url: "../Asset/image5.jpg",
    sUrl: "../Asset/Azhagiye.mp3",
  },
  {
    song: "Newyork Nagaram",
    album: "Sillunu Oru Kaadhal",
    artist: "A.R.Rahman",
    genre: "Melody",
    lyricist: "Valli",
    dor: "2007-02-24",
    url: "../Asset/image9.jpg",
    sUrl: "../Asset/New-York-Nagaram.mp3",
  },
  
];

readData(songDataList);

// submitData function
function submitData() {
  inputFocus();

  let song = document.getElementById("song").value;
  let album = document.getElementById("album").value;
  let artist = document.getElementById("artist").value;
  let genre = document.getElementById("genre").value;
  let lyricist = document.getElementById("lyricist").value;
  let dor = document.getElementById("dor").value;

  // url loader
  let url = document.getElementById("thumb").value;
  let aUrl = document.getElementById("aud").value;

  console.log(url);
  let s = url.split(`\\`);
  // ['c:','fakepath','img.jpg']
  let finalUrl = "../Asset/";
  finalUrl = finalUrl.concat(s[s.length - 1]);

  s = aUrl.split(`\\`);

  let songUrl = "../Asset/";
  songUrl = songUrl.concat(s[s.length - 1]);

  let songData = {
    song: song,
    album: album,
    artist: artist,
    genre: genre,
    lyricist: lyricist,
    dor: dor,
    url: finalUrl,
    sUrl: songUrl,
  };

  if (
    song != "" &&
    album != "" &&
    artist != "" &&
    genre != "" &&
    lyricist != "" &&
    dor != "" &&
    url != "" &&
    aUrl != ""
  ) {
    if (editIndex == -1) {
      songDataList.push(songData);
    } else {
      songDataList[editIndex] = songData;
    }
    defaultColor();
  }

  document.getElementById("song").value = "";
  document.getElementById("album").value = "";
  document.getElementById("artist").value = "";
  document.getElementById("genre").value = "Select Genre";
  document.getElementById("lyricist").value = "";
  document.getElementById("dor").value = "";
  document.getElementById("thumb").value = "";
  document.getElementById("aud").value = "";

  readData(songDataList);

  // console.log(songDataList)

  editIndex = -1;
}

// readData function
function readData(list) {
  if (list.length == 0) {
    // console.log("inside if", list.length)
    document.getElementById("empty").innerHTML = "Song List is Empty";
    document.getElementById("empty").style.display = "block";
  } else {
    document.getElementById("empty").innerHTML = "";
    document.getElementById("empty").style.display = "none";
    // console.log(list.length)
  }
  document.getElementById("songlist").innerHTML = list
    .map(
      (song, index) =>
        `
                <div class="col mb-4">
                <div class="card">
                    <img src="${
                      song.url
                    }" class="card-img-top object-fit-cover" alt="." height="330px">
                    <div class="card-body">
                        <div class="row row-cols-2 mb-2">
                            <div class="col">
                                <h6 class="card-title fw-bold">SONG</h6>
                                <p class="lead fs-6">${song.song}</p>
                            </div>
                            <div class="col">
                                <h6 class="card-title fw-bold">ALBUM</h6>
                                <p class="lead fs-6">${song.album}</p>
                            </div>
                            <div class="col"> 
                                <h6 class="card-title fw-bold">ARTIST</h6>
                                <p class="lead fs-6">${song.artist}</p>
                            </div>
                            <div class="col">
                                <h6 class="card-title fw-bold">LYRICIST</h6>
                                <p class="lead fs-6">${song.lyricist}</p>
                            </div>
                            <div class="col">
                                <h6 class="card-title fw-bold">GENRE</h6>
                                <p class="lead fs-6">${song.genre}</p>
                            </div>
                            <div class="col">
                                <h6 class="card-title fw-bold">DATE OF RELEASE</h6>
                                <p class="lead fs-6">${song.dor
                                  .toString()
                                  .split("-")
                                  .reverse()
                                  .join("-")}</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <audio class="songf" src="${
                              song.sUrl
                            }" controls onplay="pauseOthers(event)"></audio>
                        </div>
                        <div class="d-flex justify-content-around">
                            <button class="btn btn-success rounded-1 w-25" type="button" onclick="editData(${index})">Edit</button>
                            <button class="btn btn-danger rounded-1 w-25" type="button" onclick="deleteData(${index})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            `
    )
    .join("");
}

// editData function
function editData(i) {
  editIndex = i;
  document.getElementById("song").value = songDataList[editIndex].song;
  document.getElementById("album").value = songDataList[editIndex].album;
  document.getElementById("artist").value = songDataList[editIndex].artist;
  document.getElementById("genre").value = songDataList[editIndex].genre;
  document.getElementById("lyricist").value = songDataList[editIndex].lyricist;
  document.getElementById("dor").value = songDataList[editIndex].dor;
  // document.getElementById('thumb').value = songDataList[editIndex].url this can't be used because
  // in file input type the value property is read-only. But we can write empty string value
  console.log(songDataList[editIndex].url);
}

// deleteData function
function deleteData(i) {
  songDataList.splice(i, 1);
  readData(songDataList);
}

// searchSong function
function searchSong(event) {
  // console.log(event.target.value)
  let result = songDataList.filter((data) =>
    data.song.includes(event.target.value)
  );
  // console.log(result)
  readData(result);
}

// inputFocus function
function inputFocus() {
  let song = document.getElementById("song").value;
  let album = document.getElementById("album").value;
  let artist = document.getElementById("artist").value;
  let genre = document.getElementById("genre").value;
  let lyricist = document.getElementById("lyricist").value;
  let dor = document.getElementById("dor").value.toString();
  let url = document.getElementById("thumb").value;
  let aud = document.getElementById("aud").value;

  if (song != "") {
    document.getElementById("song").style.borderColor = "green";
    document.getElementById("song").style.borderWidth = "2px";
  } else {
    document.getElementById("song").style.borderColor = "red";
    document.getElementById("song").style.borderWidth = "2px";
  }

  if (album != "") {
    document.getElementById("album").style.borderColor = "green";
    document.getElementById("album").style.borderWidth = "2px";
  } else {
    document.getElementById("album").style.borderColor = "red";
    document.getElementById("album").style.borderWidth = "2px";
  }

  if (artist != "") {
    document.getElementById("artist").style.borderColor = "green";
    document.getElementById("artist").style.borderWidth = "2px";
  } else {
    document.getElementById("artist").style.borderColor = "red";
    document.getElementById("artist").style.borderWidth = "2px";
  }

  if (genre == "" || genre == "Select Genre") {
    document.getElementById("genre").style.borderColor = "red";
    document.getElementById("genre").style.borderWidth = "2px";
  } else {
    document.getElementById("genre").style.borderColor = "green";
    document.getElementById("genre").style.borderWidth = "2px";
  }

  if (lyricist != "") {
    document.getElementById("lyricist").style.borderColor = "green";
    document.getElementById("lyricist").style.borderWidth = "2px";
  } else {
    document.getElementById("lyricist").style.borderColor = "red";
    document.getElementById("lyricist").style.borderWidth = "2px";
  }

  if (dor != "") {
    document.getElementById("dor").style.borderColor = "green";
    document.getElementById("dor").style.borderWidth = "2px";
  } else {
    document.getElementById("dor").style.borderColor = "red";
    document.getElementById("dor").style.borderWidth = "2px";
  }

  if (url != "") {
    document.getElementById("thumb").style.borderColor = "green";
    document.getElementById("thumb").style.borderWidth = "2px";
  } else {
    document.getElementById("thumb").style.borderColor = "red";
    document.getElementById("thumb").style.borderWidth = "2px";
  }

  if (aud != "") {
    document.getElementById("aud").style.borderColor = "green";
    document.getElementById("aud").style.borderWidth = "2px";
  } else {
    document.getElementById("aud").style.borderColor = "red";
    document.getElementById("aud").style.borderWidth = "2px";
  }
}

// default color
function defaultColor() {
  document.getElementById("song").style.borderColor =
    "rgba(188, 188, 188, 0.3)";
  document.getElementById("album").style.borderColor =
    "rgba(188, 188, 188, 0.3)";
  document.getElementById("artist").style.borderColor =
    "rgba(188, 188, 188, 0.3)";
  document.getElementById("genre").style.borderColor =
    "rgba(188, 188, 188, 0.3)";
  document.getElementById("lyricist").style.borderColor =
    "rgba(188, 188, 188, 0.3)";
  document.getElementById("dor").style.borderColor = "rgba(188, 188, 188, 0.3)";
  document.getElementById("thumb").style.borderColor =
    "rgba(188, 188, 188, 0.3)";
  document.getElementById("aud").style.borderColor = "rgba(188, 188, 188, 0.3)";
}

// pauseOther audio function
function pauseOthers(event) {
  let audios = document.getElementsByClassName("songf");
  console.log(event.target);
  for (let i = 0; i < audios.length; i++) {
    if (audios[i] != event.target) {
      audios[i].pause();
    }
  }
}