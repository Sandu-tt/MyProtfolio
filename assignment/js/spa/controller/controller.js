document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("homePage").style.display = 'inline-block';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("home").addEventListener("click", function () {
    document.getElementById("homePage").style.display = 'block';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("items").addEventListener("click", function () {
    document.getElementById("homePage").style.display = 'none';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'block';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("customer").addEventListener("click", function () {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("customerPage").style.display = 'block';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("orders").addEventListener("click", function () {
    document.getElementById("homePage").style.display = 'none';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'block';
});


