import * as styles from "./ImagePreview.module.css";
import { useEffect, useState } from "react";

function ImagePreview({ file = "" }) {
  const [preview, setPreview] = useState(null);

  if (file && preview == null) {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <img
      src={preview}
      alt="Preview"
      className={styles.childInp}
      id={styles.userImg}
    />
  );
}

export default ImagePreview;
