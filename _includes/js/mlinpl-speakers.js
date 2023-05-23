var speakers = {{site.data.speakers-mock | jsonify }};

// Speakers preview in the tab
var speakerTab = document.getElementById('speaker-tab');
speakers.forEach(function(speaker, index) {
  var speakerItem = document.createElement('div');
  speakerItem.classList.add('speaker-item');
  speakerItem.addEventListener('click', handleSpeakerItemClick.bind(null, speakerItem));
  
  var speakerIcon = document.createElement('div');
  speakerIcon.classList.add('speaker-icon');
  speakerItem.appendChild(speakerIcon);
  
  fetch(speaker.icon) 
    .then(response => response.text()) // get the text content
    .then(data => {
      speakerIcon.innerHTML = data; // append the SVG to the DOM
    });
  
  var speakerName = document.createElement('span');
  speakerName.textContent = speaker.name;
  speakerItem.appendChild(speakerName);
  
  speakerItem.dataset.index = index;
  speakerTab.appendChild(speakerItem);
});

var firstSpeakerItem = document.querySelector('.speaker-item');
handleSpeakerItemClick(firstSpeakerItem);

function handleSpeakerItemClick(clickedElement) {
  // Deactivate all speakers in the tab
  document.querySelectorAll('.speaker-item.active').forEach(function(item) {
    item.classList.remove('active');
  });
  
  // Mark the clicked speaker item as active
  clickedElement.classList.add('active');
  
  var speaker = speakers[clickedElement.dataset.index];
  var speakerDetails = document.getElementById('speaker-details');
  
  speakerDetails.classList.add('fade-out');
  
  // Display speaker details
  speakerDetails.addEventListener('animationend', function() {
    speakerDetails.classList.remove('fade-out');
    speakerDetails.innerHTML = `
      <div class="details-text">
        <h2>${speaker.name}</h2>
        <h3>${speaker.title}</h3>
        <p>${speaker.description}</p>
      </div>
      <div class="details-image">
        <img src="${speaker.image}" alt="${speaker.name}">
      </div>
    `;
    
    // Fade in the new speaker detail
    speakerDetails.classList.add('fade-in');
  }, { once: true });
}
