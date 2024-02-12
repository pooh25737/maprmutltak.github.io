const result = document.getElementById("result");
const listItems = [];
const filter = document.querySelector(".filter");
let defaultRoomValue = '';
async function getData() {
    result.innerHTML = "";
    listItems.length = 0;
    let runnum = 1;
    try {
        const response = await fetch("./data.json");
        const items = await response.json();
        if (items.length > 0) {
            defaultRoomValue = items[0].room;
        }
        items.forEach((data) => {
            const li = document.createElement("li");
            listItems.push(li);
            li.innerHTML = `
                <h1>${runnum}</h1>
                <div class="info">
                    <h4>${data.town}</h4>
                    <div class="room" style="display:none">${data.room}</div>
                </div>
            `;
            runnum++;
            result.appendChild(li)
        });
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}
function handleInput(e) {
    const userInput = e.target.value.trim() 
    if (!userInput) {
        listItems.forEach((item) => {
            item.classList.remove("hide")
        })
        return;
    }
    listItems.forEach((item) => {
        const roomNumbers = item.querySelector('.info .room').innerText.split(',');
        const isMatch = roomNumbers.some((roomNumber) => userInput.startsWith(roomNumber.trim()));
        if (isMatch) {
            item.classList.remove("hide")
        } else {
            item.classList.add("hide")
        }
    });
}

async function initialize() {
    await getData();
    filter.addEventListener("input", handleInput)
}
initialize();
loadphoto=()=>{
    const picture = "./mypicture.jpg"
    const dowloadlink = document.createElement("a")
    dowloadlink.download="./mypicture.jpg"
    dowloadlink.href=picture
    document.body.appendChild(dowloadlink)
    dowloadlink.click()
    document.body.removeChild(dowloadlink)
}