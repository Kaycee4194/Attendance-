function isAuthenticated() {
    const isLoggedIn = localStorage.getItem('user');

    if(!isLoggedIn) {
        window.location.href=("./homepage.html");
    }
}

isAuthenticated();