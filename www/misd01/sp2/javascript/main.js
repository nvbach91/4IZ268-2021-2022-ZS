$(document).ready(() => {
  apiKey = 'AIzaSyDPW_GBftKvB69Y-Xvqhb3ryz3_Li37UJU';

  const channelForm = document.getElementById('channel-form');
  const channelInput = document.getElementById('channel-input');
  const videoContainer = document.getElementById('video-container');
  const loadingIndicator = document.getElementById('progress-bar');
  const channelsDiv = document.getElementById('channel-list');

  const channels = JSON.parse(localStorage.channels);
  console.log('Generate field ' + channels);
  let output = '<p>Saved channels:</p>';
  channels.forEach(item => {
    output += `
    <li id="${item}">${item}</li>`
  });
  channelsDiv.innerHTML = output;


  channelForm.addEventListener('submit', e => {
    e.preventDefault();
    const channel = channelInput.value;
    loadingIndicator.innerHTML = '<div class="indeterminate red"></div>';
    getChannel(channel);

  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  function getChannel(channel) {
    fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${channel}&key=${apiKey}`)
      .then(response => {
        return response.json();
      })

      .then(data => {
        console.log(data);
        if (data["pageInfo"].totalResults == 0) {
          loadingIndicator.innerHTML = '';
        } else {

          const output = `       
          <img src="${data["items"][0].snippet.thumbnails.medium.url}">
          <ul class="collection">
            <li class="collection-item">Title: ${data["items"][0].snippet.title}</li>
            <li class="collection-item">Subscribers: ${numberWithCommas(data["items"][0].statistics.subscriberCount)}</li>
            <li class="collection-item">Views: ${numberWithCommas(data["items"][0].statistics.viewCount)}</li>
            <li class="collection-item">Video count: ${numberWithCommas(data["items"][0].statistics.videoCount)}</li>
          </ul>
          <p>${data["items"][0].snippet.description}</p>
          <hr>
          <a href="https://youtube.com/${data["items"][0].snippet.customUrl}" class="btn grey darken-2" target="_blank" >Visit channel</a>
          <button class="btn grey darken-2" value="Save" id="btn-save">Save</button>
          `;

          showChannelData(output);
          $("#btn-save").click(saveChannel);
          loadingIndicator.innerHTML = '';
          const playlistId = data["items"][0].contentDetails.relatedPlaylists.uploads;
          requestVideoPlaylist(playlistId);

        }
      })
  }

  function saveChannel() {
    const channel = channelInput.value;
    var exists = false;

    channels.forEach(item => {
      if (item == channel) {
        exists = true;
      }
    })
    if (!exists) {
      console.log('Saving channel ' + channel);
      channels.push(channel);
      showSavedChannels(channels);
    }
  }

  function showSavedChannels(channels) {
    localStorage.setItem('channels', JSON.stringify(channels));

    let output = '<p>Saved channels:</p>';
    channels.forEach(item => {
      output += `
      <li id="${item}">${item}</li>`
    });
    console.log(allStorage());
    channelsDiv.innerHTML = output;
  }


  channelsDiv.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "LI") {
      console.log(e.target.id + " was clicked");
      showSavedChannelInfo(e.target.id);
    }
  });



  function showSavedChannelInfo(channel) {
    console.log(channel);
    getChannel(channel);
  }

  function allStorage() {

    var channels = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      channels.push(localStorage.getItem(keys[i]));
    }

    return channels;
  }

  function showChannelData(data) {
    const channelData = document.getElementById('channel-data');
    channelData.innerHTML = data;
  }

  function requestVideoPlaylist(playlistId) {
    fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=5&playlistId=${playlistId}&key=${apiKey}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const playListItems = data["items"];
        if (playListItems) {
          let output = '<br><h4 class="center-align">Videos</h4>'

          //update DOM v forEach
          playListItems.forEach(item => {
            const videoId = item.snippet.resourceId.videoId;
            const videoTitle = item.snippet.title;
            output += `
            <div class="col s3">           
              <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <strong>${videoTitle}</strong>
            </div>
            `
          });

          videoContainer.innerHTML = output;
        } else {
          videoContainer.innerHTML = 'No uploaded videos';
        }
      })
  }
});

function ShowHideDiv(checkbox) {
  videoContainer.style.display = checkbox.checked ? "block" : "none";

}
