const templates = {
	TEMPLATE_1: (userData,qr) => {
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
            background-image: url('https://i.ibb.co/s1kjBtj/bg1.png');
            /* display: flex; */
            /* flex-direction: column; */
            align-items: center;
            justify-content: center;
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
        <div style="font-size: 38px;font-weight: 600;margin: 16px 0;font-style: oblique;top: 180px;">${userData.name}</div>
        <div style="font-size: 38px;top: 260px;">has completed the course</div>
        <div style="font-size: 36px;font-weight: 600;margin: 12px 0;font-style: oblique;top: 310px;">${userData.event}</div>
        <div style="font-size: 38px;top: 380px;">with a score of <span style="font-weight: 600;">${userData.score}/100</span></div>
        <div style="font-size: 36px;font-weight: 600;margin: 8px 0;font-style: oblique;top: 440px;">Dated: ${userData.date}</div>
        <div style="bottom: 40px;left: 40px;width: fit-content;"><canvas id="canvas" height="132" width="132" style="height: 132px; width: 132px;"></canvas></div>
        <div style="top: 30px;left: 50px;background-color: #ffffff88;width: fit-content;"><img src="https://certify-hax.s3.ap-south-1.amazonaws.com/certify.png" width="160px"></div>
        <div><img src = ${qr}></div>
        </div>
</body>


</html>
    `
  }
};

module.exports = templates;
