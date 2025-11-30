import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCEEditor({ value, onChange }) {
  // Use Vite env var VITE_TINYMCE_API_KEY when provided; default to 'no-api-key'
  // which avoids the "Finish setting up" cloud prompt during local development.
  const apiKey = import.meta.env?.VITE_TINYMCE_API_KEY || "no-api-key";

  return (
    <Editor
      apiKey={apiKey}
      value={value}
      init={{
        height: 400,
        menubar: true,
        plugins: [
          "advlist autolink lists link image charmap preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help | link image media",
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
      }}
      onEditorChange={(content) => onChange && onChange(content)}
    />
  );
}
