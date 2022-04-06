import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { addCustomer } from "../../actions/actions.customers";

const styles = () => ({
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

const textFieldsProps = (handler) => ({
    type: "text",
    autoComplete: 'off',
    onChange: handler
});

const textFieldProps = (state, handler) => ({
    name: {
        label: "이름",
        name: "name",
        value: state.name,
        ...textFieldsProps(handler)
    },
    birthday: {
        label: "생년월일",
        name: "birthday",
        value: state.birthday,
        ...textFieldsProps(handler)
    },
    gender: {
        label: "성별",
        name: "gender",
        value: state.gender,
        ...textFieldsProps(handler)
    },
    job: {
        label: "직업",
        name: "job",
        value: state.birthjobday,
        ...textFieldsProps(handler)
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

const customerStateProps = {
    name: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
    fileData: null
};

const initCustomerProps = () => Object.assign({}, customerStateProps);

const CustomerAddDialog = (props) => {
    const { classes, open, customers, setCustomers, dialogClose } = props;
    const [customer, setCustomer] = useState(initCustomerProps());
    const [previewURL, setPrevieURL] = useState('img/default_profile.png');


    const customerValueChange = (e) => {
        const { target: { name, value } } = e;
        setCustomer({ ...customer, [name]: value });
    };

    const customerImageChange = (e) => {
        const { target: { files, value } } = e;
        const fileName = value;
        const fileData = files[0];

        if (fileData) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileData);
            fileReader.onload = () => {
                const previewURL = fileReader.result;
                setPrevieURL(previewURL);
            };
        };

        setCustomer({ ...customer, fileName, fileData });
    };

    const customerAddHandler = async (e) => {
        e.preventDefault();
        const { name, birthday, gender, job, fileData } = customer;
        const body = {
            name,
            birthday,
            gender,
            job,
            image: fileData
        };

        const { ok, row, message } = await addCustomer(body);
        if (!ok) return alert(message);

        setCustomer(initCustomerProps());
        setCustomers([...customers, row]);
        dialogClose();
    };

    const dialogProps = {
        open,
        onClose: dialogClose
    };

    const textFieldProp = textFieldProps(customer, customerValueChange);
    const inputFileUploadProp = inputFileUploadProps(customer, customerImageChange);

    return (
        <Dialog {...dialogProps}>
            <DialogTitle>고객 등록</DialogTitle>
            <DialogContent className={classes.content}>
                <input className={classes.hide} {...inputFileUploadProp.input} />
                <img className={classes.image} alt="profile" src={previewURL} />
                <label {...inputFileUploadProp.label}>
                    <Button {...inputFileUploadProp.button}>
                        프로필 이미지 선택
                    </Button>
                </label>
                <TextField {...textFieldProp.name} />
                <TextField {...textFieldProp.birthday} />
                <TextField {...textFieldProp.gender} />
                <TextField {...textFieldProp.job} />
            </DialogContent>
            <DialogActions>
                <Button onClick={customerAddHandler}>등록</Button>
                <Button onClick={dialogClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(CustomerAddDialog);