// get api response
const apiUrl = 'http://localhost:3000/api/openai/completions'; // API endpoint on your server

const callItself = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: 
                `What is 1c in fahrenheit. 
                Give the final response in fahrenheit. no extra text.` },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 2
    })
}
// console.log(callItself)
const output = document.getElementById('output')

async function makeApiCall() {
    try {
        const response = await fetch(apiUrl, callItself);
        const data = await response.json();
        console.log(data)
        output.textContent = JSON.stringify(data)
    } catch (error) {
        console.error('Error:', error);
    }
    
}

makeApiCall();
