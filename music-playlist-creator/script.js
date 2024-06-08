let modal = document.getElementById("modal");
let span = document.getElementsByClassName("close")[0];
let searchButton = document.getElementById("search-button");
let searchBar = document.getElementById("searching");
let searchingPlaylists = document.getElementById("searching");

function createPlaylistCards() {
    // Creates the playlist cards.

    // Creation of add playlist card.

    // Playlist card element creation.
    let addCard = document.createElement("section");
    addCard.classList.add("playlist-card");
    addCard.id = "add-card";

    let add = document.createElement("i");
    add.classList.add("fa-solid");
    add.classList.add("fa-plus");
    add.classList.add("fa-5x");

    let createPrompt = document.createElement("p");
    createPrompt.classList.add("prompt");

    document.getElementById("playlist-cards").innerHTML = "";

    addCard.addEventListener("hover", () => addCard);

    // Assembly of add card using elements.
    addCard.appendChild(add);


    document.getElementById("playlist-cards").appendChild(addCard);

    for (let idx = 0; idx < data["playlists"].length;  idx += 1) {
        // Playlist card element creation.
        let playlistCard = document.createElement("section");
        playlistCard.classList.add("playlist-card");

        let playlistInfo = document.createElement("section");

        // Playlist image element creation.
        let playlistImg = document.createElement("img");
        playlistImg.src = data["playlists"][idx]["playlist_art"];
        playlistImg.classList.add("playlist-img");

        // Playlist title element creation.
        let playlistTitle = document.createElement("h2");
        playlistTitle.textContent = data["playlists"][idx]["playlist_name"];
        playlistTitle.classList.add("playlist-title");

        // Playlist creator element creation.
        let playlistCreator = document.createElement("p");
        playlistCreator.textContent = data["playlists"][idx]["playlist_creator"];

        // Playlist likes element creation.
        let playlistCount = document.createElement("div");
        playlistCount.classList.add("like-count-info");

        let likeCount = document.createElement("p");
        likeCount.textContent = data["playlists"][idx]["likeCount"];

        let heart = document.createElement("i");
        heart.classList.add("fa-regular");
        heart.classList.add("fa-heart");

        let trash = document.createElement("i");
        trash.classList.add("fa-solid");
        trash.classList.add("fa-trash");

        // Assembly of card using elements.
        playlistCard.appendChild(playlistInfo);

        playlistInfo.appendChild(playlistImg);
        playlistInfo.appendChild(playlistTitle);
        playlistInfo.appendChild(playlistCreator);

        playlistCard.appendChild(playlistCount);

        playlistCount.appendChild(heart);
        playlistCount.appendChild(likeCount);
        playlistCount.appendChild(trash);

        // Adding event listner to each playlist card.
        heart.addEventListener("click", () => likePlaylist(heart, likeCount));
        trash.addEventListener("click", () => deletePlaylist(playlistCard))
        playlistInfo.addEventListener("click", () => openModal(data["playlists"][idx]));

        document.getElementById("playlist-cards").appendChild(playlistCard);
    }
}

function deletePlaylist(playlistCard) {
    document.getElementById("playlist-cards").removeChild(playlistCard);
}

function openModal(playlist) {
    // Opens the modal and populates it with data from the playlist.
    // Why doesn't this wok when we just pass playlist?
    document.getElementById("playlist-name").innerText = playlist["playlist_name"];
    document.getElementById("playlist-img").src = playlist["playlist_art"];
    document.getElementById("creator-name").innerHTML = `<strong>Creator: </strong> ${playlist["playlist_creator"]}`;

    document.getElementById("shuffle-button").addEventListener("click", () => shuffleSongs(playlist));

    createSongList(playlist);

    modal.style.display = "block";
}

function likePlaylist(heart, likeCount) {
    // Changing the heart to solid
    if (String(heart.classList).includes("fa-regular")) {
        // Change to solid if liked.
        heart.classList = ""
        heart.classList.add("fa-solid");
        heart.classList.add("fa-heart");
        heart.classList.add("liked-heart");

        likeCount.innerText = String(Number(likeCount.innerText) + 1);
    }
    else {
        // Change to outline if unliked.
        heart.classList = ""
        heart.classList.add("fa-regular");
        heart.classList.add("fa-heart");

        likeCount.innerText = String(Number(likeCount.innerText) - 1);
    }
}

function createSongList(playlist) {
    // Creates the song list.

    // Clear the previous songs added to the modal.
    document.getElementById("songs").textContent = '';

    for (let idx = 0; idx < playlist["songs"].length;  idx += 1) {
        // Song element creation.
        let songCard = document.createElement("article");
        songCard.classList.add("song");

        // Song image element creation.
        let songImg = document.createElement("img");
        songImg.src = playlist["songs"][idx]["cover_art"];
        songImg.classList.add("song-img");

        // Song info container element creation.
        let infoContainer = document.createElement("section");
        infoContainer.classList.add("info");

        // Song title element creation.
        let songTitle = document.createElement("h2");
        songTitle.textContent = playlist["songs"][idx]["title"];
        songCard.classList.add("song-name");

        // Song creator element creation.
        let songArtist = document.createElement("p");
        songArtist.textContent = playlist["songs"][idx]["artist"];
        songArtist.classList.add("artist-name");

        // Song album element creation.
        let songAlbum = document.createElement("p");
        songAlbum.textContent = playlist["songs"][idx]["album"];

        // Song play button element creation.
        let play = document.createElement("i");
        play.classList.add("fa-solid");
        play.classList.add("fa-play");
        play.classList.add("fa-4x");
        play.classList.add("play-button");

        // Song duration element creation.
        let songDuration = document.createElement("p");
        songDuration.textContent = playlist["songs"][idx]["duration"];
        songDuration.classList.add("timestamp");

        // Assembly of card using elements.
        songCard.appendChild(songImg);
        songCard.appendChild(infoContainer);

        infoContainer.appendChild(songTitle);
        infoContainer.appendChild(songArtist);
        infoContainer.appendChild(songAlbum);

        songCard.appendChild(songDuration);
        songCard.appendChild(play);


        document.getElementById("songs").appendChild(songCard);
    }
}

function shuffleSongs(playlist) {
    let currentIdx = playlist["songs"].length - 1;

    while (currentIdx >= 0) {
        let randomIdx = Math.floor((Math.random() * (currentIdx + 1)))

        let tmp = playlist["songs"][currentIdx];
        playlist["songs"][currentIdx] = playlist["songs"][randomIdx];
        playlist["songs"][randomIdx] = tmp;
        currentIdx--;
    }

    createSongList(playlist);
}

searchButton.onclick = function() {
    // Pop up search bar when search button is clicked and close when clicked again.
    if (searchBar.style.display == "none") {
        searchBar.style.display = "block";
    }
    else {
        searchBar.style.display = "none";
    }
}

function searching() {
    // Re-rendering search bar on input of new text.
    createPlaylistCards();
}

span.onclick = function() {
    // Closes out the modal if the user clicks on the X.
    songCards = []
    modal.style.display = "none";
}

window.onclick = function(event) {
    // Closes out the modal if the user clicks outside of it.
    if (event.target == modal && modal.style.display == "block") {
        songCards = []
        modal.style.display = "none";
    }
}

createPlaylistCards();
