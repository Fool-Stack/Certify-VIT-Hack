const templates = {
	TEMPLATE_1: (userData) => {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet">
        <style>
            #container {
                width: 1080px;
                height: 608px;
                margin: 0;
                padding: 0;
                background-image: url('https://i.ibb.co/V3wy1pf/bg2.png');
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: 'Montserrat', sans-serif;
                position: absolute;
            }
        </style>
    </head>
    
    <body>
        <div id="container">
            <div style="font-size: 55px;font-weight: 600;margin-bottom: 16px;">Certificate of Completion</div>
            <div style="font-size: 40px;">This is to certify that</div>
            <div style="font-size: 38px;font-weight: 600;margin: 16px 0;font-style: oblique;">${userData.name}</div>
            <div style="font-size: 38px;">has completed the course</div>
            <div style="font-size: 36px;font-weight: 600;margin: 12px 0;font-style: oblique;">${userData.event}</div>
            <div style="font-size: 38px;">with a score of <span style="font-weight: 600;">${userData.score}</span></div>
            <div style="font-size: 36px;font-weight: 600;margin: 8px 0;font-style: oblique;">Dated: ${userData.date}</div>
            <div style="position: absolute; bottom: 40px; left: 40px;"><img src="../../out.png"></div>
            <div style="position: absolute; top: 30px; right: 50px; background-color: #ffffff88;"><img src="https://certify-hax.s3.ap-south-1.amazonaws.com/certify.png" width="160px"></div>
        </div>
    </body>
    </html>
    `
  }
};

module.exports = templates;
