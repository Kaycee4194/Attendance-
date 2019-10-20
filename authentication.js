function isAuthenticated() {
    const isLoggedIn = localStorage.getItem('user');
    // checks the availability of a user in local storage

    if(!isLoggedIn) {
        window.location.href=("./homepage.html");
        // if no user is logged on, takes you back to the homepage
    }
}

isAuthenticated();