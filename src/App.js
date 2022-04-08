import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineUser,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import "./App.css";
import app from "./firebase.init";
const auth = getAuth(app);
function App() {
  const [email, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(name);
  console.log(password);
  const provider = new FacebookAuthProvider();
  const facebook = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEmail = (e) => {
    setMail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const formSubmit = (e) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        verifyEmail();
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(email, name, password);
    e.preventDefault();
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log("email send done");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const resetmail = () => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log("send reset mail done");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="grid grid-cols-3 max-w-6xl mx-auto ">
        <div className="mt-16 col-span-1">
          <h2 className="text-5xl font-bold text-green-600">WELCOME</h2>
          <h4>Selamat Datang di Website</h4>
        </div>
        <div className="col-span-2">
          <h3 className="text-8xl text-center mt-5 flex justify-center">
            <AiOutlineUser className="text-center" />
          </h3>
          <form onSubmit={formSubmit} className="text-center">
            <p className="mt-2">
              <label htmlFor="email">
                <input
                  onBlur={handleEmail}
                  className="min-w-[50%] border-slate-500 border-2 bg-stone-200 rounded-sm"
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  required
                />
              </label>
            </p>
            <p className="mt-2">
              <label htmlFor="name">
                <input
                  onBlur={handleName}
                  className="min-w-[50%] border-slate-500 border-2 bg-stone-200 rounded-sm"
                  type="text"
                  placeholder="User Name"
                  id="name"
                  required
                />
              </label>
            </p>
            <p className="mt-2">
              <label htmlFor="password">
                <input
                  onBlur={handlePass}
                  className="min-w-[50%] border-slate-500 border-2 bg-stone-200 rounded-sm"
                  type="password"
                  name=""
                  id="password"
                  placeholder="Password"
                  required
                />
              </label>
            </p>
            <p>
              <input type="checkbox" name="" id="checked" />{" "}
              <label htmlFor="checked">Allredey Register</label>
            </p>
            <button
              onClick={resetmail}
              className="link text-red-400 underline-offset-1 mr-2"
            >
              Forget Password
            </button>
            <button className="bg-green-500 py-1 my-4 px-4" type="submit">
              Register
            </button>
          </form>
          <h2 className="text-center">OR</h2>
          <div className="flex gap-3 justify-center">
            <h1 className="flex flex-col justify-center items-center">
              <BsFacebook className="text-4xl cursor-pointer" />
              <h4>Facebook</h4>
            </h1>
            <h1 className="flex flex-col justify-center items-center">
              <AiFillGithub className="text-4xl cursor-pointer" />
              <h4>Github</h4>
            </h1>
            <h1 className="flex flex-col justify-center items-center">
              <AiOutlineGoogle className="text-4xl cursor-pointer" />
              <h4>Google</h4>
            </h1>
            <h1>
              <AiOutlineTwitter className="text-4xl cursor-pointer" />
              <h4>Twitter</h4>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// const handleFacebookSignIn = () =>{
//   signInWithPopup(auth, facebookProvider)
//   .then(result =>{
//     const user = result.user;
//     setUser(user);
//     console.log(user);
//   })
//   .catch(error =>{
//     console.error(error);
//   })
// }
