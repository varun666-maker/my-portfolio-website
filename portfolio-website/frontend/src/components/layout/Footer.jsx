import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com/varun666-maker', label: 'GitHub' },
    { icon: FiLinkedin, url: 'https://www.linkedin.com/in/varun-kumar-75a4422b4/', label: 'LinkedIn' },
    { icon: FiTwitter, url: 'https://twitter.com', label: 'X' },
    { icon: FiMail, url: 'mailto:varun143877@gmail.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Services', path: '/services' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'Get in Touch', path: '/contact' },
        { name: 'Email Me', path: 'mailto:varun143877@gmail.com' },
      ],
    },
  ];

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold gradient-text inline-block mb-4">
              Portfolio
            </Link>
            <p className="text-dark-300 mb-4">
              Building beautiful and functional web experiences with modern technologies.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.path && (link.path.startsWith('mailto:') || link.path.startsWith('tel:') || link.path.startsWith('http')) ? (
                      link.path.startsWith('http') ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <a
                          href={link.path}
                          className="text-dark-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </a>
                      )
                    ) : (
                      <Link
                        to={link.path}
                        className="text-dark-300 hover:text-primary-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-400 text-sm text-center md:text-left">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-700 transition-colors"
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
