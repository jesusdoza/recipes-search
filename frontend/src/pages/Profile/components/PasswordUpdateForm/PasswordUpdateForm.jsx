import React, { useRef, useState, useEffect } from "react";
import { ProfileUpdateService } from "../../services/ProfileUpdateService";
import ErrorCard from "../../ErrorCard";
import { StyledPasswordForm } from "./PasswordUpdateForm.styles";

import { v4 as uuidv4 } from "uuid";
export default function PasswordUpdateForm({
    handleSubmit,
    setErrors,
    setShowError,
    setShowModal,
}) {
    const formRef = useRef("");
    async function submitForm(event) {
        event.preventDefault();
        try {
            setShowError(false);

            // grab data from form
            const data = new FormData(formRef.current);
            const formData = Object.fromEntries(data.entries());

            //submit form
            console.log("modal form data", formData);
            const response = await handleSubmit(formData);
        } catch (error) {
            setErrors([error.message]);
            setShowError(true);
            console.log("error in update modal", error.message);
        }
        // ProfileUpdateService.updatePassword
    }

    return (
        <StyledPasswordForm>
            <form ref={formRef} onSubmit={submitForm}>
                <section className="row title">
                    <h1>Update Password</h1>
                </section>
                <section className="row form__inputs">
                    <ul>
                        <li className="update__field" key={uuidv4()}>
                            <div className="input__container">
                                <label htmlFor="oldPassword">
                                    Old Password
                                </label>
                                <input
                                    id="oldPassword"
                                    type="text"
                                    name="oldPassword"
                                />
                            </div>
                        </li>
                        <li className="update__field" key={uuidv4()}>
                            <div className="input__container">
                                <label htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    id="newPassword"
                                    type="text"
                                    name="newPassword"
                                />
                            </div>
                        </li>
                        <li className="update__field" key={uuidv4()}>
                            <div className="input__container">
                                <label htmlFor="confirmNewPassword">
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirmNewPassword"
                                    type="text"
                                    name="confirmNewPassword"
                                />
                            </div>
                        </li>
                    </ul>
                </section>
                <section className="form__controls row">
                    <div className="btn" onClick={submitForm}>
                        <span>Submit</span>
                    </div>
                    <div
                        className="btn"
                        onClick={() => {
                            setShowModal(false);
                        }}>
                        <span>Cancel</span>
                    </div>
                </section>
                {/* <section className="error__container">
                    <ErrorCard errorsArr={[1, 3, 4]} showError={true} />
                </section> */}
            </form>
        </StyledPasswordForm>
    );
}
