import * as styles from './Header.module.css'

function Header({isLoggedIn}) {

    return (
        <div className={styles.header}>
            <h3 className={styles.headerTitle}>Message Board</h3>
            {isLoggedIn ? 
                <button type='submit'>Log Off</button> 
            :
                <button type='submit'>Sign Up</button>}
        </div>
    )
}

export default Header