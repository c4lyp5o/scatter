import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    if (user === "") {
      setError("Please enter a username");
    }
    if (password === "") {
      setError("Please enter a password");
    }
    // if (user !== "" && password !== "") {
    //   router.push("/inbox", {
    //     user: user,
    //     password: password,
    //   });
    // }
    router.push(
      {
        pathname: "/inbox",
        query: { user: user, password: password },
      },
      "/inbox"
    );
  }

  return (
    <div className="container text-center h-auto border-l-blue-400">
      <form>
        <input
          className="border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600"
          type="text"
          placeholder="Username"
          onChange={(event) => setUser(event.target.value)}
        />
        <br />
        <br />
        <input
          className="border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <p>{error}</p>
        <br />
        <button
          className="border-b-2 border-l-2 border-r-2 border-t-2 border-dotted border-black"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}
