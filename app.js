const githubForm = document.querySelector("#github-form");
const githubInput = document.querySelector("#githubname");
const githubList = document.querySelector("#last-users");
const githubClearLastUser = document.querySelector("#clear-last-users");
const githubRequest = new Github();
const ui = new UI();
eventListener();

function eventListener() {
    githubForm.addEventListener("submit", addGithubUser);
    githubClearLastUser.addEventListener("click", clearAllUserUI);
    document.addEventListener("DOMContentLoaded", getFromToStorageAddUserUI);
}

function addGithubUser(e) {
    const username = githubInput.value.trim();

    if (username === "") {
        alert("Xahiş edirik istifadəçi adını daxil edəsiniz");
    } else {
        githubRequest.getGithubRequest(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showInfo("danger", "Axtardığınız istifadəçi tapılmadı...");
                } else {
                    ui.addFromToUserUI(username);
                    Storage.addFromToStorage(username);
                    ui.addRequestUserUI(response.user)
                    ui.addRequestRepoUI(response.repo)
                    ui.showInfo("success", "Axtardığınız istifadəçi uğurla tapıldı...")
                }

            })
            .catch(err => ui.showInfo(err))
    }



    ui.clearInputValue();
    e.preventDefault();
}


function getFromToStorageAddUserUI() {
    let users = Storage.getFromToStorage();

    let result = "";

    users.forEach(x => {
        result += `<li class="list-group-item">${x}</li>`
    })

    githubList.innerHTML = result;
}


function clearAllUserUI() {
    if (confirm("İstifadəçilərin hamısını silmək istəyirsiniz ?")) {
        Storage.clearFromToStorage();
        ui.clearAllUserToUI();
    }
}