const Apikey='d68da589450f4b3eb615ca85c017ab78'; // Define the API key for accessing the news API
const blogcontainer = document.getElementById("Blog_container"); // Get the container element where blog articles will be displayed
const Search_field = document.getElementById("Search_input"); // Get the search input field element
const Search_button = document.getElementById("Search_button"); // Get the search button element

/* To use Await we use Async 
In JavaScript, await is a keyword used to pause the execution of an asynchronous function 
until a Promise is settled (either fulfilled or rejected).
It can only be used inside an async function.
*/
async function RandomNews(){
    try {
        const ApiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${Apikey}`; // Define the URL to fetch top headlines from TechCrunch with a limit of 10 articles
        const response = await fetch(ApiUrl); // Fetch data from the API
        const datajson = await response.json(); // Convert the response to JSON format
        return datajson.articles; // Return the articles array from the JSON data
    } catch (error) {
        console.error("Error fetching News", error); // Log an error message if fetching fails
        return[]; // Return an empty array if there is an error
    }
}




Search_button.addEventListener("click", async () => { // Add an event listener to the search button for click events
    const query = Search_field.value.trim(); // Get the trimmed value from the search input field
    if (query !== "") { // Check if the query is not empty
        try {
            const articles = await fetchNewsQuery(query); // Fetch news articles based on the query
            displayblog(articles); // Display the fetched articles
        } catch (error) {
            console.error("Error fetching news by query", error); // Log an error message if fetching fails
        }
    } else {
        window.location.href = 'index.html'; // Redirect to 'index.html' if the search query is empty
    }
});




async function fetchNewsQuery(query) { // Define an async function to fetch news based on a query
    try {
        const ApiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${Apikey}`; // Define the URL to fetch news articles based on the query with a limit of 10 articles
        const response = await fetch(ApiUrl); // Fetch data from the API
        const datajson = await response.json(); // Convert the response to JSON format
        return datajson.articles; // Return the articles array from the JSON data
    } catch (error) {
        console.error("Error fetching News", error); // Log an error message if fetching fails
        return[]; // Return an empty array if there is an error
    }
}




function displayblog(articles) { // Define a function to display blog articles
    blogcontainer.innerHTML = ""; // Clear the existing content in the blog container
    articles.forEach((article) => { // Loop through each article in the articles array
        const blogcard = document.createElement("div"); // Create a new div element for the blog card
        blogcard.classList.add("blog_card"); // Add a class to the blog card for styling
        const img = document.createElement("img"); // Create a new img element for the article image
        img.src = article.urlToImage; // Set the source of the image
        img.alt = article.title; // Set the alt text of the image
        const title = document.createElement("h2"); // Create a new h2 element for the article title
        title.textContent = article.title; // Set the text content of the title
        const trucatedtitle = article.title.length > 30 ? article.title.slice(0, 30) + "....." : article.title; // Truncate the title if it's longer than 30 characters
        title.textContent = trucatedtitle; // Set the truncated title as the text content
        const desc = document.createElement("p"); // Create a new p element for the article description
        desc.textContent = article.desc; // Set the text content of the description
        blogcard.appendChild(img); // Append the image to the blog card
        blogcard.appendChild(title); // Append the title to the blog card
        blogcard.appendChild(desc); // Append the description to the blog card
        blogcard.addEventListener('click', () => { // Add a click event listener to the blog card
            window.open(article.url, "_blank"); // Open the article URL in a new tab when the blog card is clicked
        });
        blogcontainer.appendChild(blogcard); // Append the blog card to the blog container
    });
}




(async () => { // Immediately invoke an async function to fetch and display random news on page load
    try {
        const articles = await RandomNews(); // Fetch random news articles
        displayblog(articles); // Display the fetched articles
    } catch (error) {
        console.error("Error fetching News", error); // Log an error message if fetching fails
    }
})();
