const vision = require('@google-cloud/vision');
const fs = require('fs');
const puppeteer = require('puppeteer');
const axios = require('axios');

// Google Vision API müştəri obyektini yaratmaq
const client = new vision.ImageAnnotatorClient();

// Şəkili base64-ə çevirmək üçün funksiyanı yazırıq
async function imageToBase64(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        return buffer.toString('base64');
    } catch (error) {
        console.error("Şəkil yüklənərkən xəta baş verdi:", error);
        return null;
    }
}

// Google Vision API ilə şəkildən mətn çıxarma
async function extractTextWithGoogleVision(base64Image) {
    try {
        const [result] = await client.textDetection({ image: { content: base64Image } });
        const fullText = result.textAnnotations.length > 0 ? result.textAnnotations[0].description : 'Mətn tapılmadı.';
        return fullText;
    } catch (error) {
        console.error("Google Vision API ilə xəta:", error);
        return null;
    }
}

(async () => {
    try {
        console.log("🔄 Puppeteer ilə browser açılır...");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        console.log("🔄 Sayfaya gedirik...");
        await page.goto('https://monitoring.e-kassa.gov.az/#/index?doc=GagLyVc9LSbAGzku7xcxXUsBYkpESWKTREEd5ZeRsr2Z', { waitUntil: 'networkidle0' });

        console.log("🔄 Sayfanın tam yüklənməsini gözləyirik...");
        await page.waitForSelector('body');

        // Sayfdan 'alt="document"' olan şəkilləri tapırıq
        console.log("🔄 'alt=\"document\"' olan şəkilləri tapırıq...");
        const images = await page.evaluate(() => {
            const imgTags = document.querySelectorAll('img[alt="document"]');
            const imgUrls = [];
            imgTags.forEach(img => {
                if (img.src) {
                    imgUrls.push(img.src); // Şəkil URL-lərini alırıq
                }
            });
            return imgUrls;
        });

        console.log("🖼 'alt=\"document\"' olan şəkillər:\n", images);

        // Şəkil varsa OCR tətbiq edirik
        if (images.length > 0) {
            const base64Image = await imageToBase64(images[0]);
            if (base64Image) {
                console.log("🔄 Google Vision ilə OCR əməliyyatı başlayır...");
                const text = await extractTextWithGoogleVision(base64Image);
                console.log("📝 Google Vision-dan çıxarılan mətn:\n", text);
            }
        } else {
            console.log("❌ 'alt=\"document\"' atributuna sahib şəkil tapılmadı.");
        }

        await browser.close();
    } catch (error) {
        console.error("❌ Xəta baş verdi:", error);
    }
})();
