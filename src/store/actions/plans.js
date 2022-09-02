import { getAllPlan } from "@/api/index.js";

export const createAsyncPlans = () => {//异步
    return async (dispatch) => {
        let meg = (await getAllPlan()).data;
        dispatch({ type: 'CREATE', data: meg.data });
    }
}

export const checkedAsyncPlans = () => {//异步
    return async (dispatch) => {
        let meg = (await getAllPlan()).data;
        dispatch({ type: 'CHECKED', data: meg.data })
    }
}
export const mainAsyncPlans = () => {
    return async (dispatch) => {
        let meg = (await getAllPlan()).data;
        dispatch({ type: 'MAIN', data: meg.data })
    }
}
export const deleteAsyncPlans = () => {
    return async (dispatch) => {
        let meg = (await getAllPlan()).data;
        dispatch({ type: 'DELETE', data: meg.data })
    }
}