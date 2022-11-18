import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

interface ILazyImage {
  src:string;
  alt:string;
}

function LazyImage({src, alt}:ILazyImage){
  const [loading, setLoading] = useState(true);
  return (
    <>
    <div style={{ display: "none", position: "relative" }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
    </div><img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)} />
    </>
  );
};

export default LazyImage;