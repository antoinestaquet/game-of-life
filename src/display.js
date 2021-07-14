// Used for testing purposes, before figuring out the canvas function

const display = document.querySelector(".game-display");

function displayHTML(array){
    display.textContent = "";

    for(let i = 0; i < array.length; i++){
        let br = document.createElement("br");
        let spanLine = document.createElement("span");

        for(let j = 0; j < array[i].length; j++){
            let element = document.createElement("span");
            if(array[i][j] === 1 ){
                element.textContent="O"; 
                element.setAttribute('class', 'o')
            } else {
                element.textContent="X"; 
                element.setAttribute('class', 'x')
            }
            spanLine.append(element);
            display.append(spanLine);
        }
        
        display.append(br);
    }
}

export { displayHTML };