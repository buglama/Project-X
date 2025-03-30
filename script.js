setTimeout(() => {
    document.querySelector(".loader").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".container").style.opacity = "1";
        document.querySelector(".loader").style.display = "none";
    }, 1000); // Loader tam itəndən sonra container göstərilir
}, 1000);