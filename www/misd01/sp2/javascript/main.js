const App = {};
App.apiKey = 'AIzaSyDPW_GBftKvB69Y-Xvqhb3ryz3_Li37UJU';

App.content = document.getElementById('content');
App.channelForm = document.getElementById('channel-form');
App.channelInput = document.getElementById('channel-input');
App.videoContainer = document.getElementById('video-container');
App.loadingIndicator = document.getElementById('progress-bar');

App.channelForm.addEventListener('submit', e => {
  e.preventDefault();
  const channel = App.channelInput.value;
  App.loadingIndicator.innerHTML = '<div class="indeterminate red"></div>';
  getChannel(channel);
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function getChannel(channel) {
  fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${channel}&key=${App.apiKey}`)
    .then(response => {
      return response.json();
    })

    .then(data => {
      console.log(data);
      if (data["pageInfo"].totalResults == 0) {
        App.loadingIndicator.innerHTML = '';
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
        `;
        
        showChannelData(output);
        App.loadingIndicator.innerHTML = '';       
        const playlistId = data["items"][0].contentDetails.relatedPlaylists.uploads;
        requestVideoPlaylist(playlistId);
        
      }
    })
}

function ShowHideDiv(checkbox) {
  App.videoContainer.style.display = checkbox.checked ? "block" : "none";
  
}

function showChannelData(data) {
  const channelData = document.getElementById('channel-data');
  channelData.innerHTML = data;
}

function requestVideoPlaylist(playlistId) {
  fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=5&playlistId=${playlistId}&key=${App.apiKey}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      const playListItems = data["items"];
      if (playListItems) {
        let output = '<br><h4 class="center-align">Videos</h4>'

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
        App.videoContainer.innerHTML = output;
      } else {
        App.videoContainer.innerHTML = 'No uploaded videos';
      }
    })
}
