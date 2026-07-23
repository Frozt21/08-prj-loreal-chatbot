export default {


async fetch(request,env){



if(request.method !== "POST"){


return new Response(

"Only POST requests allowed",

{

status:405

}

);


}






const body =

await request.json();






const openAIResponse =

await fetch(

"https://api.openai.com/v1/chat/completions",

{


method:"POST",


headers:{


"Content-Type":

"application/json",



"Authorization":

`Bearer ${env.OPENAI_API_KEY}`


},




body:JSON.stringify({



model:"gpt-4.1",



messages:

body.messages



})


}


);






const data =

await openAIResponse.json();







return Response.json(data);



}


};