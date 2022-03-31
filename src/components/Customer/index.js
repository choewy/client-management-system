import { Fragment } from "react";
import CustomerInfo from "./CustomerInfo";
import CustomerProfile from "./CustomerProfile";

const Customer = (props) => {
    const { customers } = props;
    return (
        <div>
            {
                customers.map((customer, key) => {
                    const customerProfileProps = {
                        name: customer.name,
                        image: customer.image
                    };

                    const customerInfoProps = {
                        birthday: customer.birthday,
                        gender: customer.gender,
                        job: customer.job
                    };

                    return (<Fragment key={key}>
                        <CustomerProfile {...customerProfileProps} />
                        <CustomerInfo {...customerInfoProps} />
                    </Fragment>);
                })
            }
        </div>
    );
};

export default Customer;