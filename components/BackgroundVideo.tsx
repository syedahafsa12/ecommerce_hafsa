// "use client"
"use client";
import React, { useEffect, useRef } from 'react';
import styles from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className={styles.videoContainer}>
      <a href="/lawn-collections" target="_blank" rel="noopener noreferrer">
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          ref={videoRef}
        >
          <source src="/video.mp4" type="video/mp4" />
          <source src="/video.webm" type="video/webm" />
          <source src="/video.ogv" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </a>
      <div className={styles.linksContainer}>
          <a href="/lawn-collections" className={styles.link}>
            Lawn
          </a>
          <a href="/stitched" className={styles.link}>
            Stitched
          </a>
          <a href="/unstitched" className={styles.link}>
            Unstitched
          </a>
        </div>
    </div>
  );
};

export default BackgroundVideo;

// import React, { useEffect, useRef } from 'react';
// import styles from './BackgroundVideo.module.css';

// const BackgroundVideo = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {            
//       videoRef.current.play();
//     }
//   }, []);

//   return (
//     <div className={styles.videoContainer}>
//       <video
//         className={styles.backgroundVideo}
//         autoPlay
//         muted
//         loop
//         ref={videoRef}
        
//       >
//         <source src="/video.mp4" type="video/mp4" />
//         <source src="/video.webm" type="video/webm" />
//         <source src="/video.ogv" type="video/ogg" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default BackgroundVideo;
