var accountInfoList = [];



var rudyTimer = (function() {

    console.log("asdafsasf");
    var msg = "Rudy!";
    var delayMsg = function delayMsg2() {
        alert(msg);
    }
	return delayMsg;
})();


function createAcnt() {
    let txtAcntName = document.getElementById("txtAcntName").value;
    let txtDeposit = parseInt(document.getElementById("txtDeposit").value);
    let textArea = document.getElementById("textArea");
    let strAcnts = "";

    let isNew = true;

    for (let i = 0; i < accountInfoList.length; i++) {
    	if (accountInfoList[i].acntName == txtAcntName) {
    		txtDeposit = txtDeposit + parseInt(accountInfoList[i].balance);
    		accountInfoList[i].balance = txtDeposit;
    		isNew = false;
    		break;
    	}
    }

    if (isNew)
    	accountInfoList.push({ acntName: txtAcntName, balance: txtDeposit});

    for (let i = 0; i < accountInfoList.length; i++) {
    	strAcnts += "Account name: " + accountInfoList[i].acntName + " Balance: " + accountInfoList[i].balance + "\n";
    }
    textArea.value = strAcnts;
}