import React, { useEffect, useState } from "react";

export default function RichTextEditorWrapper({ value, onChange }) {
  const [Quill, setQuill] = useState(null);

  useEffect(() => {
    let mounted = true;
    import("react-quill")
      .then((m) => {
        if (mounted) setQuill(() => m.default);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  if (Quill) {
    return <Quill theme="snow" value={value} onChange={onChange} />;
  }

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={10}
      style={{ width: "100%" }}
    />
  );
}
