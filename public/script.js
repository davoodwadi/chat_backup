let bot_default_message = `To ensure that messages in the chat interface wrap and display as multiline when the text is too long to fit in one line, you need to update the CSS to allow for word wrapping and handling overflow appropriately.

Here’s how you can adjust the CSS to ensure that messages are displayed in multiple lines within the chat interface: `
// get api response
const apiUrl = 'http://192.168.1.44:3000/api/openai/completions'; // API endpoint on your server

document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.getElementById('send-button');
    const textarea = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');
    
    // extend input box
    document.getElementById('message-input').addEventListener('input', autoResizeTextarea);

    sendButton.addEventListener('click', sendMessage);
    textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // the main function
    async function sendMessage() { 

        //  display user message
        const messageText = textarea.value.trim();
        if (messageText !== '') {
            addMessage('user', messageText);
            textarea.value = '';
            autoResizeTextarea();
            scrollToTopOfLastMessage();
            console.log(`showed: ${messageText}`);
            // try to get gpt message
            try {
                const responseGPT = await makeApiCall(messageText);
                const final_text = responseGPT.message.content;
                addMessage('bot', final_text);
                scrollToTopOfLastMessage();
                console.log(`added: ${final_text}`);
            } catch (error) {
                console.error('Error fetching bot response:', error);
                addMessage('bot', 'Sorry, an error occurred.');
            }
        }
    }


    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
    }
    
    function scrollToTopOfLastMessage() {
        const lastMessage = messagesContainer.lastElementChild;
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // give userMessage and get data as array
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
                    model: "gpt-4o-mini",
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
    function autoResizeTextarea() {
        // const textarea = document.getElementById('message-input');
        textarea.style.height = 'auto'; // Reset the height to auto
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'; // Set the height to match the scrollHeight, up to a max of 200px
    }
});
