import Customers from "./customers/Customers";
import HomeIcon from '@mui/icons-material/Home';
import TocIcon from '@mui/icons-material/Toc';
import HomePage from "./homepage/HomePage";

const Components = () => [
    (props) => ({
        label: '홈',
        to: '/',
        path: '/',
        icon: <HomeIcon />,
        element: <HomePage />
    }),
    (props) => ({
        label: '고객 관리',
        to: '/customers',
        path: '/customers',
        icon: <TocIcon />,
        element: <Customers {...props} />
    }),
];

export default Components;