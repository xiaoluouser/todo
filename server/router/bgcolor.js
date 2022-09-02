const query = require('../db/index.js');

//保存背景颜色
exports.saveBgcolor = async (req, res) => {
    //查询背景颜色
    let selectBgcolor = 'select count(*) from bgcolor where color=? and area=? and user_id=?';
    const sResult = await query(selectBgcolor, [req.body.color, req.body.area, req.auth.id]);
    if (sResult[0]['count(*)'] > 0) {
        res.cc("颜色已存在");
        return;
    }
    //添加背景颜色
    let insertBgcolor = 'insert into bgcolor set ?';
    const bgcolor = {
        ...(req.body),
        user_id: req.auth.id,
    }
    const addresult = await query(insertBgcolor, bgcolor);
    if (addresult.affectedRows !== 1) {
        res.cc("添加颜色失败");
        return;
    }
    res.cc("添加成功！",0);
}

//切换背景颜色
exports.changeBgcolor = async (req, res) => {
    //切换
    //将其余的选择状态置为空
    let emptySelect = "update bgcolor set is_select='false' where id>=1 and area=?";
    const eResult = await query(emptySelect, req.body.area);
    if (eResult.affectedRows < 0) {
        return;
    }
    let updateBgcolor = "update bgcolor set is_select='true' where color=? and area=? and user_id=?";
    const result = await query(updateBgcolor, [req.body.color, req.body.area, req.auth.id]);
    if (result.affectedRows != 1) {
        res.cc("切换失败！");
        return;
    }
    res.cc('切换成功！', 0);
}

//获取背景颜色
exports.getBgcolor = async (req, res) => {
    let selectBgcolor = "select * from bgcolor where is_select='true' and area=? and user_id=?";
    const result = await query(selectBgcolor, [req.query.area, req.auth.id]);
    if (result.length != 1) {
        res.cc("获取背景颜色失败！");
        return;
    }
    res.send({
        status: 0,
        message: '获取背景颜色成功！',
        data: result
    })
}
