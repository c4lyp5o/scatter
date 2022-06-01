export default function Footer() {
  return (
    <footer className="footer">
      <div className="container  bg-slate-600 items-center text-center">
        <div className="text-xs text-white">
          <p> &copy; {new Date().getFullYear()} Calypsomail</p>
        </div>
      </div>
    </footer>
  );
}
