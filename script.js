const button = document.getElementById("generate-button");
const input = document.getElementById("input");
const codeSize = document.getElementById("code-size");
const loading = document.getElementById("loading");
const qrCode = document.getElementById("qr-code");
let apiKey;

loading.style.display = "none";

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
    };

    input.value = "";
}

button.addEventListener("click", () => {
    qrCode.style.display = "none";
    generate();
});