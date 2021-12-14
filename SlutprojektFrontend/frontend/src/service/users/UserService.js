export async function registerUser(url,username,password){
    const response = await fetch(url, {
     method:'Put',
     headers:{
         "Content-Type":"application/json",
         "Accept":'application/json'
     },
     body:JSON.stringify({username,password})
     
 })
 if(response.status === 200){
    return alert("The registration was complete!")
 }
 if(response.status === 409){
     return alert("There is already another user with that name")
 }
 if(response.status === 500){
    return alert("Something went wrong contact support or try againa later.")
 }}
 
 export async function loginUser(url,username,password, logedin){
     const response = await fetch(url, {
      method:'Post',
      headers:{
          "Content-Type":"application/json",
          "username":username,
          "password":password
      },
      
  })
 
  if (response.status ===200){ 
     logedin(true);
     alert("you successfully logged in as " + username)
      return await response.text();
       
  }
  else{
     logedin(false);
      return alert("Wrong username or password")
      
  }}
 
  export async function logoutUser(url,token){
     const response = await fetch(url, {
      method:'Post',
      headers:{
          "Content-Type":"application/json",
          "token": token
      },
  })
  if (response.status === 200){
      return await response.text();
  }
  else{
      return alert("contact support!")
  }
 
  }