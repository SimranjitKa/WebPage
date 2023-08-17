const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function circleChaptaKaro(){
    clearTimeout(timeout);
    //Define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(details){
        var xdiff = details.clientX - xprev;
        var ydiff = details.clientY - yprev;

        xscale = gsap.utils.clamp(.7, 1.2, xdiff);
        yscale = gsap.utils.clamp(.7,1.2,ydiff);

        xprev = details.clientX;
        yprev = details.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function(){
            this.document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100000);
    });
}

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.7,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        duration: 1.2,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })
    .from("#herofooter", {
        y: '-10',
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1
    })
}

function circleMouseFollower(xscale, yscale){

    window.addEventListener("mousemove", function(details){
        this.document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    })

}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffRot = 0;

    elem.addEventListener("mouseleave", function(details){

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: .5
        });

    });

    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffRot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffRot)
        });

    });

});