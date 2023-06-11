var speakers = {{site.data.invited-speakers | jsonify }};

// Speakers preview in the tab
var speakerTab = document.getElementById('speaker-tab');
var speakerItems = speakerTab.querySelectorAll('.speaker-item');
speakerItems.forEach(function(speakerItem, index) {
  speakerItem.addEventListener('click', handleSpeakerItemClick.bind(null, speakerItem));
});

var firstSpeakerItem = document.querySelector('.speaker-item');
handleSpeakerItemClick(firstSpeakerItem);

var timeoutId = null;
function handleSpeakerItemClick(clickedElement) {
  // Deactivate all speakers in the tab
  document.querySelectorAll('.speaker-item.active').forEach(function(item) {
    item.classList.remove('active');
  });

  // Deactivate timer indicator
  let speakerTimer = document.getElementById('speaker-timer')
  speakerTimer.classList.remove('width-from-0-to-100');

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
    
    // Clear timer and setup new one
    speakerTimer.classList.add('width-from-0-to-100');
    if(timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      let newItem = clickedElement.parentNode.children[(parseInt(clickedElement.dataset.index) + 1) % clickedElement.parentNode.children.length];
      handleSpeakerItemClick(newItem);
    }, 30000);
  }, { once: true });
}
