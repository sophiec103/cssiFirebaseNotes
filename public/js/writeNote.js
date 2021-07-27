let googleUser;

window.onload = (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in as', user.displayName);
            googleUser = user;
            document.querySelector("#greeting").innerHTML = "Welcome, " + user.displayName + "!";
        } else {
            window.location = 'index.html'
        }
    })
}

function handleNoteSubmit(){
    const title = document.querySelector('#noteTitle').value;
    const note = document.querySelector("#noteText").value;

    const d = new Date();
    const year = d.getFullYear();	//Get the year as a four digit number (yyyy)
    const month = d.getMonth() + 1;	//Get the month as a number (0-11)
    const day = d.getDate();	//Get the day as a number (1-31)
    const hour = d.getHours();	//Get the hour (0-23)
    const mins = d.getMinutes(); //Get the minute (0-59)
    const created = day + "/" + month + "/" + year + " " + hour + ":" + mins;

    firebase.database().ref(`users/${googleUser.uid}`).push({
        title: title,
        note: note,
        created: created,
    });

    document.querySelector('#noteTitle').value = "";
    document.querySelector("#noteText").value = "";
}