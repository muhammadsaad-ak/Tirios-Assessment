import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-secondary-900 dark:bg-black text-white transition-colors duration-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-lg font-semibold mb-4">GoldenCity</h3>
            <p className="text-secondary-300 dark:text-secondary-400 text-sm">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible for everyone.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Properties', href: '/properties' },
                { name: 'About Us', href: '/about' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Privacy Policy', href: '/privacy' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Link to={link.href} className="text-secondary-300 dark:text-secondary-400 hover:text-white text-sm transition-colors relative group">
                    {link.name}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <motion.li 
                className="flex items-center text-secondary-300 dark:text-secondary-400 text-sm"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <FiPhone className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </motion.li>
              <motion.li 
                className="flex items-center text-secondary-300 dark:text-secondary-400 text-sm"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <FiMail className="mr-2" />
                <span>contact@GoldenCity.com</span>
              </motion.li>
              <motion.li 
                className="flex items-center text-secondary-300 dark:text-secondary-400 text-sm"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <FiMapPin className="mr-2" />
                <span>123 Property Street, Real City, RC 12345</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: FiTwitter, href: '#' },
                { icon: FiLinkedin, href: '#' },
                { icon: FiGithub, href: '#' },
                { icon: FaDiscord, href: '#' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={item.href} className="text-secondary-300 dark:text-secondary-400 hover:text-white transition-colors">
                    <item.icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-secondary-700 dark:border-secondary-800 mt-8 pt-8 text-center text-secondary-300 dark:text-secondary-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} GoldenCity. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;