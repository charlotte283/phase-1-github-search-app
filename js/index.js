document.addEventListener("DOMContentLoaded", ()=>{
    let form = document.getElementById("github-form")
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        let input = document.getElementById("search").value
        fetchNames(input);
    })
 })




function fetchNames(user){
    fetch(`https://api.github.com/users/${user}`)
    .then((response)=> response.json())
    .then((user)=> renderUsers(user))

}
function renderUsers(user){
    console.log(user);
    let ul = document.getElementById("user-list")
    let li = document.createElement("li")
    li.innerHTML = `
      <a href = ${user.url}><img src =${user.avatar_url}/>user url</a>
    <h3>${user.login}</h3>
    <p style = "font-style: italic">${user.public_repos} repositories</p>
    <button id="repositories">View Repositories</>
    `
    ul.appendChild(li);
    let link = `https://api.github.com/users/${user.login}/repos`;
    let repo = document.getElementById("repositories")
        repo.addEventListener("click", ()=>{
            repoLink(link)
        })
}

function repoLink(userRepos) {
    fetch(userRepos)
      .then((resp) => resp.json())
      .then((names) => {
        repoNames(names);
      });
  }
  let clicked = true;
  function repoNames(names) {
    if(clicked){
      names.forEach((name) => {
        let repoContainer = document.getElementById("repos-list");
        let li = document.createElement("li");
        li.textContent = name.name;
        repoContainer.appendChild(li);
      });
      clicked = false
    }
  }