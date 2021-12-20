// toggle varibles
const toggleeBtn = document.querySelector(".theme");
const body = document.querySelector('body');
const sunIcon = `<img src="./images/icon-sun.svg">`;
const moonIcon = `<img src="./images/icon-moon.svg">`;

// Default values;
body.classList.add(localStorage.getItem('currentTheme') || 'dark-theme');
toggleeBtn.innerHTML = localStorage.getItem('themeIcon') || sunIcon;

// toggle function;
const toggleTheme = () => {
    toggleeBtn.addEventListener('click', function() {
        // toggle themes;
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');

        // toggle icons onClick;
        body.classList.contains('dark-theme') ? this.innerHTML = sunIcon : this.innerHTML = moonIcon;

        // set localStorage;
        localStorage.setItem('currentTheme', body.classList);
        localStorage.setItem('themeIcon', this.innerHTML);
    })
}

toggleTheme();