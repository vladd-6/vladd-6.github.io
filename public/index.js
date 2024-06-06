function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}  

function createAirplane() {
    const airplane = document.createElement('div');
    airplane.className = 'airplane';
    var startX = Math.random() * window.innerWidth;
    var startY = document.body.scrollHeight + 1000;

    fetch('random.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data =>{
        randomIndex = getRandomInt(data.length) - 1;
        const randomObject = data[randomIndex];
        airplane.style.backgroundImage = "url('" + randomObject.image + "')";
        console.log(randomObject.image);
        if(randomIndex == 0){
            airplane.style.width = randomObject.width * 1.1 + "px";
            airplane.style.height = randomObject.height * 1.1 + "px";
        }
        else{
            airplane.style.width = randomObject.width / 1.5 + "px";
            airplane.style.height = randomObject.height / 1.5 + "px";
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
    
    airplane.style.left = `${startX}px`;
    airplane.style.top = `${startY}px`;
    document.body.appendChild(airplane);

    const duration = 5000; 
    const startTime = Date.now();
    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = elapsed / duration;
        const currentY = startY - (startY + 100) * progress;
        airplane.style.top = `${currentY}px`;

        if (currentY > -1000) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(airplane);
        }
    }
    requestAnimationFrame(animate);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

window.onload = function () {
    const title = document.querySelector("#title");
    const afisareCnt = document.querySelector('#cnt');
    var cnt = 0;

    setInterval(createAirplane, 4000);

    title.style.color = "lightgray";

    title.addEventListener("click", (event)=>{
        localStorage.setItem("counter", ++cnt);
        afisareCnt.innerHTML = localStorage.getItem("counter");
        event.target.style.color = getRandomColor();
    });
}