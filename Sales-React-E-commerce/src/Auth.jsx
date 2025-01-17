import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Call the API to check authentication
                const response = await fetch("http://localhost:9090/api/auth/getusername", {
                    method: "GET",
                    credentials: "include", // Include credentials (cookies)
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log(typeof (data))

                // Navigate to "/" if the response is false
                if (!data) {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching the data:", error);
                navigate("/"); // Navigate to "/" in case of an error
            }
        };

        checkAuth();
    }, [navigate]);


};

export default CheckAuth;
