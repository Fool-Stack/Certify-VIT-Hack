const templates = {
	TEMPLATE_1: (userData) => {
    return `
    <div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878">
    <div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878">
           <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
           <br><br>
           <span style="font-size:25px"><i>This is to certify that</i></span>
           <br><br>
           <span style="font-size:30px"><b>${userData.name}</b></span><br/><br/>
           <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/>
           <span style="font-size:30px">${userData.event}</span> <br/><br/>
           <span style="font-size:20px">with score of <b>${userData.grade}%</b></span> <br/><br/><br/><br/>
           <span style="font-size:25px"><i>dated</i></span><br>
          ${userData.date}
          <span style="font-size:30px">$dt</span>
    </div>
    </div>
    `
  }
};

module.exports = templates;
