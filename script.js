let SubmitBtn = document.getElementById("submit");
let SearchBar = document.getElementById("search");
let Name = document.getElementById("Name")
let Repo = document.getElementById("Repo")
let CreateDate = document.getElementById("Date")
let ProfilePic = document.getElementById("avatar")
let ReposDiv = document.getElementById("ReposDiv")

const client_id = "Iv1.26cc0418ae5a8a34";
const secretKey = '18d851447cc29f79e084a5aa398c4ad861b4645a'

let pageNo = 1
let repoPerPage = 5
let noOfRepos;
let GitUserName;

//--------------------------Fetching the User Details---------------------------------




    const fetcher = async (username) =>{
        let Users = await fetch(`https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${secretKey}`)
        let data = await Users.json();

        Name.innerText ="Name: " + data.name;
        Repo.innerText = "Total No of Repos: "+data.public_repos;
        ProfilePic.src = data.avatar_url;
        CreateDate.innerText = "Created Date: "+data.created_at.substring(0,10);
        noOfRepos = data.public_repos;   
        GitUserName  = data.login 

//--------------------------Fetching the Repos---------------------------------
       
    const FetchRepos =  async() => {
        let Allrepos = await fetch(`https://api.github.com/users/${GitUserName}/repos?page=${pageNo}&per_page=${repoPerPage}`)
        let repoData = await Allrepos.json();
        console.log(repoData)

        function DisplayRepos(i){
        let Repo1 = document.createElement("p");
        Repo1.innerText = repoData[i].name;
        ReposDiv.append(Repo1)
        }

        for(let i=0; i<repoData.length; i++){
            DisplayRepos(i)
        }

    }

    FetchRepos()

//--------------------------Pagination--------------------------------


    function pageButtons(pages){
    let wrapper = document.getElementById("pagination-wrapper")
    wrapper.innerHTML = ""

    for(let i=1; i<=pages; i++){
        wrapper.innerHTML += `<button value=${i} class="btn btn-sm btn-info pages">${i}</button>`
        }

    let Allpages = document.querySelectorAll(".pages");
    Allpages.forEach((page) =>{
        page.addEventListener("click",()=>{
            pageNo = page.innerText
            ReposDiv.innerText = ""
            FetchRepos()
        })
    })

    }

    let repoPages = Math.ceil(noOfRepos/5);
    pageButtons(repoPages)
    
    }

//--------------------------Calling Functions on Enter and Submit button--------------------------------

SearchBar.addEventListener("keyup", (event)=>{
    if (event.code === "Enter") {
        event.preventDefault();
        let UserName = SearchBar.value
        ReposDiv.innerHTML = ""
        fetcher(UserName);
        SearchBar.value = ""
    }    
})


SubmitBtn.addEventListener("click", ()=>{
    let UserName = SearchBar.value
    ReposDiv.innerHTML = ""
    fetcher(UserName);
    SearchBar.value = ""
})


