import { useEffect, useState } from "react";
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
      <div>
        <div dangerouslySetInnerHTML={{ __html: oneMail }} />
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!mail) return <p>No mail here boi</p>;

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1>Your mails</h1>
        <br />
        <h1>{user}</h1>
        <h2>{password}</h2>
        <br />
        <ul>
          {mail.map((msg) => (
            <li key={msg.uid}>
              <h3 onClick={handleClick} id={msg.uid}>
                {msg.subject}
              </h3>
              <p>{msg.from}</p>
              <p>{msg.date}</p>
              <br />
            </li>
          ))}
        </ul>
      </div>
      <div>{theMail()}</div>
    </div>
  );
};

export default withRouter(Inbox);
