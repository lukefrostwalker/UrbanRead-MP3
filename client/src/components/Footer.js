import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-4">
      <small>
        <div className="card-group pt-3 container">
          <div className="card border-0 footer-card">
            <div className="card-body">
              <img src="/images/logo.png" height="150px" alt="UrbanRead" />
            </div>
          </div>
          <div className="card border-0 footer-card">
            <div className="card-body">
              <p className="card-title colored">Contact information —</p>
              <span className="card-text scolor mb-1">
                <ul className="list-unstyled">
                  <li>Feel free to reach out to us any time.</li>
                  <li className="ms-2">
                    <a href="mailto:urbanread@outlook.ph">
                      <i className="fa-solid fa-envelope"></i>{' '}
                      urbanread@outlook.ph
                    </a>
                  </li>
                  <li className="ms-2">
                    <a href="tel:+639771550622">
                      <i className="fa-solid fa-phone"></i> +63-977-155-0622
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
          <div className="card border-0 footer-card">
            <div className="card-body">
              <p className="card-title colored">Follow us on —</p>
              <span className="card-text">
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="link_animation"
                      href="https://www.facebook.com/urbanURread"
                    >
                      Facebook{' '}
                      <em>
                        <small>@urbanURread</small>
                      </em>
                    </a>
                  </li>
                  <li>
                    <a
                      className="link_animation"
                      href="https://twitter.com/urban_read"
                    >
                      Twitter{' '}
                      <em>
                        <small>@urban_read</small>
                      </em>
                    </a>
                  </li>
                  <li>
                    <a
                      className="link_animation"
                      href="https://www.facebook.com/urbanURread"
                    >
                      Instagram{' '}
                      <em>
                        <small>@urbanURread</small>
                      </em>
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </div>

          <div className="card border-0 footer-card">
            <div className="card-body">
              <p className="card-title colored">Made with 💖 —</p>
              <span className="card-text">
                <ul className="list-unstyled">
                  <li>
                    <a href="https://lukefrostwalker.github.io/JayCaguin/">
                      Jay Caguin 2023
                    </a>
                  </li>
                  <li>
                    <small>Pampanga, Philippines</small>
                  </li>
                  <li>
                    <ul className="list-unstyled d-flex">
                      <li>
                        <a href="https://lukefrostwalker.github.io/JayCaguin/">
                          <i className="fa-solid fa-user fa-xl img"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/lukefrostwalker">
                          <i className="fa-brands fa-github fa-xl img ms-3"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/lukefrostwalkr">
                          <i className="fa-brands fa-facebook fa-xl img ms-3"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.twitter.com/jaycaguin">
                          <i className="fa-brands fa-twitter fa-xl img ms-3"></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </span>
              <span className="card-text"></span>
            </div>
          </div>
        </div>
      </small>
    </footer>
  );
}
