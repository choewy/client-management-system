import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { addCustomer } from "../actions/actions.customers";

const styles = (theme) => ({

});

const initializeCostomer = {
    name: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
    fileData: null
};

const CustomerForm = (props) => {
    const { customers, setCustomers } = props;
    const [customer, setCustomer] = useState({ ...initializeCostomer });

    const customerImageChangeHandler = (e) => {
        const { target: { files, value } } = e;
        const fileName = value;
        const fileData = files[0];
        setCustomer({ ...customer, fileName, fileData });
    };

    const customerValueChangeHandler = (e) => {
        const { target: { name, value } } = e;
        setCustomer({ ...customer, [name]: value });
    };

    const customerAddHandler = async (e) => {
        e.preventDefault();
        const { name, birthday, gender, job, fileData } = customer;
        const body = {
            name, birthday, gender, job,
            image: fileData
        };
        const { success, row } = await addCustomer(body);

        if (!success) return alert("고객 정보 저장 중 오류가 발생하였습니다.");
        setCustomer({ ...initializeCostomer });
        setCustomers([...customers, row]);
    };

    return (
        <form onSubmit={customerAddHandler}>
            <h1>고객 등록</h1>
            <p>프로필 이미지 : <input type="file" name="file" file={customer.fileData} value={customer.fileName} onChange={customerImageChangeHandler} /></p>
            <p>이름 : <input type="text" name="name" value={customer.name} onChange={customerValueChangeHandler} /></p>
            <p>생년월일 : <input type="text" name="birthday" value={customer.birthday} onChange={customerValueChangeHandler} /></p>
            <p>성별 : <input type="text" name="gender" value={customer.gender} onChange={customerValueChangeHandler} /></p>
            <p>직업 : <input type="text" name="job" value={customer.job} onChange={customerValueChangeHandler} /></p>
            <button type="submit">등록</button>
        </form>
    )
};

export default withStyles(styles)(CustomerForm);