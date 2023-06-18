import image_temp from "../Asset/image_temp.jpeg";

const VideoReader = (props) => {

    const title = props.title;
    const src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    const type = 'video/mp4';
    const controls = true;
    const autoplay = true;
    const loop = false;
    const muted = false;

    return(
        <div>
            <h1>{title}</h1>
            <video
                controls={controls}
                autoPlay={autoplay}
                loop={loop}
                muted={muted}
                width="50%"
                height="auto"
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default VideoReader;