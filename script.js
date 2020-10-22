let SubmitBtn = document.getElementById("submit");
let SearchBar = document.getElementById("search");
let Name = document.getElementById("Name")
let Repo = document.getElementById("Repo")
let CreateDate = document.getElementById("Date")
let ProfilePic = document.getElementById("avatar")

const client_id = "Iv1.26cc0418ae5a8a34";
const secretKey = '18d851447cc29f79e084a5aa398c4ad861b4645a'


SubmitBtn.addEventListener("click", ()=>{
    let UserName = SearchBar.value

    const fetcher = async (username) =>{
        const Users = await fetch(`https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${secretKey}`)
        const data = await Users.json();

        Name.innerText ="Name: " + data.name;
        Repo.innerText = "Total No of Repos: "+data.public_repos;
        ProfilePic.src = data.avatar_url;
        CreateDate.innerText = "Created Date: "+data.created_at.substring(0,10);
        
        
    }

    fetcher(UserName);
})



// Client ID: Iv1.26cc0418ae5a8a34
// Client secret: 18d851447cc29f79e084a5aa398c4ad861b4645a