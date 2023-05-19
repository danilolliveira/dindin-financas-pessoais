import { getOverlappingDaysInIntervals } from 'date-fns';
import Logo from '../../assets/logo.svg';
import ProfileImg from '../../assets/profile-img.svg';
import Signout from '../../assets/signout.svg';
import { clearStorage, getItem } from '../../utils/storage';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header({ setOpenProfileForm }) {

    const UserName = getItem('name')
    const navigate = useNavigate()
    const goToLogin = () => {
        navigate('/')
    }

    return (
        <header className='Header'>
            <div>
                <img src={Logo} alt="logo" />
                <nav className='navbar'>
                    <ul>
                        <li className='profile' onClick={() => setOpenProfileForm(true)}><img src={ProfileImg} alt='profile' /></li>
                        <li className='user' onClick={() => setOpenProfileForm(true)}>{UserName}</li>
                        <li><img
                            className='signout'
                            src={Signout}
                            alt='signput'
                            onClick={() => (
                                clearStorage(),
                                goToLogin()
                            )}
                        /></li>
                    </ul>
                </nav>
            </div>
            <div className='visual-element'>

            </div>
        </header>
    )
}