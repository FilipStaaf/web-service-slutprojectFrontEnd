
export async function getallPosts(url){
    const response = await fetch(url, {
     method:'Get'  
 }).then(response => response.json())
 .then(data =>{
     return data;
 })
}

export async function createPosts(url,token,username,title,text){
    const response = await fetch(url, {
     method:'Put',
     headers:{
         "Content-Type":"application/json",
         "token":token
     },
        body:JSON.stringify({username,title,text})
     
 })
 if (response.status === 200) {
    return alert("all went as planned")
 }
 if (response.status === 409) {
     return alert("There is already another post with that title or text.")
 }
 else
 return alert("something went horrible wrong")
 }