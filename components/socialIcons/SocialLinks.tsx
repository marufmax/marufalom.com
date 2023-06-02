import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail, AiOutlineTwitter } from 'react-icons/ai';

interface SocialLink {
  title: string;
  link: string;
  hoverClass: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    title: 'Github Repos',
    link: 'https://github.com/marufmax',
    hoverClass: 'hover:text-red-500',
    icon: <AiFillGithub size={42} />
  },
  {
    title: 'Connect on Linkedin',
    link: 'https://linkedin.com/in/marufalom',
    hoverClass: 'hover:text-blue-500',
    icon: <AiFillLinkedin size={42} />
  },
  {
    title: 'Send email',
    link: 'mailto:mail@marufalom.com',
    hoverClass: 'hover:text-green-200',
    icon: <AiOutlineMail size={42} />
  },
  {
    title: 'Follow me on Twitter',
    link: 'https://twitter.com/nothingsecurity',
    hoverClass: 'hover:text-blue-700',
    icon: <AiOutlineTwitter size={42} />
  }
];

const SocialLinks: React.FC = () => {
  return (
    <ul className="flex cursor-pointer items-center space-x-3">
      {socialLinks.map((link, index) => (
        <li key={index}>
          <a title={link.title} href={link.link} className={link.hoverClass}>
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;