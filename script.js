// Get HTML elements

const input = document.getElementById("user-input");

const button = document.getElementById("send-button");

const chatBox = document.getElementById("chat-box");

const questionDisplay = document.getElementById("question-display");



// Class Cloudflare Worker URL
// Replace this with the URL provided in your README

const workerURL =
"https://loreal-chatbot.your-subdomain.workers.dev/";




// Stores previous messages
// This allows the chatbot to remember the conversation

let conversationHistory = [

    {

        role:"system",

        content:

        `
        You are a L'Oréal Beauty Assistant.

        Only answer questions about:

        - L'Oréal products
        - skincare
        - makeup
        - haircare
        - fragrances
        - beauty routines
        - recommendations


        If a user asks something unrelated,
        politely explain that you only answer
        L'Oréal beauty questions.

        Be friendly and helpful.
        `

    }

];





// Adds messages to the chat window

function addMessage(message, sender){


    const messageElement =
    document.createElement("div");


    messageElement.textContent = message;


    messageElement.classList.add("message");


    if(sender === "user"){

        messageElement.classList.add("user-message");

    }

    else{

        messageElement.classList.add("bot-message");

    }



    chatBox.appendChild(messageElement);



    chatBox.scrollTop =
    chatBox.scrollHeight;


}






// Sends the user's question to the AI

async function sendMessage(){


    const userQuestion =
    input.value.trim();



    if(userQuestion === ""){

        return;

    }



    // Display user's newest question

    questionDisplay.textContent =
    "Your question: " + userQuestion;



    // Show user's message

    addMessage(userQuestion,"user");



    // Save conversation history

    conversationHistory.push({

        role:"user",

        content:userQuestion

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

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    messages:
                    conversationHistory

                })

            }

        );



        const data =
        await response.json();




        // Remove "Thinking..."

        chatBox.lastChild.remove();




        const reply =
        data.choices[0].message.content;




        addMessage(reply,"bot");




        // Save AI response

        conversationHistory.push({

            role:"assistant",

            content:reply

        });



    }


    catch(error){



        chatBox.lastChild.remove();



        addMessage(

            "Sorry, there was an error connecting to the AI.",

            "bot"

        );



        console.log(error);



    }



}





// Button click

button.addEventListener(

    "click",

    sendMessage

);





// Enter key support

input.addEventListener(

    "keypress",

    function(event){


        if(event.key==="Enter"){

            sendMessage();

        }


    }

);