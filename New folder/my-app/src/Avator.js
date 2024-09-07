function Avator({ src, height, weight }) {
    return (
      <img src={src} alt="Avatar" style={{ height: height, weight:weight }} />
    );
  }
  
  export default Avator;