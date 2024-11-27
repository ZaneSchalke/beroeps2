window.onload = function () {
    const canvas = document.getElementById('spaceCanvas');
    const ctx = canvas.getContext('2d');


    canvas.width = 1920;
    canvas.height = 1080;

   
    const earth = { x: 500, y: 850 }; 
    const mars = { x: 1500, y: 400 }; 
    const controlPoint = { x: 1000, y: 300 }; 

    
    const backgroundImageURL = 'imgs/flightpath.jpg'; 

    
    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageURL;

    
    function drawCurvedDottedLine(start, end, control, dotSize, dashLength, gapLength) {
        
        const curveLength = 500; 

        
        const dashes = Math.floor(curveLength / (dashLength + gapLength));

        
        for (let i = 0; i < dashes; i++) {
            
            const t = i / dashes;  
            const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * control.x + t * t * end.x;
            const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * control.y + t * t * end.y;

            
            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2); 
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
    }

    
    function drawRocket(x, y) {
        ctx.font = '40px Arial';
        ctx.fillText('🚀', x, y); 
    }

    
    function drawFlag(x, y) {
        ctx.font = '50px Arial';  
        ctx.fillText('🏳️', x, y); 
    }

    
    let t = 0; 

    function animateRocket() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        
        drawCurvedDottedLine(earth, mars, controlPoint, 3, 8, 4);

        
        drawFlag(earth.x - 40, earth.y);  
        drawFlag(mars.x - 10, mars.y);    

        
        const x = (1 - t) * (1 - t) * earth.x + 2 * (1 - t) * t * controlPoint.x + t * t * mars.x;
        const y = (1 - t) * (1 - t) * earth.y + 2 * (1 - t) * t * controlPoint.y + t * t * mars.y;

        
        drawRocket(x, y);

        
        t += 0.0005; 

        
        if (t >= 1) {
            t = 0; 
        }

        
        requestAnimationFrame(animateRocket); 
    }

    
    backgroundImage.onload = function () {
        animateRocket(); 
    };
};
