const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    //create a chat <li> element with  passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
     const API_URL = "https://api.openai.com/v1/chat/completions";

     const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
     }

     // Send POST request to API, get response
     fetch(API_URL, requestOption).then(res => res.json()).then(data => {
        console.log(data);
     }).catch((error) => {
        console.log(error);
     })
}

const handleChat = () => {
   userMessage= chatInput.value.trim();
   if(!userMessage) return;

   //Append the user's message to the chatbox
   chatbox.appendChild(createChatLi(userMessage, "outgoing"));

   setTimeout(() => {
    //Display "Thinking..." message while waiting for the respond
     chatbox.appendChild(createChatLi("Thinking...", "incoming"));
     generateResponse();
   }, 600);
}
sendChatBtn.addEventListener("click", handleChat);