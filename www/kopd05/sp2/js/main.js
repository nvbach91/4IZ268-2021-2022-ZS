const btn = document.getElementById("btn");


btn.addEventListener("click", ()=>{
    if(btn.value === "Dont click me!"){
        btn.value = "Oh you did it..";
    }else{
        btn.value= "Dont click me!";
    }
})