const CustomerProfile = (props) => {
    return (
        <div>
            <img alt="profile" src={props.image} />
            <h2>{props.name}</h2>
        </div>
    );
};

export default CustomerProfile;