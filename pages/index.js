import { useState } from "react";
import Image from "next/image";
import Login from "../components/Login";
import Footer from "../components/Footer";

export default function Home() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className="bg-amber-900 h-screen">
      <div className="text-center">
        <p>Calypsomail</p>
      </div>
      <br />
      <div>
        <Login
          setUser={setUser}
          user={user}
          setPassword={setPassword}
          password={password}
        />
      </div>
      <br />
      <div>
        <Footer />
      </div>
    </div>
  );
}
