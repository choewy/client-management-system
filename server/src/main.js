const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const port = process.env.PORT || 5000;

app.get('/api/customers', (req, res) => {
    console.log(1);
    return res.json({
        success: true,
        rows: [
            {
                id: 1,
                image: "https://placeimg.com/64/64/any",
                name: "최원영",
                birthday: "950302",
                gender: "남자",
                job: "선원"
            },
            {
                id: 2,
                image: "https://placeimg.com/64/64/any",
                name: "테스트",
                birthday: "950302",
                gender: "남자",
                job: "선원"
            },
            {
                id: 3,
                image: "https://placeimg.com/64/64/any",
                name: "홍길동",
                birthday: "950302",
                gender: "남자",
                job: "선원"
            }
        ]
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});