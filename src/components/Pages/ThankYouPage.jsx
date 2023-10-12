import { useLocation } from "react-router-dom";
import classes from "./ThankYouPage.module.css";

const ThankYouPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const enteredState = queryParams.get("state") || "none";

  const useData = {
    enteredFirstName: queryParams.get("firstName"),
    enteredLastName: queryParams.get("lastName"),
    enteredAddress1: queryParams.get("address1"),
    enteredAddress2: queryParams.get("address2"),
    enteredCity: queryParams.get("city"),
    enteredState: enteredState,
    enteredPhoneNumber: queryParams.get("phoneNumber"),
    enteredEmail: queryParams.get("email"),
    enteredCountry: queryParams.get("country"),
  };

  console.log(useData);

  return (
    <div className={classes.content}>
      <h1>
        Excellent! <br />
        See you in November 2023!
      </h1>
      <h2 className={classes.submission}>Submission Summary:</h2>

      <div>
        <div className={`${classes.formData} ${classes.leftAlignedText}`}>
          <p>First Name: {useData.enteredFirstName}</p>
          <p>Last Name: {useData.enteredLastName}</p>
          <p>Phone number: {useData.enteredPhoneNumber}</p>
          <p>Email: {useData.enteredEmail}</p>
          <p>Address: {useData.enteredAddress1 || useData.enteredAddress2}</p>
          <p>Country: {useData.enteredCountry}</p>
          <p>State: {useData.enteredState}</p>
          <p>City: {useData.enteredCity}</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
