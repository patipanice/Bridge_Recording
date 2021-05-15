//********************************************* คำนวนไพ่ และ ชนะรอบ ***************************************//

const resultRound = (arrData) => {
    console.log(".................... Resulting round state ....................");
    let firstChar = arrData[0].charAt(0);
    let maxValue = 0;
    let winRound = 'null';
    let indexWin = 0;
    //กรณีหน้าเดียวกันทั้งหมด parseInt => str>int , substring(from,to);
    if (firstChar == arrData[1].charAt(0) && firstChar == arrData[2].charAt(0) && firstChar == arrData[3].charAt(0)) {
        const arrNum = arrData.map(data => parseInt(data.substring(1, 3)));
        maxValue = Math.max(...arrNum);
        winRound = arrData.filter(arr => arr.substring(1, 3) == maxValue).toString();
        indexWin = arrData.indexOf(winRound); //หาว่าอยู่ตัวที่เท่าไหร่ใน arrData 
        indexWin = changeDirection(indexWin);
        return [winRound, indexWin];
    } else { //กรณีไม่ใช่หน้าเดียวกัน ให้คิดจากทรัมป์ 
        return [winRound, indexWin] = findMax(); //destructure return 2 value form function
    }
}


//ฟังก์ชั่นหาค่ามากสุดกรณีมีทรัมป์ ทุกรูปแบบ
const findMax = () => {
    const _find = arrData.filter(arr => arr.charAt(0) == trump);
    if (_find.length == 1) {
        winRound = _find.toString();
        indexWin = arrData.indexOf(winRound);
    } else {
        console.log("If length > 1");
        const arrNum = _find.map(data => parseInt(data.substring(1, 3)));
        maxValue = Math.max(...arrNum);
        winRound = arrData.filter(arr => arr.substring(1, 3) == maxValue).toString();
        indexWin = arrData.indexOf(winRound);
    }
    indexWin = changeDirection(indexWin);
    return [winRound, indexWin];
}

const changeDirection = (num) => {
    if (num == 0) {
        return "South";
    }
    else if (num == 1) {
        return "West";
    }
    else if (num == 2) {
        return "North";;
    }
    else if (num == 3) {
        return "East";
    }
}

module.exports = {resultRound};