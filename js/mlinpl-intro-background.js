'use strict';

const canvas = document.getElementById("intro-background"),
      ctx = canvas.getContext("2d");

let fps = 30,
    framesInterval = 0,
    then = 0,
    width = 0,
    height = 0;

let bgParticles = [], // Background particles
    mgParticles = [], // Middle ground particles
    fgParticles = [], // Foreground particles
    distanceThreshold = 125,
    particlesDensity = 0.0002,
    backgroundColor = "#FFFFFF";


// Helper functions
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function rulletChoice(dict){
    let total = 0;
    for (let key in dict) total += dict[key];
    let r = Math.random() * total;
    for (let key in dict){
        r -= dict[key];
        if (r < 0) return key;
    }
}

function distVec2d(vec1, vec2){
    return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2))
}
   
function drawTriangle(p1, p2, p3){
    // Don't draw triangle if its area is too big
    const maxDist = Math.max(distVec2d(p1, p2), distVec2d(p1, p2), distVec2d(p2, p3));
    if (maxDist > distanceThreshold) return;

    // Stroke triangle
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    for (let p of [p1, p2, p3, p1]) ctx.lineTo(p.x, p.y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = p.color;
    ctx.stroke();
}

function drawParticle(p){
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawLine(p1, p2){
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = p1.lineColor;
    ctx.stroke();
}

function updateParticle(p){
    p.x += p.velX;
    p.y += p.velY;

    if(p.x < 0 || p.x > width) p.velX *= -1;
    if(p.y < 0 || p.y > height) p.velY *= -1;
}

function drawParticles(particles){
    // Update position of particles
    for (let p of particles) updateParticle(p);

    // Draw lines between particles in the same group
    for (let i = 0; i < particles.length - 1; i++){
        for(let j = i + 1;  j < particles.length; j++){
            const p1 = particles[i],
                  p2 = particles[j];
            if(distVec2d(p1, p2) > distanceThreshold) continue;

            for (let g of p1.groups){
                if (p2.groups.includes(g)){
                    drawLine(p1, p2);
                    break;
                }
            }
        }
    }

    // Draw all particles
    for (let p of particles) drawParticle(p);
}
    
function draw(){
    //console.log(bgParticles.length, mgParticles.length, fgParticles.length);
    //console.log(bgParticles[0], mgParticles[0], fgParticles[0]);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawParticles(bgParticles);
    drawParticles(mgParticles);
    drawParticles(fgParticles);
}
    
function createParticles(x, y, width, height, particlesDensity, colors, lineColors, groups, sizeMin, sizeRange) {
    let newParticlesCount = width * height * particlesDensity,
        newParticles = [];

    // Create new particles
    for(let i = 0; i < newParticlesCount; i++){
        newParticles.push({
            x: Math.random() * width + x,
            y: Math.random() * height + y,
            velY: Math.random() * 2 - 1,
            velX: Math.random() * 2 - 1,
            size: Math.random() * sizeRange + sizeMin,
            color: typeof colors === "string" ? colors : rulletChoice(colors),
            lineColor: typeof lineColors === "string" ? lineColors : rulletChoice(lineColors),
            groups: randomChoice(groups),
        });
    }

    return newParticles;
}

function spawnParticles(x, y, width, height) {
    const bgGroups = [[0, 1], [0, 2], [1, 2]];
    bgParticles.push(...createParticles(x, y, width, height, 0.00005, "#EEE", "#EEE", bgGroups, 5, 3));
    mgParticles.push(...createParticles(x, y, width, height, 0.00005, "#AAA", "#AAA", [[]], 2, 2));
    const fgGroups = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3], [0], [1], [2], [3]];
    fgParticles.push(...createParticles(x, y, width, height, 0.0001, 
        {"#FF0000": 0.1, "#000000": 0.9}, {"#000000": 0.3, "#222": 0.3, "#444": 0.3}, fgGroups, 3, 6));
}

function removeOutOfBoundsParticles(particles) {
    return particles.filter(function(p){
        return !(p.x < 0 || p.x > width || p.y < 0 || p.y > height);
    });
}
    
function resize() {
    console.log("Resizing canvas");
    // Add particles to the new parts of the canvas.
    const divWidth = canvas.offsetWidth - width,
          divHeight = canvas.offsetHeight - height;

    if(divWidth > 0) spawnParticles(width, 0, divWidth, height);
    if(divHeight > 0) spawnParticles(0, height, width, divHeight);
    if(divWidth > 0 || divHeight > 0) spawnParticles(width, height, divWidth, divHeight);

    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Remove particles that are out of bounds of the new canvas to improve performance.
    bgParticles = removeOutOfBoundsParticles(bgParticles);
    mgParticles = removeOutOfBoundsParticles(mgParticles);
    fgParticles = removeOutOfBoundsParticles(fgParticles);
}

function render() {
    const now = Date.now(),
          timeElapsed = now - then;

    // Limit framerate
    requestAnimationFrame(render);
    if (timeElapsed <= framesInterval) return;
    then = now;

    //console.log(canvas.offsetWidth, canvas.offsetHeight);
    if(width !== canvas.offsetWidth || height !== canvas.offsetHeight) resize();
    draw();
}

render();
    
