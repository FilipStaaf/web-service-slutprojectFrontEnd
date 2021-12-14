import React,{ useState, useEffect} from 'react';
import {createPosts} from "./service/posts/PostService"

function PostWall(props) {
const [posts, setPosts] = useState ([]);
const [title,setTitle] = useState ('');
const [text,setText] = useState ('');

const createPostsURL = 'http://localhost:8080/posts/create'
const postsURL = 'http://localhost:8080/posts/all'

async function getallPost(){
await fetch('http://localhost:8080/posts/all',{
            method:"Get"
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data)
            });
        }

    useEffect(() => {
        getallPost();
    }, []);

    const createNewPosts = () =>{
        if (title === "" || text ==="") {
            alert("you need to insert something in title or text!")
        }else
        createPosts(createPostsURL,props.token,props.username,title,text)
        getallPost();
    }

if (props.logedin === false) {
return(
    <div>
        <div>
         <ul >
                {posts.map((posts, index) => {
                  
                    return (<li key={index} style={{ border:"1px solid", backgroundColor:"DarkOliveGreen", color: 'white', padding:"2px"}}>
                        <div>Post made by: {posts.username}</div>
                       Title: {posts.title} <br/> Text: {posts.text} <br/>
                    </li>);
                })}
            </ul>
            </div>
    </div>
)
}else
return(
<div>
{/* Delete */}
 <div> 
     <ul>
            {posts.map((posts, index) => {
                  if(posts.username === props.username){
                    return(
                        <li key={index} style={{ border:"1px solid", backgroundColor:"grey", color: 'white', padding:"2px"}}>
                            <div>Post made by: {posts.username}</div>
                           Title: {posts.title} <br/> 
                           Text: {posts.text} <br/> 
                           <button onClick={() => {
                        fetch('http://localhost:8080/posts/delete/' + posts.title, {
                            method: 'DELETE',
                            headers:{
                                "Content-Type":"application/json",
                                "username":posts.username
                            }
                            
                        }).then(response => {
                            getallPost();
                        });                           
                    }} style={{ display:"flex", border:"1px solid", backgroundColor:"DarkOliveGreen", color: 'white'}}>Delete your post</button>
                        </li>
                    )
                }       
                return (<li key={index} style={{ border:"1px solid", backgroundColor:"DarkOliveGreen", color: 'white', padding:"2px"}}>
                    <div>Post made by: {posts.username}</div>
                   Title: {posts.title} <br/> Text: {posts.text} <br/>
                </li>);
            })}
     </ul>
 </div>
{/* Textfälten som tar in inputs och en knapp som skapar ny post */}
 <div>
     <div>    
             <label style={{display:"flex", padding:"5px"}}> Title: </label>
             <input value={title} onChange={e => setTitle(e.target.value)} 
             style={{display:"flex",justifyContent:"center", border:"1px solid", padding:"5px"}}
             ></input> 

             <label style={{display:"flex", padding:"5px"}}> Text: </label>
             <input value={text} onChange={e => setText(e.target.value)}  
             style={{display:"flex",justifyContent:"center", border:"1px solid", padding:"5px"}}>    
             </input>
     </div>
     <button onClick={createNewPosts} 
     style={{display:"flex",justifyContent:"center", border:"1px solid", borderBlockColor:"LemonChiffon", padding:"5px", backgroundColor:"DarkOliveGreen", color: 'white'}}>
         Create new posts here!
     </button>
 </div>

</div>
)

}

export default PostWall;
