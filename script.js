let SubmitBtn = document.getElementById("submit");
let SearchBar = document.getElementById("search");
let Name = document.getElementById("Name")
let Repo = document.getElementById("Repo")
let CreateDate = document.getElementById("Date")
let ProfilePic = document.getElementById("avatar")
let MainDiv = document.getElementById("main")

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
        
        
        repoURL = data.repos_url;
        const Allrepos = await fetch(`${repoURL}`)
        const repoData = await Allrepos.json();

        function RepoList(i){
            let Repo1 = document.createElement("p");
            Repo1.innerText = i+1 +". "+repoData[i].name;
            MainDiv.append(Repo1)
        }

        for(let i=0; i<repoData.length; i++){
            RepoList(i)
        }


        console.log(repoData)

        
    }

    // const fetchRepo = async(userrepo) => {
    //     const Users = await fetch(`https://api.github.com/user/repos?page=2&per_page=100/chetas11?client_id=Iv1.26cc0418ae5a8a34&client_secret=18d851447cc29f79e084a5aa398c4ad861b4645a`)
    //     const data = await Users.json();
    // }

    // https://api.github.com/chetas11?client_id=Iv1.26cc0418ae5a8a34&client_secret=18d851447cc29f79e084a5aa398c4ad861b4645a/repos?page=2&per_page=100/


    fetcher(UserName);
})



// Client ID: Iv1.26cc0418ae5a8a34
// Client secret: 18d851447cc29f79e084a5aa398c4ad861b4645a