//TODO: Convert this and all other js files to angular 1
var userObj;
var authenticated = false;
String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
window.addEventListener('load', function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function (accessToken) {
                userObj = user;
                initBaseGui(displayName, email, emailVerified, photoURL, uid, providerData)
            })
        } else {
            // User is signed out.
            failedToLoad()
        }
    }, function (error) {
        console.log(error)
    })
});
var initBaseGui = function (name, email, emailVerified, photoURL, uid, providerData) {
    document.getElementById('user').setAttribute('src', photoURL);
    document.getElementById('name').textContent = name;
    document.getElementById('email').textContent = email;
    authenticated = true;
    getRoundInfo()
};
var failedToLoad = function () {
    window.location.assign('/')
};
var getRoundInfo = function () {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this);
            success(eval("(" + this.responseText + ")"))
        }
    };
    xhttp.open("GET", "/round_info", true);
    xhttp.send()
};
var success;
success = function (res) {
    var template = "<tr><td>{0}</td><td>{1}/4</td><td><a class=\"waves-effect waves-light btn\">join</a></td></tr>";
    console.log(template.format(res.data[0].id, res.data[0].players));
    var selector = "#rounds";
    for(var i = 0;i<res.data.length;i++){
        $(selector).html($(selector).html() + template.format(res.data[i].id, res.data[i].players))
    }
};