import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { addCustomer } from "../actions/actions.customers";

const styles = (theme) => ({
    hide: {
        display: 'none'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0'
    },
    image: {
        width: 120,
        height: 120
    }
});

const textFieldProps = (state, handler) => ({
    name: {
        type: "text",
        label: "이름",
        name: "name",
        autoComplete: 'off',
        value: state.name,
        onChange: handler
    },
    birthday: {
        type: "text",
        label: "생년월일",
        name: "birthday",
        autoComplete: 'off',
        value: state.birthday,
        onChange: handler
    },
    gender: {
        type: "text",
        label: "성별",
        name: "gender",
        autoComplete: 'off',
        value: state.gender,
        onChange: handler
    },
    job: {
        type: "text",
        label: "직업",
        name: "job",
        autoComplete: 'off',
        value: state.birthjobday,
        onChange: handler
    }
});

const inputFileUploadProps = (state, handler) => ({
    input: {
        id: 'raised-button-file',
        type: 'file',
        accept: 'image/*',
        file: state.fileData,
        value: state.fileName,
        onChange: handler
    },
    label: {
        htmlFor: 'raised-button-file'
    },
    button: {
        name: 'file',
        variant: 'contained',
        color: 'primary',
        component: 'span'
    }
});

const initializeCostomer = {
    name: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
    fileData: null
};

const CustomerAdd = (props) => {
    const { classes, customers, setCustomers } = props;
    const [customer, setCustomer] = useState({ ...initializeCostomer });
    const [previewURL, setPrevieURL] = useState('img/default_profile.png');
    const [open, setOpen] = useState(false);

    const dialogOpenHandler = () => {
        setOpen(true);
    };

    const dialogCloseHandler = () => {
        setCustomer({ ...initializeCostomer });
        setOpen(false);
    };

    const customerImageChangeHandler = (e) => {
        const { target: { files, value } } = e;
        const fileName = value;
        const fileData = files[0];

        if (fileData) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileData);
            fileReader.onload = () => {
                const previewURL = fileReader.result;
                setPrevieURL(previewURL)
            };
        };

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
        const { success, row, message } = await addCustomer(body);

        if (!success) return alert(message);
        setCustomer({ ...initializeCostomer });
        setCustomers([...customers, row]);
        setOpen(false);
    };

    const textFieldProp = textFieldProps(customer, customerValueChangeHandler);
    const inputFileUploadProp = inputFileUploadProps(customer, customerImageChangeHandler);

    return (
        <div>
            <Button variant="contained" color="primary" onClick={dialogOpenHandler}>고객 등록</Button>
            <Dialog open={open} onClose={dialogCloseHandler}>
                <DialogTitle>고객 등록</DialogTitle>
                <DialogContent className={classes.content}>
                    <input className={classes.hide} {...inputFileUploadProp.input} />
                    {previewURL && <img className={classes.image} alt="profile" src={previewURL} />}
                    <label {...inputFileUploadProp.label}>
                        <Button {...inputFileUploadProp.button}>
                            프로필 이미지 선택
                        </Button>
                    </label>
                    <TextField {...textFieldProp.name} autoComplete='off' />
                    <TextField {...textFieldProp.birthday} />
                    <TextField {...textFieldProp.gender} />
                    <TextField {...textFieldProp.job} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={customerAddHandler}>등록</Button>
                    <Button onClick={dialogCloseHandler}>취소</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(CustomerAdd);