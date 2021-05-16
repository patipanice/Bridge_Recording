const editArrData = (arrData, first_direction) => {
    let newarrData  = [];
    if (first_direction == "South") {
        //console.log("first_direction : South"); // Souths
        newarrData[0] = arrData[0];
        newarrData[1] = arrData[1];
        newarrData[2] = arrData[2];
        newarrData[3] = arrData[3];
    }
    else if (first_direction == "West") { // West
       // console.log("first_direction : West");
        newarrData[0] = arrData[1];
        newarrData[1] = arrData[2];
        newarrData[2] = arrData[3];
        newarrData[3] = arrData[0];
    } else if (first_direction == "North") { // North
       // console.log("first_direction : North");
        newarrData[0] = arrData[2];
        newarrData[1] = arrData[3];
        newarrData[2] = arrData[0];
        newarrData[3] = arrData[1];
    } else if (first_direction == "East") { // East
      //  console.log("first_direction : East");
        newarrData[0] = arrData[3];
        newarrData[1] = arrData[0];
        newarrData[2] = arrData[1];
        newarrData[3] = arrData[2];
    }
    console.log("[Edit_Data] : " + newarrData);
    return newarrData;
}

module.exports = editArrData;