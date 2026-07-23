// --------------------------------
// L'Oréal AI Chatbot
// Frontend JavaScript
// --------------------------------



const input =

document.getElementById(
"user-input"
);



const button =

document.getElementById(
"send-button"
);



const chatBox =

document.getElementById(
"chat-box"
);



const questionDisplay =

document.getElementById(
"question-display"
);






// Cloudflare Worker URL
// Replace with your assigned URL

const workerURL =

"https://YOUR-WORKER-URL.workers.dev/";







// Stores conversation history

let conversationHistory = [


{

role:"system",

content:

`

You are L'Oréal Beauty Assistant.

Your purpose is to help users with:

- L'Oréal skincare products
- L'Oréal makeup products
- L'Oréal haircare products
- L'Oréal fragrances
- Beauty routines
- Product recommendations


You must refuse unrelated questions.

If someone asks about coding,
politics, math, homework,
or anything unrelated say:


"I'm here to help with L'Oréal beauty products,
routines, and recommendations.
Could you ask me a beauty-related question?"


Be friendly, professional,
and personalized.

`

}


];







function addMessage(text,type){



const message =

document.createElement(
"div"
);



message.textContent=text;



message.classList.add(
"message"
);



if(type==="user"){


message.classList.add(
"user-message"
);


}

else{


message.classList.add(
"bot-message"
);


}




chatBox.appendChild(message);



chatBox.scrollTop =
chatBox.scrollHeight;



}









async function sendMessage(){



const userText =

input.value.trim();




if(userText===""){

return;

}






questionDisplay.textContent =

"Your question: " + userText;





addMessage(
userText,
"user"
);






conversationHistory.push({


role:"user",

content:userText


});






input.value="";





addMessage(
"Thinking...",
"bot"
);







try{



const response =

await fetch(

workerURL,

{


method:"POST",


headers:{


"Content-Type":

"application/json"


},



body:JSON.stringify({


messages:

conversationHistory


})


}


);







const data =

await response.json();






chatBox.lastChild.remove();







const reply =

data.choices[0]
.message
.content;






addMessage(

reply,

"bot"

);






conversationHistory.push({


role:"assistant",

content:reply


});






}



catch(error){



chatBox.lastChild.remove();




addMessage(

"Sorry, there was a connection error.",

"bot"

);



console.log(error);



}



}








button.addEventListener(

"click",

sendMessage

);






input.addEventListener(

"keypress",

function(event){


if(event.key==="Enter"){


sendMessage();


}


}

);