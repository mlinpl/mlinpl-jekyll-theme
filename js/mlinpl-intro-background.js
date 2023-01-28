'use strict';

const canvas = document.getElementById("intro-background"),
      ctx = canvas.getContext("2d"),
      fps = 30,  // To make it less cpu intensive, we only update the canvas every 30 frames
      framesInterval = 1000 / 30;

let then = 0,
    width = 0,
    height = 0,
    bgParticles = [], // Background particles
    mgParticles = [], // Middle ground particles
    fgParticles = [], // Foreground particles
    distanceThreshold = 125,
    backgroundColor = "#FFFFFF",
    bgParticlesCfg = {
        colors: "#EEE",
        lineColors: "#EEE",
        sizeMin: 5,
        sizeRange: 3,
        speedMax: 0.5,
        groups: [[0, 1], [0, 2], [1, 2]],
        density: 0.0001
    },
    mgParticlesCfg = {
        colors: "#AAA",
        lineColors: "#AAA",
        sizeMin: 2,
        sizeRange: 2,
        speedMax: 0.75,
        groups: [[]], // This group of particles has no connecting lines
        density: 0.0001
    },
    fgParticlesCfg = {
        colors: {"#FF0000": 0.1, "#000000": 0.9},
        lineColors: {"#000": 0.3, "#222": 0.3, "#444": 0.3},
        sizeMin: 3,
        sizeRange: 6,
        speedMax: 1,
        groups: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3], [0], [1], [2], [3]],
        density: 0.0002
    };

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

    if(p.x < 0) p.x = width; // Wrap around the left and right
    if((p.y + p.size) < 0 || (p.y + p.size) > height) p.velY *= -1; // Bounce off the top and bottom
}

function drawParticles(particles){
    // Update position of particles
    for (let p of particles) updateParticle(p);

    // Draw lines between particles in the same group
    for (let i = 0; i < particles.length - 1; i++){
        for(let j = i + 1;  j < particles.length; j++){
            const p1 = particles[i],
                  p2 = particles[j];

            // This part can be done faster by creating indexes for groups, but I'm too lazy to implemt it
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
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawParticles(bgParticles);
    drawParticles(mgParticles);
    drawParticles(fgParticles);
}
    
function createParticles(x, y, width, height, particlesCfg) {
    let newParticlesCount = width * height * particlesCfg.density,
        newParticles = [];

    // Create new particles
    for(let i = 0; i < newParticlesCount; i++){
        newParticles.push({
            x: Math.random() * width + x,
            y: Math.random() * height + y,
            velY: (Math.random() * 2 - 1) * particlesCfg.speedMax,
            velX: (Math.random() * 2 - 1) * particlesCfg.speedMax,
            size: Math.random() * particlesCfg.sizeRange + particlesCfg.sizeMin,
            color: typeof particlesCfg.colors === "string" ? particlesCfg.colors : rulletChoice(particlesCfg.colors),
            lineColor: typeof particlesCfg.lineColors === "string" ? particlesCfg.lineColors : rulletChoice(particlesCfg.lineColors),
            groups: randomChoice(particlesCfg.groups),
        });
    }

    return newParticles;
}

function spawnParticles(x, y, width, height) {
    bgParticles.push(...createParticles(x, y, width, height, bgParticlesCfg));
    mgParticles.push(...createParticles(x, y, width, height, mgParticlesCfg));
    fgParticles.push(...createParticles(x, y, width, height, fgParticlesCfg));
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
    
