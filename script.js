// JavaScript (script.js)

document.getElementById("submit-button").addEventListener("click", function () {
    showLoading(true); // Display loading indicator
    makeApiRequest();
});

// Set your access token here
const accessToken = "YOUR_SINKIN_ACCESS_TOKEN";

function showLoading(isLoading) {
    const loadingElement = document.getElementById("loading");
    const responseContainer = document.getElementById("response-container");

    if (isLoading) {
        loadingElement.style.display = "block";
        responseContainer.style.display = "none";
    } else {
        loadingElement.style.display = "none";
        responseContainer.style.display = "block";
    }
}

function extractPngLink(text) {
    const regex = /(https?:\/\/[^\s]+\.png)/; // Regular expression to match PNG image links
    const match = text.match(regex);
    return match ? match[1] : null; // Return the PNG image link or null if not found
}

function makeApiRequest() {
    const url = "https://sinkin.ai/api/inference";
    const formData = new FormData(document.getElementById("api-form"));
    formData.set("access_token", accessToken); // Set the access token in the form data

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const pngLink = extractPngLink(data);
        if (pngLink) {
            document.getElementById("response-container").innerHTML = `<img src="${pngLink}" alt="PNG Image">`;
        } else {
            document.getElementById("response-container").innerHTML = `<p>Response: ${data}</p>`;
        }
        showLoading(false); // Hide loading indicator
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("response-container").innerHTML = `<p>Error occurred: ${error.message}</p>`;
        showLoading(false); // Hide loading indicator
    });
}
