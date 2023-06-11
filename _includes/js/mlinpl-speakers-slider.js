var speakers = {{site.data.invited-speakers | jsonify }};

// Speakers preview in the tab
var speakerTab = document.getElementById('speaker-tab');
var speakerItems = speakerTab.querySelectorAll('.speaker-item');
speakerItems.forEach(function(speakerItem, index) {
  speakerItem.addEventListener('click', handleSpeakerItemClick.bind(null, speakerItem));
});

var firstSpeakerItem = document.querySelector('.speaker-item');
handleSpeakerItemClick(firstSpeakerItem);

function handleSpeakerItemClick(clickedElement) {
  // Deactivate all speakers in the tab
  document.querySelectorAll('.speaker-item.active').forEach(function(item) {
    item.classList.remove('active');
  });

  console.log(clickedElement);
  
  // Mark the clicked speaker item as active
  clickedElement.classList.add('active');
  
  var speaker = speakers[clickedElement.dataset.index];
  var speakerDetails = document.getElementById('speaker-details');
  
  speakerDetails.classList.add('fade-out');
  
  // Display speaker details
  speakerDetails.addEventListener('animationend', function() {
    speakerDetails.classList.remove('fade-out');
    speakerDetails.innerHTML = `
      <div class="details-image">
        <img src="${speaker.image}" alt="${speaker.name}">
      </div>
      <div class="details-text">
        <h2>${speaker.name}</h2>
        <h3>${speaker.title}</h3>
        <p>${speaker.description}</p>
      </div>
    `;
    
    // Fade in the new speaker detail
    speakerDetails.classList.add('fade-in');
  }, { once: true });
}
