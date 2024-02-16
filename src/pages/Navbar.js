// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import styles from './component/Navbar.module.css'
import { MdDashboard, MdPeople, MdInsertComment, MdPerson } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/posts">
            Posts
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/comments">
            Comments
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/users">
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;