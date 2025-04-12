let qrData = "M 1828 592";

const qrCode = new QRCodeStyling({
    data: qrData,
    dotsOptions: {
        color: "#98BBF5",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#1C304F",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
    }
});

qrCode.append(document.getElementById("qrcode"));

document.getElementById("qr-info").textContent = qrData;



let qrData1 = qrData;

const qrCode1 = new QRCodeStyling({
    data: qrData1,
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

qrCode1.append(document.getElementById("qrcode1"));

document.getElementById("qr-info1").textContent = qrData;