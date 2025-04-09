let qrData = "Farid";

const qrCode = new QRCodeStyling({
    data: qrData,
    dotsOptions: {
        color: "#1C304F",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#98BBF5",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
    }
});

qrCode.append(document.getElementById("qrcode"));

document.getElementById("qr-info").textContent = qrData;