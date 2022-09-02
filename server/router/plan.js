const query = require("../db/index.js");
function Bool(str){
    if(str==='true'){
        return true;
    }
    return false;
}

exports.postPlan = async (req, res) => {
    let insertPlan = 'insert into plans set ?';
    const planInfo = {
        plan:req.body.plan,
        endtime:req.body.endTime,
        starttime:req.body.startTime,
        is_checked:req.body.isCheck,
        is_main:req.body.isMain,
        is_delete:req.body.isDelete,
        user_id: req.auth.id
    }
    try {
        const result = await query(insertPlan, planInfo);
        if (result.affectedRows !== 1) {
            res.cc("制定计划失败！");
            return;
        }
        res.cc("成功制定计划！", 0);
    } catch (error) {
        res.cc(error);
    }
}

//获取所有的计划
exports.getAllPlan = async (req, res) => {
    let selectAllPlan = "select * from plans where is_delete=0 and user_id=? order by id desc";
    const result = await query(selectAllPlan,req.auth.id);
    if (result.length < 1) {
        res.cc("获取失败");
        return;
    }
    const arr=[];
    result.forEach(item => {
        arr.push({
            id:item.id,
            plan:item.plan,
            endTime:item.endtime,
            startTime:item.starttime,
            isCheck:Bool(item.is_checked),
            isDelete:item.is_delete,
            isMain:item.is_main
        })
    });
    res.send({
        status: 0,
        message: '获取所有的计划成功！',
        data: arr
    });
}

//获取未完成的计划
exports.getUndonePlan = async (req, res) => {
    let selectUndonePlan = "select * from plans where is_checked='false' and is_delete=0 order by id desc ";
    const result = await query(selectUndonePlan);
    if (result.length < 1) {
        res.cc("获取失败");
        return;
    }
    const arr=[];
    result.forEach(item => {
        arr.push({
            id:item.id,
            plan:item.plan,
            endTime:item.endtime,
            startTime:item.starttime,
            isCheck:Bool(item.is_checked),
            isDelete:item.is_delete,
            isMain:item.is_main
        })
    });
    res.send({
        status: 0,
        message: '获取未完成的计划成功！',
        data: arr
    });
}

//修改计划是否完成
exports.updateCheckPlan = async (req, res) => {
    let updateCheck = `update plans set is_checked=? where id=? and user_id=? and is_delete=0`;
    const result = await query(updateCheck, [req.body.isCheck, req.body.id, req.auth.id]);
    console.log(result);
    if (result.affectedRows != 1) {
        res.cc("修改失败！");
        return;
    }
    res.cc('修改成功！', 0);
}

//修改计划是否重要
exports.updateMainPlan = async (req, res) => {
    let updateMain = `update plans set is_main=? where id=? and user_id=? and is_delete=0`;
    const result = await query(updateMain, [req.body.isMain, req.body.id, req.auth.id]);
    if (result.affectedRows != 1) {
        res.cc("修改失败！");
        return;
    }
    res.cc('修改成功！', 0);
}

//修改计划是否删除
exports.updateDeletePlan = async (req, res) => {
    let updateDelete = `update plans set is_delete=1 where id=? and user_id=?`;
    const result = await query(updateDelete, [req.body.id, req.auth.id]);
    if (result.affectedRows != 1) {
        res.cc("修改失败！");
        return;
    }
    res.cc('删除成功！', 0);
}

//获取完成的计划
exports.getDonePlan = async (req, res) => {
    let selectDonePlan = "select * from plans where is_checked='true' and is_delete=0";
    const result = await query(selectDonePlan);
    if (result.length < 1) {
        res.cc("获取失败");
        return;
    }
    const arr=[];
    result.forEach(item => {
        arr.push({
            id:item.id,
            plan:item.plan,
            endTime:item.endtime,
            startTime:item.starttime,
            isCheck:Bool(item.is_checked),
            isDelete:item.is_delete,
            isMain:item.is_main
        })
    });
    res.send({
        status: 0,
        message: '获取完成的计划成功！',
        data: arr
    });
}

//获取重要的计划
exports.getMainPlan = async (req, res) => {
    let selectMainPlan = "select * from plans where is_main=1 and is_delete=0";
    const result = await query(selectMainPlan);
    if (result.length < 1) {
        res.cc("获取失败");
        return;
    }
    const arr=[];
    result.forEach(item => {
        arr.push({
            id:item.id,
            plan:item.plan,
            endTime:item.endtime,
            startTime:item.starttime,
            isCheck:Bool(item.is_checked),
            isDelete:item.is_delete,
            isMain:item.is_main
        })
    });
    res.send({
        status: 0,
        message: '获取重要的计划成功！',
        data: arr
    });
}