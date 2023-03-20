// Quotes JS Code Starts
let btn = document.getElementById('getQuote');
let quote = document.getElementById('content');
function getQuotes() {
    fetch('https://quotable.io/random', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            quote.innerHTML = data.content;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
getQuotes(); //to get the intial quote
// Quote JS Code Ends