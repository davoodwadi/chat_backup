let input = document.getElementById('message-input')
let output = document.getElementById('messages')


// show message
async function showMessage(){
  // User
  const userMessage = input.value;
  console.log(userMessage);
  const userElement = document.createElement('div');
  userElement.classList.add('message', 'user');
  userElement.textContent = userMessage;
  output.appendChild(userElement);

  // Bot
  const botElement = document.createElement('div');
  botElement.classList.add('message', 'bot');
  const responseGPT = await makeApiCall(userMessage);
  const final_text = responseGPT.message.content
  // const jsonGPT = await JSON.stringify(responseGPT);
  botElement.textContent = final_text;
  console.log(final_text)
  output.appendChild(botElement);
}

// get api response
const apiUrl = 'http://localhost:3000/api/openai/completions'; // API endpoint on your server

async function makeApiCall(userMessage) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage},
                ],
                model: "gpt-3.5-turbo",
                max_tokens: 10
            })
        });
    
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error('Error:', error);
        console.error(error);
    }
}