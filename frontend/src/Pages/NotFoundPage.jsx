import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl font-bold">404</h1>
      <p className="mt-3 text-muted">That page doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-6">Back home</Link>
    </div>
  );
}