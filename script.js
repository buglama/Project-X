setTimeout(() => {
    document.querySelector(".loader").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".container").style.opacity = "1";
        document.querySelector(".loader").style.display = "none";
    }, 1000); // Loader tam itəndən sonra container göstərilir
}, 1000);

(async () => {
    try {
        console.log("Proxy URL və target URL-in başlanğıcını yoxlayırıq...");

        const proxyUrl = "https://api.allorigins.win/get?url=";
        const targetUrl = "https://monitoring.e-kassa.gov.az/#/index?doc=GagLyVc9LSbAGzku7xcxXUsBYkpESWKTREEd5ZeRsr2Z";

        console.log("Fetch etməyə başlayırıq...");
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));

        console.log("Response gəldi. JSON-a çevrilir...");
        const data = await response.json();

        // HTML-i analiz et
        console.log("HTML məzmunu parsera göndərilir...");
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");

        // Saytdan bütün mətnləri çıxar
        console.log("Saytdan mətnlər götürülür...");
        const allText = doc.body.innerText;

        console.log("Saytdan götürülən mətn:\n", allText);
    } catch (error) {
        console.error("Xəta baş verdi:", error);
    }
})();
