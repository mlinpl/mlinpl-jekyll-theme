var sponsorsContainer = document.getElementById("sponsors");    // section root element

var sponsorsData = {{ site.data.sponsors | jsonify }};



// // Auto-adjust number of columns for each category
Object.keys(sponsorsData).forEach(function (category) {
    var sponsorsInCategory = sponsorsData[category].sponsors;
    var categoryConfig = sponsorsData[category].config;

    if (sponsorsInCategory && sponsorsInCategory.length > 0 && categoryConfig) {
        var size = sponsorsInCategory.length;
        var columns = categoryConfig.columns;

        if (size % columns !== 0 && size % columns < Math.ceil(columns / 2)) {
            sponsorsData[category].config.columns = Math.max(2, Math.min(4, columns - 1));
        }
    }
});



var isFirstElement = true;

// Generate section for each category
Object.keys(sponsorsData).forEach(function (category) {
    var sponsorsInCategory = sponsorsData[category].sponsors;
    var categoryConfig = sponsorsData[category].config;

    if (sponsorsInCategory && sponsorsInCategory.length > 0) {
        // Create row and column for title
        var titleRow = document.createElement("div");
        titleRow.className = "row" + (isFirstElement ? "" : " mt-2");
        sponsorsContainer.appendChild(titleRow);

        var titleCol = document.createElement("div");
        titleCol.className = "col-lg-12";
        titleRow.appendChild(titleCol);

        // Create title element
        var title = document.createElement("h2");
        title.className = "text-align-left";
        title.style.fontSize = categoryConfig.fontSize + "px";
        title.innerHTML = "/ " + categoryConfig.title;
        titleCol.appendChild(title);

        // Create row for sponsor logos
        var sponsorRow = document.createElement("div");
        sponsorRow.className = "row d-flex justify-content-center text-center";
        titleRow.appendChild(sponsorRow);

        var columnWidth = 12 / categoryConfig.columns;

        // Iterate over sponsors in the category to create columns
        sponsorsInCategory.forEach(function (sponsor) {
            // Create sponsor column
            var sponsorCol = document.createElement("div");
            sponsorCol.className = `col-md-${columnWidth}`;
            sponsorRow.appendChild(sponsorCol);


            // Create sponsor element
            var sponsorElement = document.createElement("div");
            sponsorElement.className = "feature";
            sponsorCol.appendChild(sponsorElement);

            // Create sponsor logo image
            var sponsorImg = document.createElement("img");
            sponsorImg.width = categoryConfig.maxWidth;
            sponsorImg.src = sponsor.image;
            sponsorImg.alt = sponsor.name + " logo";
            sponsorImg.style.maxWidth = "min(100%, " + categoryConfig.maxWidth + "px)";

            // Create sponsor link (if available)
            if (sponsor.link) {
                var sponsorLink = document.createElement("a");
                sponsorLink.href = sponsor.link;
                sponsorLink.target = "_blank";
                sponsorLink.appendChild(sponsorImg);
                sponsorElement.appendChild(sponsorLink);
            } else {
                sponsorElement.appendChild(sponsorImg);
            }
        });
    }
    isFirstElement = false;
});
