let modal = document.getElementById("modal");
let span = document.getElementsByClassName("close")[0];

let playlistCards = []

function createPlaylistCards() {
    // Creates the playlist cards.

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

        console.log(heart)

        // Assembly of card using elements.
        playlistCard.appendChild(playlistInfo);

        playlistInfo.appendChild(playlistImg);
        playlistInfo.appendChild(playlistTitle);
        playlistInfo.appendChild(playlistCreator);

        playlistCard.appendChild(playlistCount);

        playlistCount.appendChild(heart);
        playlistCount.appendChild(likeCount);


        // Adding event listner to each playlist card.
        heart.addEventListener("click", () => likePlaylist(heart, likeCount))
        playlistInfo.addEventListener("click", () => openModal(data["playlists"][idx]));

        // Adding card to array of playlist cards.
        playlistCards.push(playlistCard);

        document.getElementById("playlist-cards").appendChild(playlistCard);
    }
}


function openModal(playlist) {
    // Opens the modal and populates it with data from the playlist.
    // Why doesn't this wok when we just pass playlist?
    document.getElementById("playlist-name").innerText = playlist["playlist_name"];
    document.getElementById("playlist-img").src = playlist["playlist_art"];
    document.getElementById("creator-name").innerHTML = `<strong>Artist: </strong> ${playlist["playlist_creator"]}`;

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
        songCard.classList.add("songName");

        // Song creator element creation.
        let songArtist = document.createElement("p");
        songArtist.textContent = playlist["songs"][idx]["artist"];

        // Song album element creation.
        let songAlbum = document.createElement("p");
        songAlbum.textContent = playlist["songs"][idx]["album"];

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

        document.getElementById("songs").appendChild(songCard);
    }
}

span.onclick = function() {
    // Closes out the modal if the user clicks on the X.
    modal.style.display = "none";
}

window.onclick = function(event) {
    // Closes out the modal if the user clicks outside of it.
    if (event.target == modal && modal.style.display == "block") {
        modal.style.display = "none";
    }
}

createPlaylistCards();
