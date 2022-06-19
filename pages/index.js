import Login from "../components/Login";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-amber-900 h-screen">
      <div className="text-center">
        <p>Calypsomail</p>
      </div>
      <br />
      <div>
        <Login />
      </div>
      <br />
      <div>
        <Footer />
      </div>
    </div>
  );
}
