import * as styles from "./ImagePreview.module.css";
import { useEffect, useState } from "react";

function ImagePreview({ file = null, size = "medium" }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const updatePreview = async () => {
      const objectUrl = URL.createObjectURL(file);

      setPreview(objectUrl);
    };
    updatePreview();
  }, [file]);

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
      id={size == "medium" ? styles.mediumImg : styles.smallImg}
    />
  );
}

export default ImagePreview;
