const templates = {
	TEMPLATE_1: (userData,qr,link) => {
    return `<!DOCTYPE html>
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
                background-image: url('https://i.ibb.co/s1kjBtj/bg1.png');
                font-family: 'Montserrat', sans-serif;
                position: absolute;
            }
            #container div {
                position: absolute;
                width: 100%;
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <div id="container">
            <div style="font-size: 55px;font-weight: 600;top: 68px;">Certificate of Completion</div>
            <div style="top: 140px;font-size: 38px;">This is to certify that</div>
            <div style="font-size: 38px; font-weight: 600;margin: 16px 0;font-style: oblique;top: 180px;">${userData.name}</div>
            <div style="font-size: 38px; top: 260px;">has completed the course</div>
            <div style="font-size: 36px; font-weight: 600;margin: 12px 0;font-style: oblique;top: 310px;">${userData.event}</div>
            <div style="font-size: 38px;top: 380px;">with a score of <span style="font-weight: 600;">${userData.score}</span></div>
            <div style="font-size: 36px;font-weight: 600;margin: 8px 0;font-style: oblique;top: 440px;">Dated: ${userData.date}</div>
            <div style="bottom: 40px;right: 40px;width: fit-content; text-align: right;"><img src="${qr}" style="width: 148px; height: 148px;"></div>
            <div style="bottom: 18px;right: 18px; font-size: 14px;width: fit-content;"><a href="${link}" style="font-weight: 600;">${link}</div>
            <div style="top: 30px;"><img src="https://certify-hax.s3.ap-south-1.amazonaws.com/certify.png" style="width: 160px; margin-left: -25px;"></div>
        </div>
    </body>
    </html>`
  },
  TEMPLATE_2: (userData) => {
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
            font-family: 'Montserrat', sans-serif;
            position: absolute;
        }
        #container div {
            position: absolute;
            width: 100%;
            text-align: center;
        }
    </style>
</head>

<body>
    <div id="container">
        <div style="font-size: 55px;font-weight: 600;top: 68px;">Certificate of Completion</div>
        <div style="top: 140px; font-size: 38px;">This is to certify that</div>
        <div style="font-size: 38px; font-weight: 600;margin: 16px 0;font-style: oblique;top: 180px;">${userData.name}</div>
        <div style="font-size: 38px; top: 260px;">has completed the course</div>
        <div style="font-size: 36px; font-weight: 600;margin: 12px 0;font-style: oblique;top: 310px;">${userData.event}</div>
        <div style="font-size: 38px; top: 380px;">with a score of <span style="font-weight: 600;">${userData.score}/100</span></div>
        <div style="font-size: 36px;font-weight: 600;margin: 8px 0;font-style: oblique;top: 440px;">Dated: ${userData.date}</div>
        <div style="bottom: 18px;right: 18px; font-size: 14px;width: fit-content;"><a href="${userData.link}" style="text-decoration: none; color: #fff; font-weight: 600;">${userData.link}</div>
        <div style="top: 30px;"><img src="https://certify-hax.s3.ap-south-1.amazonaws.com/certify.png" width="160px"></div>
    </div>
</body>
</html>
    `
  },
  TEMPLATE_3: (userData) => {
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
            background-image: url('https://i.ibb.co/3Nrr0z0/bg3.jpg');
            font-family: 'Montserrat', sans-serif;
            position: absolute;
            text-align: center;
        }

        #container div {
            position: absolute;
            width: 100%;
            text-align: center;
        }

        #date-stamp {
            font-weight: 600;
            margin: 30px 0 -50px 46%;
            font-style: oblique;
            background-color: #EA1B35;
            width: 100px !important;
            color: #1F2837;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transform: rotate(45deg);
            box-shadow: 2px 2px 1px #00000022;
        }

        #date-stamp div {
            transform: rotate(-45deg);
        }
    </style>
</head>

<body>
    <div id="container">
        <div style="font-size: 50px;font-weight: 600;top: 70px;">Certificate of Completion</div>
        <div style="top: 150px;font-size: 25px;">This is to certify that</div>
        <div style="font-size: 38px; font-weight: 600;margin: 16px 30%;font-style: oblique;color: #EA1B35;padding: 10px 30px;border-top: 3px solid #EA1B35;border-bottom: 3px solid #EA1B35;top: 180px;width: fit-content;/* margin: auto; */">${userData.name}</div>
        <div style="font-size: 25px; top: 280px;">has completed the course</div>
        <div style="font-size: 36px; font-weight: 600;margin: 12px 0;font-style: oblique;top: 320px;">${userData.event}</div>
        <div style="font-size: 38px; top: 400px;">with a score of <span style="font-weight: 600;">${userData.score}/100</span></div>
        <div id="date-stamp" style="top: 440px;"><div>${userData.date}</div></div>
        <div style="bottom: 18px;right: 18px; font-size: 12px;width: fit-content;"><a href="${userData.link}" style="text-decoration: none; color: #ddd;">${userData.link}</div>
        <div style="top: 30px;"><img src="https://certify-hax.s3.ap-south-1.amazonaws.com/certify.png" width="160px">
        </div>
    </div>
</body>

</html>
    `
  }
};

module.exports = templates;
