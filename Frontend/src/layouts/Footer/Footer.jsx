import * as styles from "./Footer.module.css";

function Footer() {
  return (
    <div id={styles.footer} className="header-footer">
      <h3 className={styles.footerHeading}>
        Copyright{" "}
        <a
          href="https://www.flaticon.com/free-icons/trash-can"
          title="trash can icons"
        >
          Trash can icons created by Freepik - Flaticon
        </a>
      </h3>
    </div>
  );
}

export default Footer;
