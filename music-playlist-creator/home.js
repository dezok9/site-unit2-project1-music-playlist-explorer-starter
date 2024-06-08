let playlists = data["playlists"];
let featured = document.getElementById("featured");

function featuredPlaylist() {
    // Choose random playlist, create playlist spotlight, and show songs.

    // Choose random playlist index.
    let randomIdx = Math.floor((Math.random() * (playlists.length)))

    // Playlist information section element creation.
    let playlistInfo = document.createElement("section");
    playlistInfo.classList.add("playlist-info");

    // Playlist image element creation.
    let playlistImg = document.createElement("img");
    playlistImg.src = playlists[randomIdx]["playlist_art"];
    playlistImg.classList.add("featured-img");

    // Playlist name element creation.
    let playlistName = document.createElement("h2");
    playlistName.innerText = playlists[randomIdx]["playlist_name"];

    // Playlist creator element creation.
    let playlistCreator = document.createElement("p");
    playlistCreator.innerText = playlists[randomIdx]["playlist_creator"];


    // Creating section for featured songs.
    let scroll = document.createElement("section");
    scroll.classList.add("featured-songs");

    // Create scrollable section for songs. To go inside of scroll element.
    let playlistSongs = document.createElement("section");
    playlistSongs.classList.add("scrollable");


    // Retrieving information for each song.
    playlists[randomIdx]["songs"].forEach(song => {
        let playlistSong = document.createElement("span");
        playlistSong.classList.add("song");
        playlistSong.id = "featured-song";

        // Song image element creation.
        let songImg = document.createElement("img");
        songImg.src = song["cover_art"];
        songImg.classList.add("featured-song-img");

        // Song info element creation.
        let songInfo = document.createElement("section");
        songInfo.classList.add("info");

        // Song name element creation.
        let songName = document.createElement("h2");
        songName.innerText = song["title"];
        songName.classList.add("song-name");

        // Song artist element creation.
        let songArtist = document.createElement("p");
        songArtist.innerText = song["artist"];

        // Song album element creation.
        let songAlbum = document.createElement("p");
        songAlbum.innerText = song["album"];

        // Assembling song cards.
        playlistSong.appendChild(songImg);
        playlistSong.appendChild(songInfo);

        songInfo.appendChild(songName);
        songInfo.appendChild(songArtist);
        songInfo.appendChild(songAlbum);

        playlistSongs.appendChild(playlistSong);
    });

    scroll.appendChild(playlistSongs);

    playlistInfo.appendChild(playlistImg);
    playlistInfo.appendChild(playlistName)
    playlistInfo.appendChild(playlistCreator);

    featured.appendChild(playlistInfo);
    featured.appendChild(scroll);
}

featuredPlaylist()
