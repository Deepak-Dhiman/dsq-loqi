import React from "react";
import * as fabric from "fabric";

import Bag from "./Bag";
import Sidebar from "./Sidebar";

export default function Main() {
  const [bagText, setBagText] = React.useState("Text goes here!");

  const canvasRef = React.useRef(null);
  const fabricRef = React.useRef(null);

  function handleImageUploader(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (f) => {
      const data = f.target.result;

      try {
        const img = await fabric.FabricImage.fromURL(data);
        img.scaleToWidth(200);
        img.scaleToHeight(180);
        fabricRef.current.add(img);
        fabricRef.current.setActiveObject(img);
        fabricRef.current.renderAll();
      } catch (error) {
        console.error("Error loading image", error);
      }
    };

    reader.readAsDataURL(file);
  }

  React.useEffect(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: 250,
      height: 200,
      backgroundColor: "whitesmoke",
    });

    fabricRef.current.renderAll();

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, []);

  function setInputValue(event) {
    const { value } = event.currentTarget;
    setBagText((prev) => (prev = value));
  }

  return (
    <main>
      <Bag bagText={bagText} canvasRef={canvasRef} />
      <Sidebar
        bagText={bagText}
        onChangeText={setInputValue}
        onChangeImg={handleImageUploader}
      />
    </main>
  );
}
