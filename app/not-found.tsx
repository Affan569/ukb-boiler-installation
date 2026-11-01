import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <style>{css}</style>
      <div className="nf-container">
        <div className="nf-content">
          <div className="nf-illustration">
            <div className="nf-404">404</div>
            <div className="nf-icon">🔥</div>
          </div>
          <h1 className="nf-title">Page Not Found</h1>
          <p className="nf-description">
            Oops! The page you're looking for seems to have vanished into thin air.
            It might have been moved, deleted, or never existed in the first place.
          </p>
          <div className="nf-actions">
            <Link href="/" className="nf-btn nf-btn-primary">
              Back to Home
            </Link>
            <Link href="/contactus" className="nf-btn nf-btn-secondary">
              Contact Us
            </Link>
          </div>
          <div className="nf-help">
            <h3>Looking for something specific?</h3>
            <ul>
              <li>
                <Link href="/boiler-installation">Boiler Installation</Link>
              </li>
              <li>
                <Link href="/boiler-servicing">Boiler Servicing</Link>
              </li>
              <li>
                <Link href="/boiler-repair">Boiler Repair</Link>
              </li>
              <li>
                <Link href="/blog">Blog & Tips</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const css = `
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b2a5b 0%, #1e3a8a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.nf-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.nf-content {
  background: #ffffff;
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.nf-illustration {
  position: relative;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.nf-404 {
  font-size: clamp(80px, 15vw, 150px);
  font-weight: 900;
  color: #0b2a5b;
  line-height: 1;
  letter-spacing: -5px;
}

.nf-icon {
  font-size: clamp(60px, 10vw, 100px);
  animation: nf-pulse 2s ease-in-out infinite;
}

@keyframes nf-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.nf-title {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 700;
  color: #0b2a5b;
  margin: 0 0 20px;
  letter-spacing: -1px;
}

.nf-description {
  font-size: clamp(16px, 2vw, 18px);
  color: #5d6b84;
  line-height: 1.6;
  margin: 0 0 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.nf-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.nf-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.nf-btn-primary {
  background: linear-gradient(90deg, #0B7CF0 0%, #0b2a5b 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(11, 124, 240, 0.4);
}

.nf-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(11, 124, 240, 0.5);
}

.nf-btn-secondary {
  background: #ffffff;
  color: #0b2a5b;
  border: 2px solid #0b2a5b;
}

.nf-btn-secondary:hover {
  background: #0b2a5b;
  color: #ffffff;
  transform: translateY(-2px);
}

.nf-help {
  text-align: left;
  background: #f8fbff;
  border-radius: 16px;
  padding: 24px;
  border-left: 4px solid #F8681D;
}

.nf-help h3 {
  font-size: 18px;
  font-weight: 700;
  color: #0b2a5b;
  margin: 0 0 16px;
}

.nf-help ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.nf-help li a {
  color: #0B7CF0;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
}

.nf-help li a::before {
  content: "→";
  color: #F8681D;
  font-weight: 700;
}

.nf-help li a:hover {
  color: #0b2a5b;
}

@media (max-width: 600px) {
  .nf-content {
    padding: 40px 24px;
  }

  .nf-actions {
    flex-direction: column;
  }

  .nf-btn {
    width: 100%;
  }

  .nf-help {
    padding: 20px;
  }
}
`;
