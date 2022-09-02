const init = [];
const createPlans = (perState = init, action) => {
    let { type, data } = action;
    switch (type) {
        case 'CREATE':
            return {
                undone: data.filter(item => !item.isCheck),
                done: data.filter(item => item.isCheck),
                main: data.filter(item => item.isMain),
            };
        case 'CHECKED':
            return {
                undone: data.filter(item => !item.isCheck),
                done: data.filter(item => item.isCheck),
                main: data.filter(item => item.isMain),
            };
        case 'MAIN':
            return {
                undone: data.filter(item => !item.isCheck),
                done: data.filter(item => item.isCheck),
                main: data.filter(item => item.isMain),
            };
        case 'DELETE':
            return {
                undone: data.filter(item => !item.isCheck),
                done: data.filter(item => item.isCheck),
                main: data.filter(item => item.isMain),
            };
        default:
            return perState;
    }
}

export default createPlans;