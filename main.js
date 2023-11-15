// document.documentElement.scrollTop 

function between(b1,x,b2){
    return (b1<=x&&x<=b2);
}

function smoothStep(x){
    if (x<=0){
        return 0
    } else if (x>=1) {
        return 1
    } else {
        return (6*(x**5))-(15*(x**4))+(10*(x**3));
    }
}

function moveto(start,end,duration,x){
    return start+((end-start)*smoothStep(x/duration));
}

function get_left(x){
    if (between(0,x,500)){
        return 10;
    } else if (between(500,x,1000)){
        return moveto(10,260,500,x-500);
    } else if (between(1000,x,2000)){
        return 260;
    } else if (between(2000,x,3000)){
        return moveto(260,500,1000,x-2000);
    } else {
        return 500;
    }
}

function get_top(x){
    if (between(0,x,500)){
        return moveto(0,window.innerHeight/2-100,500,x);
    } else {
        return (window.innerHeight/2)-100;
    }
}

const redbox=document.getElementById("redbox");
const greenbox=document.getElementById("greenbox");
const bluebox=document.getElementById("bluebox");

const scroll_indicator=document.getElementById("scroll_indicator");

var scrollAmount;
addEventListener("scroll", (event) => {
    // console.log(document.documentElement.scrollTop);
    scrollAmount=document.documentElement.scrollTop;

    scroll_indicator.innerText=Math.round(scrollAmount*100)/100;

    if (scrollAmount>=0&&scrollAmount<=1000){
        redbox.classList.remove("hidden");
    } else {
        redbox.classList.add("hidden");
    }
    redbox.style.left=get_left(scrollAmount)+"px";
    redbox.style.top=get_top(scrollAmount)+"px";

    if (scrollAmount>=1000&&scrollAmount<=2000){
        bluebox.classList.remove("hidden");
    } else {
        bluebox.classList.add("hidden");
    }
    bluebox.style.left=get_left(scrollAmount)+"px";
    bluebox.style.top=get_top(scrollAmount)+"px";

    if (scrollAmount>=2000){
        greenbox.classList.remove("hidden");
    } else {
        greenbox.classList.add("hidden");
    }
    greenbox.style.left=get_left(scrollAmount)+"px";
    greenbox.style.top=get_top(scrollAmount)+"px";
});