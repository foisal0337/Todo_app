import React, { useState , useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  let { getLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  const handelSubmit = async (e) =>{
    e.preventDefault();
    console.log(email,password);

    try {
      
      const loginData = {email,password};

      await axios.post("http://localhost:5000/auth/v1/login" , loginData);

      setEmail("");
      setPassword("");
      await getLoggedIn();

      navigate("/todo");

    } catch (error) {
      console.log(error);
    }
  }


    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/signup">
                        <h3 className="text-4xl font-bold text-purple-600">
                            User Login From
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form onSubmit={handelSubmit} >
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Enter Email"
                                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="Enter Password "
                                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Link to ='/signup'
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                href="#"
                            >
                                New User ?
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}