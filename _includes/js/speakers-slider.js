var speakers = {{site.data.invited-speakers | jsonify }};

function colorI(html){
  html = html.replace('i', '<span class="emph">i</span>');
  html = html.replace('I', '<span class="emph">I</span>');
  return html;
}

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
      <div class="details-image col-md-4">
        <img src="${speaker.image}" alt="${speaker.name} photo" class="person-photo width-100 width-max-400px">
      </div>
      <div class="details-text col-md-8">
        <h2>${colorI(speaker.name)}</h2>
        <h3>${speaker.title}</h3>
        <p>${speaker.bio}</p>
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
