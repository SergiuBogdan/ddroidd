import { useState, useRef } from "react";
import Card from "./Card";
import Button from "../UI/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import classes from "./Form.module.css";

const Form = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [errorData, setErrorData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    country: "",
  });

  const { isError, isLoading } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );

      setCountries(res.data.data);
      return res.data.data;
    },
  });

  const selectedCountryHandler = (e) => {
    const selectedCountryCode = e.target.value;
    setSelectedCountry(selectedCountryCode);

    const selectedCountryData = countries.find(
      (country) => country.country === selectedCountryCode
    );
    const selectedCities = selectedCountryData
      ? Object.values(selectedCountryData.cities)
      : [];
    setCities(selectedCities);
  };

  const selectCityInput = (e) => {
    setSelectedCity(e.target.value);
  };

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const countryRef = useRef();

  const history = useNavigate();

  const validateForm = () => {
    const errors = {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      phoneNumber: "",
      email: "",
      country: "",
    };

    if (firstNameRef.current.value.trim() === "") {
      errors.firstName = "First Name is required";
    }

    if (lastNameRef.current.value.trim() === "") {
      errors.lastName = "Last Name is required";
    }

    if (address1Ref.current.value.trim() === "") {
      errors.address1 = "Address Line 1 is required";
    }

    if (cityRef.current.value.trim() === "") {
      errors.city = "City is required";
    }

    if (phoneNumberRef.current.value.trim() === "") {
      errors.phoneNumber = "Phone Number is required";
    }

    if (emailRef.current.value.trim() === "") {
      errors.email = "Email is required";
    }

    if (countryRef.current.value.trim() === "") {
      errors.country = "Country is required";
    }

    const errorDatas = [
      errors.firstName,
      errors.lastName,
      errors.address1,
      errors.address2,
      errors.city,
      errors.state,
      errors.phoneNumber,
      errors.email,
      errors.country,
    ];

    setErrorData(errorDatas);

    console.log(errorDatas);

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const toggleHandler = () => {
    setToggle(true);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address1: address1Ref.current.value,
      address2: address2Ref.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      country: countryRef.current.value,
    };

    console.log(userData);

    const queryString = `?firstName=${userData.firstName}&lastName=${userData.lastName}&address1=${userData.address1}&address2=${userData.address2}&city=${userData.city}&state=${userData.state}&phoneNumber=${userData.phoneNumber}&email=${userData.email}&country=${userData.country}`;

    clearFormFields();
    setFormErrors({});
    history(`/thankyou${queryString}`);
  };

  const clearFormFields = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    address1Ref.current.value = "";
    address2Ref.current.value = "";
    cityRef.current.value = "";
    stateRef.current.value = "";
    phoneNumberRef.current.value = "";
    emailRef.current.value = "";
    countryRef.current.value = "";
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Request failed...</h2>;

  return (
    <div className={classes.appForm}>
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <div className={classes.formInput}>
            <h2>Application Form</h2>
            <h5>Contact information</h5>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="firstName">
                  First Name:<span>*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  ref={firstNameRef}
                  placeholder="First Name"
                />
                {formErrors.firstName && (
                  <div className={classes.errorHandler}>
                    {formErrors.firstName}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName">
                  Last Name:<span>*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  ref={lastNameRef}
                  placeholder="Last Name"
                />
                {formErrors.lastName && (
                  <div className={classes.errorHandler}>
                    {formErrors.lastName}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="phoneNumber">
                  Phone Number:<span>*</span>
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  ref={phoneNumberRef}
                  placeholder="555-5555"
                />
                {formErrors.phoneNumber && (
                  <div className={classes.errorHandler}>
                    {formErrors.phoneNumber}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="email">
                  Email address:<span>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  ref={emailRef}
                  placeholder="john@doe.com"
                />
                {formErrors.email && (
                  <div className={classes.errorHandler}>{formErrors.email}</div>
                )}
              </div>
            </div>

            <div className="address">
              <div className="mb-3">
                <h5>Address</h5>
                <label htmlFor="address1">
                  Address Line 1:<span>*</span>
                </label>
                <input
                  id="address1"
                  type="text"
                  ref={address1Ref}
                  placeholder="Street name & number"
                />
                {formErrors.address1 && (
                  <div className={classes.errorHandler}>
                    {formErrors.address1}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address Line 2:</label>
              <input
                id="address2"
                type="text"
                ref={address2Ref}
                placeholder="Suite, apartment"
              />
              {formErrors.address2 && (
                <div className={classes.errorHandler}>
                  {formErrors.address2}
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-sm-4">
                <label htmlFor="country">
                  Country:<span>*</span>
                </label>
                <select
                  className={classes.country}
                  id="country"
                  ref={countryRef}
                  value={selectedCountry}
                  onChange={selectedCountryHandler}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>

                {formErrors.country && (
                  <div className={classes.errorHandler}>
                    {formErrors.country}
                  </div>
                )}
              </div>

              <div className="col-sm-4">
                <label htmlFor="state">State:</label>
                <input
                  id="state"
                  type="text"
                  ref={stateRef}
                  placeholder="State"
                />
                {formErrors.state && (
                  <div className={classes.errorHandler}>{formErrors.state}</div>
                )}
              </div>

              <div className="col-sm-4">
                <label htmlFor="city">
                  City:<span>*</span>
                </label>
                <select
                  id="city"
                  className={classes.country}
                  ref={cityRef}
                  value={selectedCity}
                  onChange={selectCityInput}
                >
                  <option value="">Select the city</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {formErrors.city && (
                  <div className={classes.errorHandler}>{formErrors.city}</div>
                )}
              </div>
            </div>
          </div>
          <div className={classes.btnJoinUs}>
            <Button type="submit" onClick={toggleHandler}>
              Join Us
            </Button>
          </div>

          <p className={classes.paraError}>
            {toggle ? "Please fix the following errors to proceed: " : null}
          </p>

          <div className={classes.errorTextHandler}>
            {errorData.map((errors, index) => {
              return (
                <div key={index}>
                  <p> {errors} </p>
                </div>
              );
            })}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Form;
