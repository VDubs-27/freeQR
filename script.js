const button = document.getElementById("generate-button");
const input = document.getElementById("input");
const codeSize = document.getElementById("code-size");
const loading = document.getElementById("loading");
const qrCode = document.getElementById("qr-code");
const copyButton = document.getElementById("copy");
const download = document.getElementById("download");
const restart = document.getElementById("restart");
let apiKey;

loading.style.display = "none";
restart.style.display = "none";

function generate() {
    if (!input.value || input.value.trim() === "") {
        alert("Please provide an input!")
        return;
    }

    qrCode.src = "";
    qrCode.style.display = "none";
    loading.style.display = "block";

    apiKey = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;
    qrCode.src = apiKey;
    qrCode.title = `${input.value}`;
    qrCode.style.display = "block";

    qrCode.onload = () => {
        loading.style.display = "none";
        download.style.display = "inline-flex";
        button.style.display = "none";
        restart.style.display = "block";
        input.style.display = "none";
    };

    input.value = "";
}

button.addEventListener("click", () => {
    qrCode.style.display = "none";
    generate();
});

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText("main--anyweatheranytime.netlify.app")
    alert("Site link copied to clipboard - share it with others!")
});

download.addEventListener("click", async () => {
    if (!qrCode.src) {
        alert("No QR code generated to download!");
        return;
    }

    try {
        const response = await fetch(qrCode.src);
        if (!response.ok) throw new Error("Failed to fetch the QR code image");

        const blob = await response.blob();

        const objectURL = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = objectURL;
        link.download = "QRcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(objectURL);
    } catch (error) {
        console.error("Error downloading the QR code:", error);
        alert("Failed to download the QR code. Please try again.");
    }
});
