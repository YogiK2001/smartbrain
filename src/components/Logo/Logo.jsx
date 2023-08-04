import Tilt from 'react-parallax-tilt';
import brain from './ai.png';
import './Logo.css'

const Logo = () => {
    return (
        <div style={{height:'100px', width:'100px', marginTop:'0'}} className='ml4 mt0' >
        <Tilt >
        <div className='box hello' >
          <div ><img src={brain} alt="logo" /></div>
        </div>
      </Tilt>
      </div>
    );
};

export default Logo;