import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Footer = () => {
    return (
        <AudioPlayer
            autoPlay
            src='http://localhost:3000/tracks/play/60878d950486a83320582b37'
            onPlay={e => console.log("onPlay")}
        />
    )
}

export default Footer;