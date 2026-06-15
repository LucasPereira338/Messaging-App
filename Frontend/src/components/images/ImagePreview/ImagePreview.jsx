import * as styles from "./ImagePreview.module.css";
import { useEffect, useState } from "react";
import CloseButton from "../../common/CloseButton/CloseButton";

function ImagePreview({ file = null, cancelFile, size = "medium" }) {
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
    <div id={size == "medium" ? styles.mediumImg : styles.smallImg}>
      <img
        src={preview}
        alt="Preview"
        className={styles.childInp}
        id={size == "medium" ? styles.mediumImg : styles.smallImg}
      />
      <CloseButton handleClick={cancelFile} />
    </div>
  );
}

export default ImagePreview;
