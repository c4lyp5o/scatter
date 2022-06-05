import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { withRouter } from "next/router";
import axios from "axios";

const Inbox = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState([]);
  const [oneMail, setOneMail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/checkmail", {
        user: props.router.query.user,
        password: props.router.query.password,
      })
      .then((response) => {
        let rvs = response.data.envelope;
        setMail(rvs.reverse());
        console.log(rvs);
        setUser(response.data.user);
        setPassword(response.data.password);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  async function handleClick(event) {
    setOneMail("");
    event.preventDefault();
    axios
      .post("/api/readmail", {
        user: user,
        password: password,
        id: event.target.id,
      })
      .then((response) => {
        setOneMail(response.data.mail);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  function theMail() {
    return (
      <div
        className="container"
        dangerouslySetInnerHTML={{ __html: oneMail }}
        sandbox=""
      />
    );
  }

  function IFrame({ children }) {
    const [ref, setRef] = useState();
    const container = ref?.contentWindow?.document?.body;

    return (
      <iframe
        ref={setRef}
        className="border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600"
        height="100%"
        width="100%"
        overflow="hidden"
        sandbox="allow-scripts allow-same-origin"
      >
        {container && createPortal(children, container)}
      </iframe>
    );
  }

  function RenderingInFrames() {
    return <IFrame>{theMail()}</IFrame>;
  }

  function logOut() {
    props.router.push("/");
  }

  function seenMarker(msg) {
    if (msg.flags === "\\Seen") {
      return "font-weight-bold font-mono";
    }
  }

  if (loading)
    return (
      <div className="container text-center h-auto border-l-blue-400">
        <p className="text-center font-mono text-2xl">
          {props.router.query.user}@calypsocloud.one
        </p>
        <p className="text-center font-mono text-2xl">Loading...</p>
      </div>
    );
  if (error) return <p className="text-center font-mono text-2xl">{error}</p>;
  if (!mail) return <p>No mail here boi</p>;

  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="left-20 top-20 p-2">
          <h1>Your mails</h1>
          <button className="bg-purple-400 border-slate-700" onClick={logOut}>
            Log Out
          </button>
          <br />
          <h1>{user}</h1>
          <h2>{password}</h2>
          <br />
        </div>
        <ul className="p-2">
          {mail.map((msg) => (
            <li key={msg.uid}>
              <h3
                onClick={handleClick}
                id={msg.uid}
                className={seenMarker(msg)}
              >
                {msg.subject}
              </h3>
              <p className={seenMarker(msg)}>{msg.from}</p>
              <p className={seenMarker(msg)}>{msg.date}</p>
              <br />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <RenderingInFrames />
      </div>
    </div>
  );
};

export default withRouter(Inbox);
