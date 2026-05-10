import React from "react";
import * as fabric from "fabric";

import Bag from "./Bag";
import Sidebar from "./Sidebar";

export default function Main() {
  const [bgColor, setBgColor] = React.useState("#f5f5f5");

  const canvasRef = React.useRef(null);
  const fabricRef = React.useRef(null);

  // Change background color

  const handleBgColorChange = (e) => {
    const newColor = e.target.value;
    setBgColor(newColor);
    fabricRef.current.set("backgroundColor", newColor);
    fabricRef.current.renderAll();
  };

  // Add and style text

  const addText = () => {
    const text = new fabric.IText("Type here...", {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fill: "#333333",
      fontSize: 20,
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    fabricRef.current.renderAll();
  };

  const changeTextProperty = (property, value) => {
    const activeObject = fabricRef.current.getActiveObject();

    // Check if an object is selected and if it's a text type
    if (activeObject && activeObject.type.includes("text")) {
      activeObject.set(property, value);
      fabricRef.current.renderAll();
    }
  };

  // Upload image

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
        fabricRef.current.centerObject(img);
        fabricRef.current.setActiveObject(img);
        fabricRef.current.renderAll();
      } catch (error) {
        console.error("Error loading image", error);
      }
    };

    reader.readAsDataURL(file);
  }

  // Render canvas

  React.useEffect(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 335,
      backgroundColor: "whitesmoke",
    });

    fabricRef.current.renderAll();

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, []);

  return (
    <main>
      <Bag canvasRef={canvasRef} />
      <Sidebar
        addImg={handleImageUploader}
        addText={addText}
        changeTextProperty={changeTextProperty}
        addBg={handleBgColorChange}
      />
    </main>
  );
}
