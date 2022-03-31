import Customer from "./components/Customer";

const clientProps = [
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
];

const App = () => {
  return (
    <Customer customers={clientProps} />
  );
};

export default App;