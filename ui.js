class UI {
    constructor() {
        this.uiProfile = document.getElementById("profile");
        this.uiRepo = document.getElementById("repos");
        this.uiLastUser = document.getElementById("last-users");
        this.uiInputValue = document.getElementById("githubname");
        this.uiCardBody = document.querySelector(".card-body");

    }
    clearInputValue() {
        this.uiInputValue.value = "";
    }

    addRequestUserUI(user) {
        this.uiProfile.innerHTML = `
        <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                         <hr>
                         <div id="fullName"><strong> ${user.name}</strong></div>
                         <hr>
                         <div id="bio">${user.bio}</div>
                        </div>
                      <div class="col-md-8">
                            <button class="btn btn-secondary">
                                  Takipçi  <span class="badge badge-light">${user.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                 Takip Edilen  <span class="badge badge-light">${user.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repolar  <span class="badge badge-light">${user.public_repos}</span>
                            </button>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                    <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/mail.png" width="30px"> <span id="email">${user.email}</span>
                                    
                                </li>
                                
                            </div>
                               
                            
                      </div>
                </div>
        
        
        `
    }

    showInfo(type, message) {
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        ui.uiCardBody.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000)
    }

    addRequestRepoUI(repo) {
        this.uiRepo.innerHTML = "";

        repo.forEach(repo => {
            this.uiRepo.innerHTML += `
            <div class="mb-2 card-body">
            <div class="row border border-secondary" style="display:flex; justify-content:space-between">
                <div class="col-md-4"> 
                <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                </div>
                <div class="col-md-3" style="display:flex; justify-content:space-between">
                    <button class="btn btn-secondary">
                        Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                    </button>

                    <button class="btn btn-info">
                        Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                    </button>
            
                </div>
        </div>

        </div>
            `
        })
    }

    addFromToUserUI(username) {
        let users = Storage.getFromToStorage();

        if (users.indexOf(username) === -1) {
            users.push(username);
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username
            this.uiLastUser.appendChild(li);

        }
    }

    clearAllUserToUI() {
        while (this.uiLastUser.firstElementChild !== null) {
            this.uiLastUser.firstElementChild.remove();
        }
    }
}