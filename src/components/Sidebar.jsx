export default function Sidebar(props) {
  return (
    <section className="sidebar">
      <input type="color" value={props.bgColor} onChange={props.addBg} />

      <button onClick={props.addText}>Add Text</button>

      {/* Color Picker for Text */}
      <label>Text Color:</label>
      <input
        type="color"
        onChange={(e) => props.changeTextProperty("fill", e.target.value)}
      />

      {/* Font Size Slider */}
      <label>Size:</label>
      <input
        type="range"
        min="10"
        max="100"
        onChange={(e) =>
          props.changeTextProperty("fontSize", parseInt(e.target.value))
        }
      />

      {/* Font Selector */}
      <select
        onChange={(e) => props.changeTextProperty("fontFamily", e.target.value)}
      >
        <option value="helvetica">Helvetica</option>
        <option value="courier">Courier</option>
        <option value="times-new-roman">Times New Roman</option>
      </select>

      <input type="file" accept="image/*" onChange={props.addImg} />
    </section>
  );
}
